---
title: Internal Tooling Ideas
subtitle: "When and what to build for internal tools?"
date: 2025-07-03 00:00:00 -0800 GMT
tags: []
ss: preview/internal_tooling_ideas.jpg
aliases:
  - /internal_tooling_ideas/
build:
  list: never
  publishResources: true
  render: always
---

For years, I built and maintained the only logged-out accessible dev tool set / platform at Meta. That earned me some reputation (in a certain circle) of being "the idea guy on internal tools". Whenever I'm asked about how I keep coming up with good ideas for valuable tools to build, my go-to answer has been "I build tools when I get annoyed while doing my job". I'll try to expand that into more details below.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

## Repetitive Typing

The biggest value of having logged-out accessible dev tools is that you no longer have to log in to access dev tools. Login, while generally not too big of a friction for one-off situations, can be very bothersome if you have to type your credentials over and over again (for dev purposes) as you login (update config) → logout (test) → login (update config) → logout (test). If bypassing or removing the typing aspect is not possible, consider if it can be replaced with multiple choice button selection or just a single copy-paste friendly input.

## Unnecessary Waiting / Processing

There are generally 2 types of waiting problems. The first one is where the wait takes a really long time and can be done asynchronously. Either move the wait into an async manner and integrate a messaging system to notify the author when it's completed, or pre-process them based on known patterns. For example, companies with large native app (iOS / Android) code bases have long build times. You can integrate build tools like [Bazel with remote caching](https://bazel.build/remote/caching) so clients don't have to rebuild everything from scratch. Since an engineer will likely want to pull from remote `HEAD` (or `stable`) daily, you can have a cron job that pulls and builds daily in the morning before the engineer starts working, thus turning their wait block time into an _invisible_ operation done automagically while they are having their breakfast or morning coffee.

## Device Config > Manual Hard-code

In many of these cases, you can probably do manual hard-coding to get the intended behavior. However, doing so increases the risk of accidentally committing such hard-coded changes into prod (if not caught during code review). On top of that, when working on a complex code base, the engineer might not be familiar with the code pointer for where the hard-code needs to go. For instance, if you want to bypass the rate-limit of your feature but the rate-limit logic is owned by a separate team in an unfamiliar code base. As an added bonus, this also allows non-technical members of your team (designers, PMs etc.) to do product audits, dogfooding, and in-depth testing independently without needing dedicated engineering support.

## Non-deterministic Behaviors (ML override)

This is somewhat similar to the manual hardcode situation mentioned above where you might want to override an ML decision to manually test out different decision combinations by the model. ML models (and AI) are relatively non-deterministic by design, but when building / testing a product, you want to make sure that you covered all the different possible scenarios. Having an override to switch between different potential responses allows for better coverage on both manual and automated testing, ensuring that your change behaves as intended.

## Chore

This is more about employee satisfaction when working on a repetitive task may be boring or frustrating. Having tools to automate such work allows them to explore more interesting / challenging work, thus improving employee satisfaction, even if it doesn't necessarily save a significant amount of time. The best "realistic" way to measure this would be a rating system where you count the number of employees using it and ask for their feedback (both positive and negative), then compile to show the value it provides.

## Wrap up

Building internal tools is about removing friction from your team's daily workflow. The best tools emerge from genuine pain points you experience while doing your job. Start small and focus on the annoyances that happen most frequently. The key is to stay observant of your own frustrations and act on them. Every great internal tool started with someone saying "there has to be a better way to do this".