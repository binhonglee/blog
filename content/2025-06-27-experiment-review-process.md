---
title: Experiment Review Process
subtitle: "Holding the quality bar for user experience"
date: 2025-06-27 00:00:00 -0800 GMT
tags: [The Opinionated Engineer, Growth]
ss: preview/experiment_review.jpg
aliases:
  - /experiment_review/
---

Mature growth teams would organize a centralized experiment review meeting as a way to share learnings to a wider audience, consult for feedback / next step recommendations, while also holding engineers accountable for the changes they are attempting to ship. The review sessions should be open to anyone to sign up (presenting their experiments) or to participate in general. However, key decision makers (like senior growth engineers, product managers, designers, data scientists) should be required to attend so decisions to ship / not ship / iterate will be made with everyone's concerns addressed.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

{{< newsletter >}}

## Understanding the metric shifts

When presenting (and reviewing) an experiment, not only do we look at metric shifts but we need to also make sense of them. Understanding them helps inform making better future changes and iterations while ensuring that this change is working as intended instead of some potential regressions on metric blind spots. This usually means that metric analysis for experiments would go beyond just top-line goal / guardrail metrics but also onto regular impression / click loggings to make sure any underlying funnel shifts make sense.

As an example, when you add stories to the top of your app, you'd see an increase in stories traffic. Make sure to also verify that users are actually clicking on the newly added stories component. At the same time, you might be sacrificing screen time on other parts of your app (especially the feature that used to occupy that screen real estate) so you should also see some drop on that end.

## Atomic changes

This is a bit of an extension from the previous point. It's not uncommon for someone inexperienced to test an overly complex change at one go instead of breaking it into a list of smaller incremental changes. In order to understand which change moved which metric, you need to properly isolate your changes into individual groups (or mix-and-match them with multiple test group setups). This allows you to not only understand what works and what doesn't, but also how each of these different changes might have affected one another. If someone brings in an experiment that's overly complex, you should feel comfortable asking "why can't it be smaller (or be run with more test groups)?".

## Conflict of interest

Last week in [Growth Engineer](/blog/2025-06-20-growth-engineer/) we talked a little bit about how sometimes engineers would fall into the trap of looking solely at metrics, over-optimizing them. This is generally good for the engineers themselves (being able to boast larger numbers on their launch) but bad for the business (since they are unlikely to be sustainable long term and will probably regress over time). The role of an experiment review process is to ensure that underlying risks or concerns like this get called out and taken into consideration for ship decisions. In the next few paragraphs, we will explore a few examples of such conflict of interest.

## p hacking

Usually intentional but sometimes oblivious to the underlying logic, an engineer might participate in p hacking that makes the experiment look better than it really is. One of the most obvious examples would be when someone picks a weirdly specific date range to pull their metrics instead of the more logical (like 1 / 2 week average) standard range. While most experimentation tools would do the statistical analysis and show you results with 95% / 99% / 99.9% confidence levels, there could still be variance (especially on the absolute value derived from its average). On a large change (or accumulation of a lot of smaller changes), this can amount to a rather significant amount.

## Long term holdout

On some occasions, the effect of a change (especially negative effects) can only be observed over a longer period of time thus making it important to set up a long-term holdout to better understand the longer-term impact of the change. This generally requires some level of product sense and experience to notice thus we would heavily rely on experienced members in the org to call this out. One common example would be "user intent" (which was previously discussed more in-depth [here](/blog/2025-06-20-growth-engineer/#user-intent)) where long-term behavior of users will better reflect a user's intent as they adopt new habits towards the product change. The other important part of this (often overlooked) process is to follow up on how the long-term holdout performed. It's not uncommon for teams to launch with a holdout then completely forget about the existence of a holdout (especially if the team or product space ended up going through reorgs) leading to a group of poor users still stuck with the sub-optimal experience.

## Wrap up

A strong experiment review process acts as both a learning forum and a quality gate, ensuring experiments are properly analyzed and potential conflicts of interest are surfaced before they impact users. The goal isn't to slow down shipping, but to ship smarter by using the collective experience in the room to catch blind spots that individuals might miss.