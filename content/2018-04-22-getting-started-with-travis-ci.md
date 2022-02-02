---
title: Getting started with Travis-CI
subtitle: "Add that fancy badge onto your GitHub repository README"
date: 2018-04-22 00:00:00 -0800 GMT
thumbnail: "img/traviscover.png"
tags: [Travis-CI, Continuous Integration, Testing, Automated Deployment, Devops]
aliases:
    - /2018/04/22/getting-started-with-travis-ci.html
---

## What is CI and why should I care about it?

CI stands for Continuous Integration which as the name suggests, is an integrated tests that runs continuously on every time when someone pushes a commit (or mostly when opening a [Pull Request](https://help.github.com/articles/about-pull-requests/)).

As for why is it important, it automates the whole testing modules. Ideally, you would still want to test your changes locally before pushing them to remote but in some occasion where you forgot or the program requires a lot more resources than your current machine can handle, CI comes in very handy. That aside, if your project happen to have people wanting to contribute code, a properly written test with CI will help you in reviewing the changes and ensuring that the contribution would not break the build.

## Why Travis-CI?

There are plenty of CI tools out there (cricleCI, AppVeyor etc.) so why Travis-CI? The straightforward answer is that its the easiest one to get started with especially if you are already on GitHub. This is actually also one of its major drawback which is how tightly tied Travis-CI is onto GitHub. As far as I know, it is not possible to use Travis-CI outside of GitHub. That aside, if you host your projects on GitHub, that should be the least of your concern.

## Setup

First, sign up at [their website](https://travis-ci.org/), link your GitHub account and enable it for the repository you would like to implement this. Do note that this is only for public repositories. If you would like to do this for a private repository instead, you will need to sign up for [Travis-CI Pro](https://docs.travis-ci.com/user/travis-ci-for-private/).

Create a file named `.travis.yml` and add the first line with the programming language you used (unless its Android in which you would then write Android instead of Java).

```yaml
language: java
# (or cpp, android, node_js etc.)
```

Now, there’s also a possibility that running the test might require sudo access to the testing environment in which you would then add the following line above the `language` line.

```yaml
sudo: required
language: cpp
```

## Testing environment

Ideally, you will only be testing it in one environment which means this will be a one liner of this.

```yaml
os: linux
```

However, in most occasion, we will be testing our software with a few different kinds of environment (at the time of writing, Travis-CI seems to only Ubuntu and OSX as seen [here](https://docs.travis-ci.com/user/reference/overview/)). Sometimes, 2 lines is enough.

```yaml
os:
  - linux
  - osx
```

But more time than not, you need complicated configuration for each one of them (especially when it comes to C++ projects).

Here is how the environment configuration for [one of my projects](https://github.com/binhonglee/TicketingSystem/blob/master/.travis.yml) looks like (shortened):

```yaml
matrix:
  include:
    - os: linux
      addons:
        apt:
          sources:
            - ubuntu-toolchain-r-test
          packages:
            - g++-7
      env:
        - MATRIX_EVAL="CC=gcc-7 && CXX=g++-7"

    - os: osx
      osx_image: xcode8
      env:
        - MATRIX_EVAL="brew update && brew install gcc && CC=gcc-7 && CXX=g++-7"
```

## Language specific settings

For some languages, it is a lot more complicated than the others due to the way their versioning works.

### Android

This is probably the most complicated one I’ve come across. It took a lot of tries and failure for me to figure out how it works. ([The documentation](https://docs.travis-ci.com/user/languages/android/) has also since updated which helps greatly.)

```yaml
android:
  components:
    - tools
    - platform-tools
    - build-tools-26.0.2
    - android-26
    - platform-tools
    - extra-android-support
    - extra-google-google_play_services
    - extra-google-m2repository
    - extra-android-m2repository
    - addon-google_apis-google-26
    - sys-img-armeabi-v7a-android-26
```

### C++

There isn’t specific custom configuration available for C++ like for Android above but due to the nature of its complicated OS configuration, you will need to import the matrix from before into the system before installing anything that might be needed to run the test itself. Therefore you will need to add the following.

```yaml
before_install:
  - eval "${MATRIX_EVAL}"
```

### Java

For Java, due to the differences between OpenJDK, OracleJDK and also differences from versions to versions itself (shoutout to OracleJDK 9 & 10), you might want to test your software with every version available.

```yaml
jdk:
  - oraclejdk9
  - oraclejdk8
  - openjdk8
  - openjdk7
```

### Python

Similarly, you can test your software or package against different versions of Python including the development versions.

```yaml
python:
  - "2.7"
  - "3.6"
  - "3.6-dev"
  - "pypy2.7"
  - "pypy3.8"
```

_*Note: Due to recent changes, seems like `3.7-dev`, `3.8-dev`, and `nightly` would not work as of now._

### Node.js

Again, you might need to test your software with multiple versions or node.js except the differences between each version is not as drastic but there are a lot more versions comparatively.

```yaml
node_js:
  - "node"
  - "9"
  - "8"
  - "7"
  - "6"
  - "5"
  - "4"
  - "lts/*"
```

By doing this, you will be testing your software towards possibly 8 versions of node.js.

## Install and run test

If you look into the [specific documentations](https://docs.travis-ci.com/user/languages/) about the configurations for each languages, you will find that many of them has default `install` and `test` scripts but you can always overwrite them with your own scripts or commands like the following.

```yaml
before_install:
  - ./beforeInstall.sh
install:
  - ./install.sh
before_script:
  - ./preTest.sh
script:
  - ./test.sh
```

_*Note:  if you testing in macOS environment and is installing any dependencies through Homebrew (including language dependencies in C++), you will have to do a `brew update` before running anything brew related to prevent an error._

## Deployment

If you host your project externally while using your GitHub repository as your code control, Travis-CI can also help automating the deployment process. Depending on the service provider you use, their configuration can vary greatly from one another. Below, I included some of those that I think is the more popular ones. As you might have guessed, you can also deploy to multiple developers at once. I recommend checking out the [documentation page](https://docs.travis-ci.com/user/deployment) before implementing any of these.

```yaml
before_deploy:
  - ./before_deployment
deploy:
  - provider: heroku
    api_key: "YOUR_API_KEY"
    skip_cleanup: true
    on: production
    run:
      - "./deploy"
  - provider: pages
    github_token: $GITHUB_TOKEN
    skip_cleanup: true
    on: production
    run:
      - "./deploy"
  - provider: npm
    api_key: "YOUR_API_KEY"
    email: "email@domain.com"
    on: production
  - provider: elasticbeanstalk
    access_key_id: <access-key-id>
    secret_access_key:
      secure: "Encypted <secret-access-key>"
    region: "us-east-1"
    app: "your-app-name"
    env: "your-app-environment"
  - provider: pypi
    user: "username"
    password: "password"
after_deploy:
  - ./post_deployment
```

---

## Code coverage

Along with testing, I would also recommend using a tool to analyze your code coverage. It will show you how much coverage your test has over your codes (and usually, use cases). Personally, I use the tool called [codecov](https://codecov.io/).

## Add the badge!

If you are like me, the reason I was hooked up by this is because long time ago when I first got on GitHub, I saw plenty of repositories have the badge that shows if their build is `passing` or `failing`. I thought that was really fancy and wanted one of those so I started getting myself to learn what CI as a whole is about and how can I make use of it. Turns out, its a lot more useful than just being pretty!

> _This article was originally published on [codeburst.io](https://codeburst.io/getting-started-with-travis-ci-f3223082f256)._
