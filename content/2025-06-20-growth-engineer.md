---
title: Growth Engineer
subtitle: "Taking fine-tuning to the next level"
date: 2025-06-20 00:00:00 -0800 GMT
tags: [The Opinionated Engineer, Growth]
ss: "preview/growth_engineer.jpg"
aliases:
  - /growth_engineer/
  - /2025-06-13-growth-engineer/
---

While I've shipped a lot of growth wins (literally the first line on my resume), I'm actually very far from a prototypical growth engineer. That said, in this piece, I want to explore a bit more into what it's like being a growth engineer and what makes you good at being one. Growth engineers are generally 1 -> 100 experts instead of 0 -> 1. They fine-tune every little detail by running a lot of experiments with marginal changes to understand the user problem and drive growth impact (_line goes up_).

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

{{< newsletter >}}

## A/B Test Everything

When I say _everything_, I mean **everything**. Every button change, content change, margin change, slap an experiment on it. You need to be numbers obsessed and understand how anything moves the topline metric (the metric you / your team cares the most about). In that same sense, you might want to run experiments in chunks of small changes instead of a big chunk to better understand how each small change affects the user behavior. This would later help you in better understanding what is a good growth lever vs what isn't. Alternatively (depending on the type of changes), you can also have multiple variants with different mixes to achieve something similar.

_For more on A/B testing, check out [this other post I wrote a few weeks ago here](/blog/2025-06-06-a-b-testing/)._

## Understanding Scale

Scale decides necessity and value. If you have no scale, then there's nothing at the top of your funnel to begin with, which makes optimizing the rest of the funnel a common "preemptive optimization" behavior. Don't add complexity in places you don't need just because "it'll be useful in the future". You can build them in the future when needed, then actually measure the value of such a feature to validate your hypothesis (more on this later about A/B testing).

## Identifying opportunities

I wrote [a separate complementary piece on this a few weeks ago here](/blog/2025-06-13-product-growth-opportunities/) mainly because it ended up being so long that it probably deserves to be its own separate thing. This will be a core part of your job and in my opinion the biggest separation factor for a _"pure bred"_ (lol) growth engineer. Many engineers get stuck or move away from growth over time (especially around IC5 -> IC6 level) as they realize that they can no longer come up with new ideas and directions to continue growing the product sustainably.

## Cost analysis

On some occasions, there will be cost tradeoffs. Most commonly, by spending more money you can get more users (promotions, SMS cost, etc.) which makes it very important to define and understand how much spending is reasonable to earn how many users (cost per user). From there, you should only target to ship projects where it shows that the _cost per user_ is lower than the given guideline. Important to note that _cost_ here isn't always directly money, but also valuable real estate (prominent position in the app) or attention (push notification, email, messages) which some could also have a hard-cap (on top of the aforementioned _cost per user_).

![](/blog/img/growth.jpg)

## User intent

> You can't force someone to love you.

When someone (or a team) is metric chasing, the actual user (and their intent) can sometimes be neglected. It's always important to keep them in mind and practice some empathy to better understand what the user actually wants and build around that. Even if you were able to _trick_ users into something they do not intend to do, the long-term effect of it is likely unsustainable.

I had a personal counter-example here where I once fixed a 3rd party login issue (after login success, instead of redirecting users back to the 3rd party, we would send them to news feed) resulting in a 2M MAU loss from our test. However, it made sense only because we count every person who sees feed as MAU even when (in this case) they did not intend to do so. We ran a separate long-term experiment and saw that the actual loss was significantly lower than that (like maybe only 5% of the original number) because these people were really just trying to login to a 3rd party app (Spotify, Tinder etc.) instead of wanting to browse news feed.

## Failed tests

When you take a bet and it didn't materialize, your instinct might be to lay low and quietly do away with the project entirely. That would be a massive mistake. Instead, you should focus on what learnings or takeaways you have that can be shared with everyone else _especially for someone who might want to try this again in the future_. Generally, there are some key factors on failure root-cause. Make sure to clearly articulate them as you announce your experiment result for the purpose of having clear future reference. If / when someone were to try this again, they can look back at your attempt and see if the landscape had changed enough (based on your learnings) that it might warrant a new attempt.

## Long term impact

On one hand, everyone hated the idea of a long-term holdout (where a certain group of users will just have missing features for an extended period of time); on the other hand, you need a way to measure long-term impact of your changes. That said, due to lack of commonality in this practice, the accuracy of such measurement may not be as high as regular shorter-term tests.

> Long term impact is a myth - some E6+ Growth Engineer

The timing makes things worse. By the time you see results from a long-term experiment, you're usually in a different performance review cycle than when you built it. This makes it nearly impossible to properly reward thoughtful long-term thinking or penalize short-sighted decisions. What should be a performance measurement tool becomes just a way to look back and say 'oh, that's interesting' after it's too late to matter.

## Wrap up

Growth engineering is fundamentally about disciplined curiosity. You're constantly asking "what if we change this?" and then actually finding out through experiments rather than debates. It's the difference between having opinions about user behavior and having data about user behavior. Always remember that growth isn't _just_ about running A/B tests. It's important to also understand how / why users behave a certain way. The challenges are often less _technically complex_ but more about measurement accuracy, experiment design, and building user-friendly interfaces that even your grandma can easily understand.