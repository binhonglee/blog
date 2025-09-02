---
title: GitHub Action Runner Alternatives
subtitle: "Cheaper hosted 3rd party solutions"
date: 2025-09-02 00:00:00 -0800 GMT
tags: []
ss: preview/gh_action_runner_alt.jpg
aliases:
  - /gh_action_runner_alt/
---

A few months ago, I wrote about my attempt and reasoning behind [managing my own fleet of self-hosted GitHub Action Runners](/blog/2025-04-25-self-hosted-github-runners/). I've since learnt that there are quite a few hosted alternative runners that are both faster and cheaper than GitHub's default runners. This article is just a quick summary of what I've found.

## Linux Runners Comparison

| Provider | Free Tier | Paid Pricing (2vCPU) | Performance | Special Features |
|----------|-----------|---------------------------|-------------|------------------|
| [Blacksmith](https://www.blacksmith.sh/) | 3,000 minutes/month | $0.004/min (50% of GitHub) | 2x faster builds, 4x faster cache | Unlimited concurrency, gaming CPUs |
| [BuildJet](https://buildjet.com/) | $5 one-time credit | $0.004/min (50% of GitHub) | 2x faster (variable CPU models) | 64 AMD + 32 ARM concurrent vCPUs, 20GB cache |
| [CarbonRunner](https://carbonrunner.io/) | ❌ None | $0.006/min (25% cheaper than GitHub) | Standard performance | 90% lower CO2 emissions, 42 regions |
| [Cirrus Runners](https://cirrus-runners.app/) | ❌ None | $150/month unlimited | 2-3x faster performance | Fixed pricing, no minute limits, limited concurrency |
| [Depot](http://depot.dev/) | ❌ None | $20 for 20,000 minutes, then $0.004/min | 30% faster, 10x faster cache | Docker-focused, per-second billing, unlimited cache |
| GitHub | 2,000 minutes/month | $0.008/min | Baseline | Official support |
| [Namespace](https://namespace.so/) | ❌ None | $0.003 | Fastest x64 performance | 250GB storage, SSH access |
| [puzl.cloud](https://puzl.cloud/) | 400 vCPU-minutes/month | $0.0008/min (€0.000008/vCPU-sec) | 2x faster, 5x cheaper | Real-time per-second billing, 12vCPU per job |
| [Sprinters.sh](https://sprinters.sh/) | ❌ None | Per-job pricing (10x cheaper) | Standard performance | Self-hosted in AWS, per-job pricing |
| [RunsOn](https://runs-on.com/) | Free for non-commercial | €300/year + $0.001-0.003/min (AWS costs) | 30% faster, 90% cheaper | Self-hosted in AWS, GPUs, Windows |
| [Ubicloud](https://www.ubicloud.com/) | 1,250 minutes (~$1 credit) | $0.0008/min (10x cheaper) | Newer CPUs, good performance | Open source, Hetzner hardware |
| [WarpBuild](https://www.warpbuild.com/) | ❌ None | $0.004/min (50% of GitHub) | 2x faster, 50% cheaper | Snapshots, unlimited cache |

## macOS Runners Comparison

| Provider | Pricing | Hardware | Performance | Key Features |
|----------|------------------|----------|---------------------|--------------|
| [Cirrus Runners](https://cirrus-runners.app/) | $150/month unlimited | M4 Pro (latest) | 2x faster performance | Fixed pricing, no minute limits, limited concurrency |
| GitHub | $0.08/min (10x multiplier) | Intel Mac + M2 Pro XL ($0.16/min) | Baseline | Official support |
| [Namespace](https://namespace.so/) | $0.09 | M4 Pro + M2 Pro | Fastest available | SSH/VNC access, bleeding-edge images |
| [WarpBuild](https://www.warpbuild.com/) | $0.04/min (50% cheaper) | M2 Pro | 25% faster, 50% cheaper | Pay-per-use, macOS 13/14 support |

## Widget

I don't have a better place to put this but I built a very basic widget that takes into account of the "supposed" faster speed (leading to less action minutes) with each of their rates so you can find out which platform fits you best based on your usage (with GitHub's Action Runner minutes as baseline).

{{< gh_action_runner_widget >}}

_Note: Sprinters.sh is priced per job instead of per min (like everyone else) so I didn't include it in the comparison above._

_Note2: Cirrus Runners limits on concurrency instead of minutes so the experience might vary (depending on usage)._

_Note3: "Speed" is loosely defined based on acclaimed performance but not verified in any way, shape, or form._

## Wrap up

Obviously this is a rather simplistic view of the cost comparison (as well as the _speed_ factor being unverified) between different options available in the market. Personally, I opted for Blacksmith for all my linux needs while continue to host my own M4 mac mini at home as the macOS runner (since the electricity cost is still cheaper than any of the above options).
