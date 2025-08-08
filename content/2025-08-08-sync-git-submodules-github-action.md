---
title: Sync git submodules with GitHub Action
subtitle: ""
date: 2025-08-08 00:00:00 -0800 GMT
tags: []
ss: preview/git_submodules_github_action.jpg
aliases:
  - /git_submodules_github_action/
---

I needed to share some object code across multiple repos (to ensure the consistency of the RESTful API JSON serialization and deserialization). So I created a dedicated repository where all the shared code lives, then imported it across other repos as a submodule. In this case, I used a library I made - [wings](https://wings.sh/) - but usually you'd probably use something like Thrift or Protocol Buffers. Another common use case would be to have a repository hosting shared cross-platform (iOS + Android) low-level code.

It's a bit of a pain to manually update it across all the different repositories (and check if it causes any regressions) every time I make changes to it. So instead I wrote some tests, set up some GitHub Actions to run them, then have an automated GitHub Action that sends PRs to all the "parent" repos every time it receives a new commit, which will trigger the underlying CI tests so it'd be obvious if it might break anything.

## Setup submodules

First, create the shared git repository. Then in the parent repositories, run `git submodule add <path> <git_url>`. Commit these changes and now you should see the directory shown as a ref link in GitHub like `{dir_name} @ {commit_hash}`. It's important to note that the folder won't be initialized automatically on clone, but instead you need to either clone with the `--recurse-submodules` argument or run `git submodule update --init --recursive` after cloning to get the submodules set up properly.

## Granting PATs

You mostly need 2 PATs here. One for all repositories importing the shared repo to be able to _read_ both the hosting repo and the shared repo so its GitHub Actions can run `git submodule init && git submodule update` as part of its "checkout" step. (They could be multiple separate PATs each with specific repo access, but in my case I just use the same PAT that allows read access across all repos in the GitHub organization.) The other one is for the shared repo (to be used later) to clone, branch, commit, and create pull requests on all the repos extending it.

## Creating GitHub Action for updates

Here's something I vibe-coded with Claude for my own project ([GlobeTrotte](https://globetrotte.com/)). The main thing that needs updating is the `SUBMODULE_PATH` and `DEFAULT_CONFIG` section to fit your use case. It is a bit more on the verbose side of things, but it does work as expected. One tricky callout I'd say is that the PATs can be a little tricky if you need to both _read_ from another repo (as you would to initialize the submodule) and _write_ as you try to push changes to another branch (like "deploy" or "gh-pages" branch). You can instead split them into separate actions with proper dependency and use different PATs depending on the need.

### Workflow configuration and triggers

This sets up the basic workflow structure and defines which repositories should be updated:

```yaml
name: Update Submodules and Create PR

on: [ push, pull_request ]

env:
  # Static submodule path used across all configurations
  SUBMODULE_PATH: "src/wings"
  
  # Default configuration - can be overridden by workflow input
  DEFAULT_CONFIG: |
    [
      {
        "target_repo": "repo-1",
        "prefix": "./",
        "target_branch": "main",
        "enabled": true
      },
      {
        "target_repo": "repo-2",
        "prefix": "./",
        "target_branch": "main",
        "enabled": true
      },
      {
        "target_repo": "repo-3", 
        "prefix": "app/",
        "target_branch": "main",
        "enabled": true
      }
    ]
```

The `DEFAULT_CONFIG` is a JSON array where each object represents a repository that uses your submodule. You can enable/disable repositories individually and specify different target branches per repo.

### Setup job: Creating the execution matrix

This job processes the configuration and creates a matrix for parallel execution across multiple repositories:

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - name: Set up configuration matrix
        id: set-matrix
        run: |
          if [ -n "${{ github.event.inputs.config_override }}" ]; then
            echo "Using override configuration"
            CONFIG='${{ github.event.inputs.config_override }}'
          else
            echo "Using default configuration"
            CONFIG='${{ env.DEFAULT_CONFIG }}'
          fi
          
          # Filter only enabled configurations and format for matrix
          MATRIX=$(echo "$CONFIG" | jq -c '[.[] | select(.enabled == true)]')
          echo "matrix=$MATRIX" >> $GITHUB_OUTPUT
          echo "Configuration matrix:"
          echo "$MATRIX" | jq .
```

This step filters out disabled repositories and creates a matrix that GitHub Actions can use to run the update job in parallel for each target repository.

### Main update job: Repository checkout and setup

The main job runs for each repository in the matrix. First, it checks out the target repository and sets up git configuration:

```yaml
  update-submodules:
    needs: setup
    runs-on: ubuntu-latest
    if: ${{ fromJson(needs.setup.outputs.matrix)[0] != null }}
    strategy:
      matrix:
        config: ${{ fromJson(needs.setup.outputs.matrix) }}
      fail-fast: false
    
    steps:
      - name: Display current configuration
        run: |
          echo "🎯 Target Repository: ${{ matrix.config.target_repo }}"
          echo "📂 Submodule Path: ${{ env.SUBMODULE_PATH }}"
          echo "🌿 Target Branch: ${{ matrix.config.target_branch }}"
          
          # Construct full repo path
          FULL_REPO_PATH="{org-name}/${{ matrix.config.target_repo }}"
          echo "FULL_REPO_PATH=$FULL_REPO_PATH" >> $GITHUB_ENV

      - name: Checkout external repository
        uses: actions/checkout@v4
        with:
          repository: ${{ env.FULL_REPO_PATH }}
          token: ${{ secrets.UPDATE_SUBMODULE }}
          ref: ${{ matrix.config.target_branch }}
          fetch-depth: 0
          path: ${{ matrix.config.target_repo }}

      - name: Configure Git
        run: |
          cd ${{ matrix.config.target_repo }}
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
```

Remember to replace `{org-name}` with your actual GitHub organization name.

### Submodule initialization and version checking

This is the core logic that handles submodule authentication, updates, and determines if changes are needed:

```yaml
      - name: Initialize and update submodules
        run: |
          cd ${{ matrix.config.target_repo }}
          git submodule init
          
          # Update submodule URLs to use PAT authentication
          git config --list | grep "submodule\." | grep "\.url=" | while read -r line; do
            key=$(echo "$line" | cut -d'=' -f1)
            url=$(echo "$line" | cut -d'=' -f2-)
          
            if echo "$url" | grep -q "github.com"; then
              if echo "$url" | grep -q "https://"; then
                new_url=$(echo "$url" | sed 's|https://github.com/|https://x-access-token:${{ secrets.UPDATE_SUBMODULE }}@github.com/|')
              else
                new_url=$(echo "$url" | sed 's|git@github.com:|https://x-access-token:${{ secrets.UPDATE_SUBMODULE }}@github.com/|')
              fi
              git config "$key" "$new_url"
            fi
          done
          
          # Update submodules
          git submodule update --init --recursive
          
          # Navigate to the specific submodule and get current commit
          cd "${{ env.SUBMODULE_PATH }}"
          CURRENT_COMMIT=$(git rev-parse HEAD)
          echo "Current submodule commit: $CURRENT_COMMIT"
          
          # Fetch latest changes from submodule's remote
          git fetch origin
          
          # Get the latest commit on the default branch
          LATEST_COMMIT=${{ github.sha }}
          echo "Latest submodule commit: $LATEST_COMMIT"
          
          # Check if update is needed
          if [ "$CURRENT_COMMIT" != "$LATEST_COMMIT" ]; then
            echo "UPDATE_NEEDED=true" >> $GITHUB_ENV
            echo "CURRENT_COMMIT=$CURRENT_COMMIT" >> $GITHUB_ENV
            echo "LATEST_COMMIT=$LATEST_COMMIT" >> $GITHUB_ENV
          else
            echo "UPDATE_NEEDED=false" >> $GITHUB_ENV
            echo "✅ Submodule is already up to date"
          fi
```

This step converts SSH URLs to HTTPS with PAT authentication, then compares the current submodule commit with the latest commit to determine if an update is needed.

### Updating the submodule and creating branches

If an update is needed, these steps handle the actual submodule update and branch creation:

```yaml
      - name: Update submodule to latest version
        if: env.UPDATE_NEEDED == 'true'
        run: |
          cd ${{ matrix.config.target_repo }}
          cd "${{ env.SUBMODULE_PATH }}"
          
          # Checkout the latest commit
          git checkout ${{ github.sha }}

      - name: Print changes
        if: env.UPDATE_NEEDED == 'true'
        run: |
          cd ${{ matrix.config.target_repo }}
          git diff

      - name: Create feature branch and commit changes
        if: ${{ env.UPDATE_NEEDED == 'true' && github.ref == 'refs/heads/main' }}
        run: |
          cd ${{ matrix.config.target_repo }}
          git add .
          
          # Create a new branch for the update
          SUBMODULE_NAME="${{ env.SUBMODULE_PATH }}"
          BRANCH_NAME="update-${SUBMODULE_NAME}-$(date +%Y%m%d-%H%M%S)"
          echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_ENV
          
          git checkout -b $BRANCH_NAME
          
          # Create detailed commit message
          COMMIT_MSG="Update ${SUBMODULE_NAME} submodule
          
          Updated ${{ env.SUBMODULE_PATH }} from ${{ env.CURRENT_COMMIT }} to ${{ env.LATEST_COMMIT }}
          
          This automated update brings in the latest changes from the submodule.
          
          Repository: ${{ matrix.config.target_repo }}
          Branch: ${{ matrix.config.target_branch }}"
          
          git commit -m "$COMMIT_MSG"
          
          # Push the new branch
          git push origin $BRANCH_NAME
```

This creates a timestamped branch name, commits the submodule update with a detailed message, and pushes the branch to the target repository.

### Creating pull requests

Finally, this step creates a pull request in the target repository with detailed information about the update:

```yaml
      - name: Create Pull Request
        if: ${{ env.UPDATE_NEEDED == 'true' && github.ref == 'refs/heads/main' }}
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.UPDATE_SUBMODULE }}
          working-directory: ${{ matrix.config.target_repo }}
          script: |
            const submoduleName = '${{ env.SUBMODULE_PATH }}';
            const repoOwner = 'GlobeTrotte-com'; // Replace with actual owner
            const repoName = '${{ matrix.config.target_repo }}';
            
            const { data: pullRequest } = await github.rest.pulls.create({
              owner: repoOwner,
              repo: repoName,
              title: `Update ${submoduleName} submodule`,
              head: process.env.BRANCH_NAME,
              base: '${{ matrix.config.target_branch }}',
              body: `## Submodule Update
            
              This PR updates the \`${{ env.SUBMODULE_PATH }}\` submodule to the latest version.
            
              ### Changes
              - **From Commit:** \`${{ env.CURRENT_COMMIT }}\`
              - **To Commit:** \`${{ env.LATEST_COMMIT }}\`
            
              ### Details
              This automated update was triggered by a push to the main branch and brings in the latest changes from the submodule repository.
            
              Please review the changes in the submodule repository before merging this PR.
            
              ---
              *This PR was created automatically by GitHub Actions*`,
              draft: false
            });
            
            console.log(`Pull request created: ${pullRequest.html_url}`);
            
            // Add labels if desired
            try {
              await github.rest.issues.addLabels({
                owner: repoOwner,
                repo: repoName,
                issue_number: pullRequest.number,
                labels: ['dependencies', 'submodule-update', 'automated']
              });
            } catch (error) {
              console.log('Note: Could not add labels (labels may not exist in target repo)');
            }
```

### Summary and completion

These final steps provide logging and status reporting:

```yaml
      - name: Summary
        run: |
          if [ "${{ env.UPDATE_NEEDED }}" == "true" ]; then
            echo "✅ Submodule updated and PR created successfully!"
            echo "Repository: ${{ matrix.config.target_repo }}"
            echo "Path: ${{ env.SUBMODULE_PATH }}"
            echo "Branch: ${{ env.BRANCH_NAME }}"
          else
            echo "ℹ️ Submodule ${{ env.SUBMODULE_PATH }} in ${{ matrix.config.target_repo }} is already up to date."
          fi

  final-summary:
    needs: [ setup, update-submodules ]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Workflow Summary
        run: |
          echo "🎉 Submodule update workflow completed!"
          echo "Processed repositories based on configuration matrix."
          
          if [ "${{ needs.update-submodules.result }}" == "success" ]; then
            echo "✅ All updates completed successfully"
          elif [ "${{ needs.update-submodules.result }}" == "failure" ]; then
            echo "❌ Some updates failed - check individual job results"
          else
            echo "ℹ️ Workflow completed with status: ${{ needs.update-submodules.result }}"
          fi
```

## [Bonus] Auto-accept + merge action

I'm leaving this as an open recommendation (and homework lol) for you to implement. The assumption here is that the change is generally safe and so it should be auto-accepted + merged into the target repositories **once it passes all the tests**.

## Wrapping Up

This automated submodule update workflow can save significant time and reduce the risk of human error when managing shared code across multiple repositories. While the initial setup requires some configuration and PAT management, the long-term benefits of having consistent, up-to-date shared code across your entire project ecosystem are substantial. The workflow provides clear visibility into what's being updated through detailed pull requests and commit messages, while still maintaining the safety net of requiring CI tests to pass before any changes are merged. Consider implementing the bonus auto-merge functionality only after you've gained confidence in your test coverage and are comfortable with the automation's reliability.