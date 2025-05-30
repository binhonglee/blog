---
title: A/B Testing
subtitle: "Basic guide to running a good A/B test"
date: 2025-06-06 00:00:00 -0800 GMT
tags: []
ss: preview/a_b_testing.jpg
aliases:
  - /a_b_testing/
build:
  list: never
  publishResources: true
  render: always
---

This is a basic introduction on how to run a good A/B test. A/B testing is a method where your user pool is segmented into multiple groups, allowing you to test different product interactions and understand how these changes affect user behavior. For any metric / data driven team, A/B testing serves as a critical tool in measuring success.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

## Tooling

If your employer does not already have a working tool for experimentation, I'd recommend adopting one of the existing tools / platforms (like [Statsig](https://statsig.com/), [GrowthBook](https://www.growthbook.io/), [LaunchDarkly](https://launchdarkly.com/) etc.) specifically built with this in mind. On a basic level, they should provide a toggle that splits users into 2 (or more) groups for testing purposes. Their downstream metrics will then be logged (after first exposure) to measure if / how these changes might have affected the users. While it's _possible_ to build your own A/B testing tool in-house, the build and maintenance cost is likely not worth it compared to just adopting ready-made ones.

## Goal + Guardrail metrics

> "When a measure becomes a target, it ceases to be a good measure" - Goodhart's Law

Goal metrics serve as a target, the specific thing you want to change or improve. While I largely agree with Goodhart's Law, I also believe that a sufficiently comprehensive **set** of metrics will help mitigate the downside (or at least minimize it) thus making it still _relatively_ "a good measure". This is where guardrail metrics come in to ensure we aren't just "sacrificing x to boost y" especially in an unsustainable manner.

As an example, if you want to increase usage on your app, you can provide generous discounts (or even pay users to do so) but that's obviously very unsustainable so you should set a clear budget on how much you can spend on these promotions and / or cost per new active user acquired you allow for such a project to ship. Here your goal metric would be "new active users acquired" while your guardrail would be cost (lost revenue). They need to both look good from the experiment before you decide on shipping the product change.

## Size and Duration

Generally, size and duration are the 2 main levers to help get your experiment sufficient exposure that allows you to make (statistically) informed decisions. If you don't have a large user base then many of your tests would need a large test group with long test duration to show any statistically significant movement. This unfortunately means that your new feature release cycle will be much slower as your experiments will be queued. In this scenario, you will need to smartly pair up different features that complement one another into the same experiment.

## Holdout

In order to accurately measure your team's impact over a certain period of time, you can create a team-wide holdout that keeps a small group of users without the new enhancements. From here, you can see the value of all your team's projects over that period of time (quarter / half) collectively. When you run experiments, you are only testing the impact of specific changes while here you are testing them collectively. Some changes conflict with each other while others complement each other. Ideally you catch them early and run variations of different combinations but you don't always catch them all so having a team wide holdout helps with tracking that.

## Novelty effect

When a new restaurant first opens in a popular area, it will be filled with people lining up to try it out. These people will then attract more people who also decide to check out the restaurant out of curiosity. However, the crowd will slowly wind down over time as it loses its _novelty_ status. If it's any good, it would still remain popular but unlikely to be as popular as it first opened. This is called novelty effect. When you add a new button to the screen, the user's likelihood to click on it increases due to their curiosity on what it does. You don't want to measure that. Instead, you want to measure the actual traffic (and effect) of it _after_ the novelty wears down. Just like how a good restaurant will still be popular long after its initial launch, you want your feature to be valuable / impactful even long after it's been launched and users clearly understand what it does.

## Security

When making a security related change (fix or enhancement), a lot of these concepts become a bit trickier especially for critical issues. Mainly because bad actors can figure out that you are doing an A/B test based on their account ID / device ID / IP address and do targeted exploits on the unprotected test group. This makes it rather a futile effort to understand whatever topline metric movement you want to study of this change on regular benign users but instead, becomes more like opening a new window for exploits.

## Wrap up

Running good A/B tests isn't just about having the right tools—it's about building the discipline to ask the right questions and measure what actually matters. The fundamentals covered here will prevent most common pitfalls that lead to misleading results or shipping changes that hurt your product. **A/B testing is a means to an end.** The best growth teams quickly kill bad ideas and double down on what's working. Start simple, get comfortable with the process, and don't let perfect be the enemy of good—a simple, well-run test is infinitely better than a complex experiment that sits in planning forever.