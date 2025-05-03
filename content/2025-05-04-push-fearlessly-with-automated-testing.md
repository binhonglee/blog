---
title: Push Fearlessly with Automated Testing
subtitle: "Move faster by moving slower"
date: 2025-05-04 00:00:00 -0800 GMT
tags: []
ss: "preview/push_fearlessly_with_automated_testing.jpg"
aliases:
    - /push_fearlessly_with_automated_testing/
---

Conventional wisdom is that writing tests slows you down, because the alternative is that you don't need to write tests. In fact, Meta (then Facebook) was famously lacking of automated test inline with it's famous "move fast and break things" mantra. However, from what I've seen, I beg to differ.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

## When to write tests?

> If you love something, put a ~~ring~~ test on it.

I find this quote as a good general guiding principle. You should definitely have tests for all the "core" features. For all the additional features (or edge case handling), you'd need to make a decision / tradeoff based on how critical it is for something to work, and how frequent you might be changing it. 

## Fearlessly 

The main goal of writing tests is to prevent regressions. Without automated tests, you'd have to rely on other (less reliable) ways to avoid regression. Having (non-flaky) tests makes it easy to consistently verify when / how a regression is introduced. With the right CI system setup, you can make sure that you don't release new versions / feature that would accidentally break previously released features in an unexpected way.

## Assumptions / Prerequisite 

The expectation here is that you already have a working CI/CD pipeline setup which comprehensively runs all your tests for each commit merges and deployments. Alternatively, if you have too big of a test suite to run (or too costly), you could instead only run relavant tests on each individual commits while running all tests for each deployment.  If there’s a test that failed before deployment, you could still bisect to find the blame commit that broke the test. 

## What about manual testing?

The main issue with manual testing is that you don't know what you don't know. You know your code change affects x and y so you test them both and they work as intended but what you didn't realize was that it also breaks z entirely which you did not test because that was unexpected. Having an automated test means you'd just always run the test suite (within your CI/CD process) which would be able to catch the issue.

## What about QA testing?

QA testing generally happens on a weekly or bi-weekly (either definition) cadence. At best, you can do them on a daily basis but depending on the scale or speed at which your team is executing, it might still be hard to narrow down the specific commit that is causing the regression. With automated tests, you can bisect through your commit history without having to worry about setup and cleanup steps (assuming your tests are properly written).

## Why not just write test for everything?

In an ideal world where the cost to write test is 0, this would be a prescribed solution and everyone will be adopting TDD (Test Driven Development) but instead, we live in a real world where writing tests cost time and energy so it's important to pick and choose things worth investing on vs things that aren't. Such tradeoff is subjective to the criticality of said system and how often the system might be changed / updated.

## Broken Tests

Broken tests are **tech debts**. Either prioritize fixing them or delete them if they are no longer relavant. Keeping them around gives false impression on the state of the test coverage while potentially adds unnecessary operational cost in running these tests. Same applies to flaky tests. In fact, I'd go a step further by saying that flaky tests are worse than broken tests because at least broken tests are deterministic (which is one important characteristic of a quality test).

## Wrap up

When you have working quality automated tests, you can push new changes fearlessly knowing that it won't cause regressions on features protected by these tests. This allows you to move faster both in terms of thinking about and testing all the possible regressions your change might cause, while also saving time on root causing a regression (if / when it does happen).
