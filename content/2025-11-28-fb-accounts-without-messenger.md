---
title: FB accounts created without Messenger
subtitle: "tfw you accidentally break FB for millions of new users"
date: 2025-11-28 00:00:00 -0800 GMT
tags: [Project Presentation]
ss: "preview/fb_accounts_without_messenger.jpg"
aliases:
  - /fb_accounts_without_messenger/
build:
  list: never
  publishResources: true
  render: always
---

This was one of my first experience at causing a SEV. I've broken production before 🫣 but not bad enough for it to be a SEV. In this situation, millions of new FB accounts were created (over the duration of the outage) without proper messaging inbox thus unable to use Messenger. I'll dive more into how this happens below.

_This is part of a series [(Project Presentation)](/blog/project-presentation/) where I share stories of my past projects._

## Background

When a user tries to create a new account on FB, the system would actually first try to login with the provided credentials to see if it matches any existing account. If it matches, the user would be logged-in to their existing account instead of having a new account created. I added a new feature that make the login / matching system more complex which increases the success rate of it getting matched with an existing account (while maintaining the same low risk profile).

![](/blog/img/fb_account_without_messenger_1.png "Simple diagram showing the new change")

The problem however, was that the account creation process by itself was already a complex and lengthy process that takes a long time. So by adding extra processing to it (before account creation is even triggered), the entire process ended up taking so long that the request was timed-out and account creation process was halted halfway. This means accounts were created with bits-and-pieces missing, most notably it's messaging inbox.

## Discovery

This was discovered by an engineer in the Messenger org. They started noticing new accounts without messaging inbox and thought it was weird but they didn't think too much of it. They just manually triggered a job to retroactively create it for those accounts. For the 2 weeks I ran my experiment (a/b test), they just ran the job manually for the subset of new users without a messaging inbox. But when I launch the experience (due to successful a/b test), things got a bit out of hand.

This engineer started seeing significantly (~20x) more new users daily being created without a messaging inbox so they filed a SEV. At some point, someone was able to pinpoint the angle change of their graph with my experiment launch. Seeing as my project directly affects the way account creation process works, it's very likely to be related, thus I got pulled in.

## Verification + Resolution

I was initially skeptical at their reasoning around why these new accounts are missing the messaging inbox and thought there might be something else. But to prove it either way, I decided to pull the plug and unship the project to see if that solves the issue. **It did.** I was wrong but now we need to figure out (ideally) if there's a way to fix this while still shipping the project. We pulled in more help from people who better knows how new account creation works to see if there are other things broken (aside from inbox).

![](/blog/img/fb_account_without_messenger_2.png "Simple diagram showing the fix")

As far as we can tell, only inbox was affected by this. So we essentially moved messaging inbox creation to be triggered earlier (as one of the top-tier jobs to be ran in parallel). We re-tested it and see this fixes the issue for all but one or two interfaces (I think it was FBLite and maybe mWeb that still had issues). I actually kept the SEV in `Cleanup` state for a bit until we dropped it off as the team (technically just half the team which included me) had a prioritization shift moving away from growth to 0 -> 1 so we just left it as is.

_Eventually, the whole account creation flow was replaced anyway as part of the 0 -> 1 effort to launch [the new unified experience](https://about.fb.com/news/2022/09/accounts-center-facebook-and-instagram/)._

## Aftermath

I was made the SEV owner (being the person who caused it) and filled out the SEV report. I don't remember too clearly how the review went anymore but I did know that I was really nervous throughout. I learnt a lot from the process and as far as I know, I was not penalized for it in my performance review seeing it wasn't exactly _my_ failure that caused this (more on [No Blame SEV Culture](/blog/2025-05-30-no-blame-sev-culture/)).

## Takeaway

The main takeaway here is that metric monitoring and analysis only goes so far in making sure things work. It generally doesn't cover things that are affected outside of your immediate team's scope. Secondly, even if skeptical, don't assume without proof. I was skeptical that my experiment was the rootcause but I'm glad I committed to verifying it anyway (which proved myself wrong). Stressful at the time, but good learning experience overall.