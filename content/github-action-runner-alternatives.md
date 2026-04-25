---
title: GitHub Action Runner Alternatives
subtitle: "Cheaper hosted 3rd party solutions"
tags: ["GitHub Action Runner"]
ss: preview/gh_action_runner_alt.jpg
aliases:
  - /gh_action_runner_alt/
---

_Last Updated: Apr 25th 2026_

A while ago, I wrote about my attempt and reasoning behind [managing my own fleet of self-hosted GitHub Action Runners](/blog/2025-04-25-self-hosted-github-runners/). I've since learnt that there are quite a few hosted alternative runners that are both faster and cheaper than GitHub's default runners. This article is just a quick summary of what I've found.

## Hosted Runners

These are essentially "full service" GitHub Action Runners. You don't have to do anything else except to create an account, setup billing, then change the `runs-on` label in your GitHub Action YAML file. It's easy to adopt but you're still essentially running on servers that are managed by the service providers. If you prefer to bring your own cloud services (AWS, Azure etc.), check out the [BYOC section below](#bring-your-own-cloud-byoc)!

### Linux Runners Comparison

| Provider | Free Tier | Paid Pricing (2vCPU, 8GB) | Performance | Special Features |
|----------|-----------|----------------------|-------------|------------------|
| [Blacksmith](https://www.blacksmith.sh/) | 3,000 minutes/month | $0.004/min | 2x faster builds, 4x faster cache | Unlimited concurrency, gaming CPUs |
| [Depot](http://depot.dev/) | ❌ None | $20 for 2,000 minutes, then $0.004/min | 30% faster, 10x faster cache | Docker-focused |
| GitHub | 2,000 minutes/month | $0.006/min | Baseline | Official support |
| [Namespace](https://namespace.so/) | ❌ None | $0.004/min | 2x-10x faster | 250GB storage, SSH access |
| [puzl.cloud](https://puzl.cloud/) | 400 vCPU-minutes/month, 800 GB-minutes/month | €0.00002/vCPU second + €0.000001/GB second | 2x faster | Fine grained per vCPU per GB RAM usage billing |
| [Shipfox](https://www.shipfox.io/) | 3,000 minutes/month | $0.004/min | 2x faster builds | Unlimited concurrency |
| [Tenki](https://tenki.cloud/) | 1,700 minutes/month | $0.003/min | 30% faster | Bundled AI Code Reviewer service |
| [Ubicloud](https://www.ubicloud.com/) | ~1,250 minutes ($1 credit) | $0.0008/min | ~30% faster | Open source, Hetzner hardware |
| [WarpBuild](https://www.warpbuild.com/) | ❌ None | $0.004/min | 2x faster | Unlimited concurrency |

### macOS Runners Comparison

| Provider | Free tier | Paid Pricing | Hardware | Performance | Special Features |
|----------|-----------|--------------|----------|-------------|------------------|
| [Blacksmith](https://www.blacksmith.sh/) | ~98 minutes/month | $0.08/min | M4 Macs | 2x faster builds, 4x faster cache | Unlimited concurrency |
| [Depot](http://depot.dev/) | ❌ None | $20 for 100 minutes, then $0.08/min | 30% faster, 10x faster cache | Docker-focused |
| [GetMac](https://getmac.io/) | 100 minutes/month | ~$0.012/min | M4 Macs | 3x faster builds | SSH/VNC access, 100% renewable energy |
| GitHub | 200 minutes/month | $0.062/min | Intel Mac + M2 Pro XL ($0.102/min) | Baseline | Official support |
| [Namespace](https://namespace.so/) | ❌ None | $0.09 | M4 Pro + M2 Pro | Up to 3x faster | SSH/VNC access |
| [Tenki](https://tenki.cloud/) | ❌ None | $0.05/min | M4 Pro | 30% faster | Bundled AI Code Reviewer service |
| [WarpBuild](https://www.warpbuild.com/) | ❌ None | $0.08/min | M4 Pro | 25% faster | Unlimited concurrency |

### Windows Runners Comparison

| Provider | Free tier | Paid Pricing | Performance | Special Features |
|----------|-----------|--------------|----------|-------------|------------------|
| [Blacksmith](https://www.blacksmith.sh/) | 1,500 minutes/month | $0.008/min | 2x faster builds, 4x faster cache | Unlimited concurrency |
| [Depot](http://depot.dev/) | ❌ None | $20 for 1,000 minutes, then $0.008/min | 30% faster, 10x faster cache | Docker-focused |
| GitHub | ~1197 minutes/month | $0.01/min | Baseline | Official support |
| [Namespace](https://namespace.so/) | ❌ None | $100 for 50,000 minutes, then $0.008/min | 2x-10x faster | 250GB storage, SSH/VNC access |
| [WarpBuild](https://www.warpbuild.com/) | ❌ None | $0.008/min | 25% faster | Unlimited concurrency |

## Bring Your Own Cloud (BYOC)

Unlike the full service hosted runners, BYOC is designed for users who are already using an existing cloud service (or have their own bare-metal hosts) would prefer to use that as the action runners instead of using the external party's server.

| Provider | Free Tier | Pricing | Supported Cloud | Supported Images |
|----------|-----------|---------|-----------------|------------------|
| [Actuated](https://actuated.com/) | ❌ None | $250/month | Any bare-metal hosts and / or VM with nested virtualisation | Ubuntu |
| [Cirun](https://cirun.io/) | Free for public repositories | $29/month for 3 private repositories, $79/month for 10 private repositories | All major cloud services and / or on-prem servers | Ubuntu, Windows, macOS, Custom Images |
| [RunsOn](https://runs-on.com/) | 15 days free trial | 300€/year | AWS | Ubuntu, Windows, macOS, Custom Images |
| [Sprinters.sh](https://sprinters.sh/) | Free for public repositories | $0.01/job | AWS | Ubuntu |
| [WarpBuild](https://www.warpbuild.com/) | ❌ None | $0.002/min | AWS, GCP, Azure | Linux, Windows |

## Widget

I built a very basic widget that _tries to_ take into account of the "supposed" faster speed (leading to less action minutes) with each of their rates so you can find out which platform fits you best based on your usage (with GitHub's Action Runner minutes as baseline comparison).

{{< gh_action_runner_widget >}}

_Note (Speed): loosely defined based on acclaimed performance but not verified in any way, shape, or form._

_Note (puzl.cloud): puzl.cloud has a rather complex calculation that heavily depends on how your job was ran rather than a fix per machine per minutes cost so I'm using best guess estimate (of around $0.0008 - $0.0025). Check out [their pricing page](https://runmyjob.io/#Pricing) for more details._

## Wrap up

Obviously this is a rather simplistic view of the cost comparison (as well as the _speed_ factor being unverified) between different options available in the market. Personally, I opted for Blacksmith for all my linux needs ~~while continue to host my own M4 mac mini at home as the macOS runner (since the electricity cost is still cheaper than any of the above options)~~ moved my macOS runs to use GetMac as I was moving countries and can't self-host reliably.

---

_Note: This was initially released on **Sept 2nd 2025** but has since gained a lot more traffic than I've expected so I decided to try my best in keeping this article upated. (This changelog section details dates whenever I make an edit. Or you could just lookup the commit history of this on GitHub through the "Source" linked at the bottom.)_

## Changelog

Apr 25th 2026
- New BYOC section
  - Re-added Sprinters.sh
  - Re-added RunsOn
  - Added Actuated
  - Added Cirun
- Integrate BYOC into the widget
- Added a Windows section under hosted runners

Apr 24th 2026
- Removed BuildJet ([service shutdown 😢](https://buildjet.com/for-github-actions/blog/we-are-shutting-down))
- Removed CarbonRunner ([service shutdown 😢](https://carbonrunner.io/))
- Removed Cirrus Runners ([service shutdown post OpenAI acquisition](https://cirruslabs.org/))
- Added Blacksmith to macOS runner ([newly added](https://www.blacksmith.sh/blog/how-we-shipped-mac-runners-in-3-weeks))
- Added GetMac to macOS runner
- Added Shipfox to linux runner
- Added Tenki to both linux and macOS runner
- Removed Sprinters.sh (will readd later to BYOC section)
- Removed RunsOn (will readd later to BYOC section)

---
