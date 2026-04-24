---
title: GitHub Action Runner Alternatives
subtitle: "Cheaper hosted 3rd party solutions"
tags: ["GitHub Action Runner"]
ss: preview/gh_action_runner_alt.jpg
aliases:
  - /gh_action_runner_alt/
---

_Last Updated: Apr 24th 2026_

A while ago, I wrote about my attempt and reasoning behind [managing my own fleet of self-hosted GitHub Action Runners](/blog/2025-04-25-self-hosted-github-runners/). I've since learnt that there are quite a few hosted alternative runners that are both faster and cheaper than GitHub's default runners. This article is just a quick summary of what I've found.

## Hosted Runners



### Linux Runners Comparison

| Provider | Free Tier | Paid Pricing (2vCPU) | Performance | Special Features |
|----------|-----------|---------------------------|-------------|------------------|
| [Blacksmith](https://www.blacksmith.sh/) | 3,000 minutes/month | $0.004/min | 2x faster builds, 4x faster cache | Unlimited concurrency, gaming CPUs |
| [Depot](http://depot.dev/) | ❌ None | $20 for 2,000 minutes, then $0.004/min | 30% faster, 10x faster cache | Docker-focused |
| GitHub | 2,000 minutes/month | $0.006/min | Baseline | Official support |
| [Namespace](https://namespace.so/) | ❌ None | $0.003/min | 2x-10x faster | 250GB storage, SSH access |
| [puzl.cloud](https://puzl.cloud/) | 400 vCPU-minutes/month, 800 GB-minutes/month | €0.00002/vCPU second + €0.000001/GB second | 2x faster | Fine grained per vCPU per GB RAM usage billing |
| [Shipfox](https://www.shipfox.io/) | 3,000 minutes/month | $0.004/min | 2x faster builds | Unlimited concurrency |
| [Tenki](https://tenki.cloud/) | 1,700 minutes/month | $0.003/min | 30% faster | Bundled AI Code Reviewer service |
| [Ubicloud](https://www.ubicloud.com/) | ~1,250 minutes ($1 credit) | $0.0008/min | Newer CPUs, good performance | Open source, Hetzner hardware |
| [WarpBuild](https://www.warpbuild.com/) | ❌ None | $0.004/min | 2x faster | Snapshots |

### macOS Runners Comparison

| Provider | Free tier | Pricing | Hardware | Performance | Key Features |
|----------|-----------|---------|----------|-------------|--------------|
| [Blacksmith](https://www.blacksmith.sh/) | ~98 minutes/month | $0.08/min | M4 Macs | 2x faster builds, 4x faster cache | Unlimited concurrency |
| [GetMac](https://getmac.io/) | 100 minutes/month | ~$0.012/min | M4 Macs | 3x faster builds | 100% renewable energy |
| GitHub | 200 minutes/month | $0.062/min | Intel Mac + M2 Pro XL ($0.102/min) | Baseline | Official support |
| [Namespace](https://namespace.so/) | ❌ None | $0.09 | M4 Pro + M2 Pro | Up to 3x faster | SSH/VNC access, bleeding-edge images |
| [Tenki](https://tenki.cloud/) | ❌ None | $0.05/min | M4 Pro | 30% faster | Bundled AI Code Reviewer service |
| [WarpBuild](https://www.warpbuild.com/) | ❌ None | $0.08/min | M4 Pro | 25% faster | Pay-per-use, macOS 13/14 support |

## Bring Your Own Cloud

_WIP: I'm working on a new BYOC section that will re-add some removed services and a few other services onto this page. Please bear with me while I try to do my research (and math). Thanks!_

## Widgets

I don't have a better place to put this but I built a very basic widget that takes into account of the "supposed" faster speed (leading to less action minutes) with each of their rates so you can find out which platform fits you best based on your usage (with GitHub's Action Runner minutes as baseline).

{{< gh_action_runner_widget >}}

_Note (Speed): loosely defined based on acclaimed performance but not verified in any way, shape, or form._

_Note (puzl.cloud): puzl.cloud has a rather complex calculation that heavily depends on how your job was ran rather than a fix per machine per minutes cost so I'm using best guess estimate (of around $0.0008 - $0.0025). Check out [their pricing page](https://runmyjob.io/#Pricing) for more details._

## Wrap up

Obviously this is a rather simplistic view of the cost comparison (as well as the _speed_ factor being unverified) between different options available in the market. Personally, I opted for Blacksmith for all my linux needs while continue to host my own M4 mac mini at home as the macOS runner (since the electricity cost is still cheaper than any of the above options).

---

_Note: This was initially released on **Sept 2nd 2025** but has since gained a lot more traffic than I've expected so I decided to try my best in keeping this article upated. (This changelog section details dates whenever I make an edit. Or you could just lookup the commit history of this on GitHub through the "Source" linked at the bottom.)_

## Changelog

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
