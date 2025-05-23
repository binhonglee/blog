---
title: No Blame SEV (Incident) Culture
subtitle: "Less finger-pointing, more preventions"
date: 2025-05-30 00:00:00 -0800 GMT
tags: 
ss: preview/no_blame_sev_culture.jpg
aliases:
  - /no_blame_sev_culture/
build:
  list: never
  publishResources: true
  render: always
---

Every time there's a major outage at Meta, the first question I get from friends and family is usually _"did they fire the person who caused it?"_ which is where I have to explain this concept of **No Blame SEV Culture**. Especially for an outage so big that a significant number of users are affected, the _individual_ causing it likely does not have ill intent and there are likely multiple different processes and systems that failed along the way to get us here in the first place.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

## Process over People

When something goes wrong (especially something _really catastrophic_), it's usually a combination of both process and people problems. The difference here is that process is more deterministic compared to people. People have off-days, get tired, make mistakes etc. so it's important to have a process (or automated systems) in place to prevent that. This can mean anything from adding more test coverage, lint rules against bad code patterns, and / or more alerts. It is however important to note that they need to **maintain a certain level of quality bar**. As mentioned in [the previous article](/blog/2025-05-04-push-fearlessly-with-automated-testing/#broken-tests), flaky / broken tests are tech debt, same goes for noisy lint rules and alerts. Too many noisy lint rules and alerts would lead to engineers disregarding them or adopting a "wait-and-see" mentality which is not ideal in preventing future outages.

![](/blog/img/sev_review_trifecta.jpeg)

## Expensive Lesson

One of the more interesting quotes I've read repeatedly (both within and outside of Meta) about people who caused outages is that they just learned an expensive lesson through that specific outage. Firing them (or letting them go) would mean that your company just paid that expensive price of such a lesson for an employee without actually benefiting from it. This employee will then bring this lesson with them to their next employer who would then benefit from such experience.

## Fear

One of the more significant downsides of _blame_, is that you now instill fear in making any sort of production changes (even calculated ones). Instead, it's important to keep in mind that as your product / infra grows, so should your process. Having strong fear in taking any responsibility for even attempting to improve or make fundamental changes breeds complacency. This can be fine in certain organizations and products (like government software, health tech etc.) where there's almost no tolerance for any sort of outages. That said, this is where you should have good chaos engineering and fail-safe practices to ensure the resiliency of your system.

## No Blame ≠ No Responsibility

This is a bit of an exception or outlier effect (and likely the most controversial part of this whole piece). Usually when you cause a really major outage (or multiple for that matter), it's really not your fault (or shouldn't be). But sometimes, smaller outages are understandably less "well protected" because we expect people to still _care_ about the things they work on. If you **continuously** cause outages due to **recklessness** ("lack of _care_") especially within a short period of time, you should still be held accountable for it. It's especially common when someone chases the topline metrics movement against a tight timeline (end of a performance review cycle). This does not mean that people should be finger-pointing during the incident review, as before, that should be used to focus on what could've been better instead. However, it should be brought up separately as part of the performance conversation. It's important to note that this is a scenario where a _quantitative change leads to a qualitative change_ since an increase in quantity (of incidents) leads to a change in narrative thus should not be used to penalize those who've only caused one (or maybe two) incidents in a given period of time.

Aside from that, if there isn't any runbook or recovery plan prepared ahead of time (especially for predictable issues - _*subjective*_), it demonstrates a lack of good planning and foresight into the feature. This is - frankly - a lack of competence and the project owner should take responsibility for the rather _incomplete_ launch. However, the reality is that many individuals would launch buggy projects, claim credit for all the good it brings, while oncalls (spread across the team) pay for the lack of implementation quality. This is especially true when they immediately switch teams after project launches and no longer have to maintain or deal with the aftermath of their uninspiring launch.

## Wrap up

No blame culture means that you aren't fully responsible just because you accidentally touched the house of cards causing it to collapse. Instead, we need better protection around it - like building a fence around it, using LEGO blocks instead of cards, etc - to make sure it doesn't break down easily again after someone accidentally touches it, or just prevent people from accidentally touching it altogether. This means we hold those who are responsible for ensuring the protection accountable instead of those who inevitably discovered the problem. It's like how we don't blame white hat hackers for discovering an exploit; we pay them bounties as a way to thank them for discovering them. We should thank those who found holes in our system's reliability instead of penalizing them for finding it.