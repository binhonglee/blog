---
title: The Peak Bias
subtitle: "Why Consistency Gets No Respect"
date: 2026-01-25 00:00:00 -0800 GMT
tags: [The Opinionated Engineer, Behavioral]
ss: "preview/peak_bias.jpg"
aliases:
  - /peak_bias/
---

One of the most interesting examples is to look at any average person debating whether Jordan or LeBron is the GOAT. They will inevitably bring up Jordan's 6-0 finals record as if Jordan only played in the NBA for 6 years. LeBron's 4-8 record on the other hand is somehow worse than if he never made it to the finals at all (which frankly doesn't make sense lol). This isn't really about basketball though. It's about a fundamental bias in how humans evaluate performance where we disproportionately value peak moments over sustained consistency, even when the consistency represents equal or greater total value.

_This is part of a series [(The Opinionated Engineer)](/blog/the-opinionated-engineer/) where I share my strong opinions on engineering practices._

{{< newsletter >}}

## One big project > many small projects

Similar to "peaks", humans have a tendency to veer towards one "big, complex" project over a bunch of smaller projects even if they require the same level of effort and expertise. We've all seen this happened one way or another. The person who ships one new flashy dev tool get rated as "exceed expectations" while the person who quietly shipped ten incremental performance improvements (that collectively saved more engineering time) gets a "meets all expectations". A single monolithic launch gets remembered. Ten incremental wins that shipped over 6 months are just blurred together in everyone's memory by the time performance review season comes around.

## The invisible work trap

This creates some really annoying incentives tbh. Nobody remembers the person who built great monitoring that prevented incidents (the incidents that never was) but everyone remembers the hero who stayed up fixing the 3am production fire (even if better testing infra could've prevented it in the first place, [but we don't talk about that lol](/blog/2025-08-01-firefighting-heroes/)). The reality is that sustained consistency is harder than occasional peaks. The person who shipped features with good code quality that never breaks in production through consistent diligence gets less credit than the person who firefights a handful of dramatic incidents (even if it might be due to their own lack of care towards shipping). Both require effort, but only one gets remembered as a "peak" moment during performance discussions.

## Storytelling as the workaround

You'll hear this advice everywhere from performance review packages to design docs to business proposals. Literally any "presentation" type stuff will tell you that storytelling matters. Storytelling is basically the skill of bundling up all your smaller projects into one big narrative to combat this bias. Instead of "shipped 10 performance improvements" you write "led reliability initiative that reduced P95 latency by 40% through systematic optimization." Same work, just packaged differently.

The uncomfortable truth is that impact without visibility might as well not exist come promo time. The people who are good at this don't just list what they shipped but create a whole story arc like "Problem → Investigation → Solution → Impact → Future Work." They connect the dots to show how their smaller projects collectively solved something bigger. This used to feel really inauthentic to me (and honestly sometimes it still does) but it's a valuable skill to learn because making sure people understand what you did is part of the job. In my opinion, this is also the defining character between a _good_ manager and a _great_ manager.

## Hot take

Here's the controversial part. I don't actually think this bias is completely irrational. Peak performance (when it's genuine) does signal important stuff. An engineer who can architect and ship a complex multi-team migration is demonstrating coordination and ambiguity navigation skills that not everyone has. These are real senior+ skills that are hard to show through smaller projects. The problem isn't that we value peaks but that we _overvalue_ them relative to consistency. We're also terrible at telling the difference between genuine peak performance and just being in the right place at the right time (or being good at taking credit for other people's work lol). Sometimes the person grinding out consistent wins is actually showing way more skill, just in a less visible way.

## What to actually do about it

If you're someone who tends toward consistent, incremental work (which is totally valid and valuable btw), here's the reality. You need to adapt your strategy if you want recognition. The most effective move? Take on longer running projects. If you know you can consistently ship quality work, use that as a strength by committing to bigger initiatives that span months instead of weeks. Fortunately, a big long-running project basically counts as a "peak" in terms of how it gets perceived and remembered.

The key is you're not actually changing your working style since you're still executing with the same consistency. You're just changing scope. Instead of 10 small improvements over 6 months, you're doing a 6-month initiative that involves 10 components. Same work, same consistency, different packaging. Other stuff that helps include actively communicate about your progress (shameless plug for [my previous piece on this](/blog/2025-05-16-art-of-posting/)), bundling your incremental work into themes in perf reviews, and actually quantifying cumulative impact across related projects. You're not trying to trick people into thinking your work is more valuable than it is but making sure they understand the actual value of work that's easy to overlook (which sometimes means restructuring how you take on work in the first place).

## But I kinda just do whatever

Some people are "utility players" who pick up whatever project with the highest priority at the time. Usually there isn't too much "narrative" surrounding "why do x" aside from some vague definition of it being the most urgent work at the time. In this case, you'd rely heavily on documentations and endorsements by the more senior / authoritative voices in the company to make your case. This sometimes also mean that having a _great_ manager is more important (than otherwise) when it comes to building your case for performance review. The _safe_ way is to pick a "theme" and be more intentional about the projects you commit to. Going without is viable but harder, since you rely heavily on others to build your narrative for you.

## Wrap up

The peak bias is real and it affects everything from sports debates to software engineering careers. We remember the dramatic moments and forget sustained excellence where the person who shipped one big project gets promoted over the person who shipped ten valuable smaller ones. You can't fight human psychology but you can work with it. If you're the consistent incremental type, consider taking on longer projects that let you leverage that consistency at scale.