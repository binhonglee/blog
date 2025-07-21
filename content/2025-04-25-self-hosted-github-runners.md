---
title: Self-Hosted GitHub Actions Runners
subtitle: "Turning your old laptops into GARs"
date: 2025-04-25 00:00:00 -0800 GMT
tags: [GitHub, Action Runners, Self Hosted, Continuous Integration]
ss: "preview/self_hosted_github_runners.jpg"
aliases:
    - /self_hosted_github_runners/
---

This post will focus more on the "why" and some of the quirks around doing so instead of the "how" since GitHub already have [a very comprehensive guide](https://docs.github.com/en/actions/hosting-your-own-runners) around it.

_Just wanted to take a bit of time to acknowledge that it's been almost 3 years since I last wrote a blog post. It's been a busy 3 years for sure but hopefully I'll be writing more consistently moving forward. (I do have quite a few half-written drafts that I've never published which I can't tell if it's still relavant at this point.)_

## What's a GitHub Actions Runner?

Basically instead of running GitHub Actions (GitHub's own CI/CD) on GitHub's machines, you can run them on your own devices. Running GitHub Actions on your self-hosted GARs would not count against your monthly Action minutes (since you are not using their machines) and can be an effective cost saving alternative.

## Why do I even need to self-host it?

The main use-cases is when you have private GitHub repositories so you only have 2000 included Actions minutes. While it might make sense for you to pay for GitHub Pro (which comes with more GitHub minutes), I didn't find myself needing all other features that comes with it. On top of that, I happen to have a few old computers lying around so I figured I'd use them as ever-on GitHub runners. (So far, the electricity bill seems to be cheaper than paying for extra minutes or paying for any external equivalent CI service.)

## Why not Gitea Runners (or other self-hosted CI services)?

Personally, I already have GitHub Actions setup so migrating to a different CI service will take additional effort while still having similar limitations (for free plans). That said, Gitea actions mostly allows you to reuse GitHub action yamls (with a few minor exceptions like artifact upload / downloads). I stuck with using GitHub instead of fully migrating to self-hosted Gitea mainly due to the way dependabot and / or renovate-bot is already easily integrated without needing yet another action to trigger.

## Linux (with WSL)

I have a _somewhat_ old Windows laptop (almost 6 years old, but broken battery and built-in keyboard) which is still pretty powerful aside from the fact that it can no longer be used as a laptop. It really hasn't been used in any meaningful way for a while now so I decided to do some cleanup then setup multiple instances of WSL (with the same distro for convenience sake). The one issue I did ran into was when we needed postgres running in the background. Generally, you'd use a docker image of it on GH action but you actually can't have multiple copies of postgres running on the same device because it'd complain about port 5432 being in use. (I tried blocking port sharing between instances but it didn't seem to resolve the issue.) Eventually, I just install postgres on every instance but they all just uses the service from the first instance (which occupies the 5432 port). So far, it has mostly been working as expected.

## macOS (with UTM)

For the past few years, the only macOS device I own was a 2014 MacBook Air (which surprisingly still holds up... to some extend). So when I decided to start building an iOS app for [GlobeTrotte](https://globetrotte.com), I knew I needed to buy a new Mac device. I ended up getting a BNIB M4 Mac Mini from some dude on FB Marketplace (for like $500). That said, I slowly learnt the pain of an immobile dev device so I copped for a used M2 MacBook Air (also for around $500). With that, my Mac Mini is officially freed up to do whatever so I install UTM on it to replicate the WSL setup of having multiple VM running on a device. However, I quickly ran into storage limitation issue since I need at least ~50GB storage per instance in order to run iOS simulators with XCode on it. The main instance only have 256GB storage where more than half is already occupied with all sorts of things other stuff. So instead, I setup a HDD dock and tried running UTM images on them. For what it's worth, it works but the experience wasn't exactly great. The whole OS moves really slowly / laggy but I guess if it works, it works(?). I am contemplating on getting an external m.2 SSD to see if it'd do better. Will update this section of the post if I ended up doing so.

## Pros

Aside from the obvious advantages of not having to pay for CI fees and repurposing your old tech devices, it's also valuable to have a consistent device setup especially across dev and CI environment (so you know test failures aren't due to some missing setups). That said, I don't think anything else particularly stood out aside from the cost factor and the ease of use (and it being _quasi-industry-standard_).

## Cons

In my case, these are being ran on my personal devices at home so if my internet goes down, essentially my entire CI service goes down with it (which isn't ideal). As mentioned above, I've also explored the option to host them on VPS but the cost (for a machine that can consistently run it) is really high. Lower tier VPS (like those available for $5/mo) generally have too little RAM causing it to freeze up a lot when running heavier operations (like e2e tests). Maybe I can bring an old computer to a friend's / family's house and run it on there but then you'd incur electricity bills at their place. (As far as I can tell, it's not much but that's generally not the way to treat people who trust you.)

## Wrap up

I did this mainly to save money and hassle to figure out which plan I need or what CI service fits me best. I used to run my own CI service with [drone.io](https://drone.io) many years ago [(which you can read more about here)](https://binhong.me/blog/2018-08-20-hosting-your-own-git-server-with-gitea/#droneio) but ran into the exact issue on VPS having rather limited RAM. Hopefully this setup can stay around for a bit longer and facilitate GlobeTrotte on _moving fast_.
