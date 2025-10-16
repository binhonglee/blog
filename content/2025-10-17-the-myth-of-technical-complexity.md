---
title: The Myth of Technical Complexity
subtitle: "Why being skilled makes you look unskilled"
date: 2025-10-17 00:00:00 -0800 GMT
tags: [The Opinionated Engineer]
ss: "preview/myth_of_tech_complexity.jpg"
aliases:
  - /myth_of_tech_complexity/
---

I've seen multiple different people fail their promotions due to "lack of technical complexity" in their work. While some of this rings true, more often than not, the underlying technical complexity of their work is not properly understood because - _ironically_ - they cut through it smoothly as strong technical engineers. Unless you were doing code / design reviews for them, you wouldn't notice it. On the flip side, I've had projects listed as my capstone "technical complexity" project of the year that _imo_ wasn't very complex compared to some other stuff I needed to work on. Why is this happening and how do I make sure my work is properly valued?

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

{{< newsletter >}}

## The Problem

During your performance or promotion review, the audience generally includes your manager, their peers, org leaders, and _sometimes_ a couple of very senior ICs in your org. Realistically, none of them have seen your code (though some might have seen your project design docs). So how could they _know_ if something is technically complex? **They don't.** Instead, they mostly rely on their intuition (based on what they know of the project, or just the project name alone), or they hinge it on other calibrated agreements (more on this later). If your project name is "Logging for X," it's very likely that it will be challenged for its technical complexity level for any senior engineer because "how hard could logging be?" (Turns out, not only can they be hard, but they could also be wrongly designed with long-term negative side effects, especially if your leaders can't get out of the sunk-cost fallacy. But that's a story for another day.)

## Just a one-line fix

Sometimes a simple bug is masked by convoluted layers of abstractions, making it extremely hard to discover. We've all had bugs like this where everyone was at a loss as to why it was broken, but it turned out to be a simple one-liner fix. If you look at the fix diff alone, it would look straightforward and you'd wonder why no one noticed this earlier. These are technically complex to debug from a given stack trace (or sometimes just screenshots) to the actual root cause. In fact, this is the definition of work for a staff engineer archetype - _fixer_. Yet, this is also an example of technically complex work that's commonly overlooked due to how deceptively easy it looks.

## Upfront alignment

The easiest way to prevent later disagreement on the complexity nature of your work would be to align it upfront. Talk to your TL / EM to make sure they agree with your assessment of how complex the work really is. (Excluding PMs here because they generally don't have strong opinions / say on the technical complexity of your work.) Even if you end up disagreeing, you'd know exactly what you're getting yourself into ahead of the project and decide accordingly (depending on options available to you). For most junior engineers and some early senior engineers, this is likely something that happened even prior to you knowing about the project. The senior engineer who assigned you the project likely aligned this upfront to make sure the project fits your growth path (meeting expectations / promo) your manager has in mind for you.

## Similar past attempts

Another way you could demonstrate the technical complexity of a project is by citing previous failures at attempting this project. Generally, this requires a project to have been attempted previously (even if there are slight differences in details). It's important to keep in mind that you should always try to do things _only you can do_ (maybe I'll write more about it in the future) and delegate everything else. Someone else failing previously is essentially a way to show that 'you' were the key ingredient to making the project a success.

If there's a similar project that was previously executed successfully, that's a slightly different story. It can still be complex, but the complexity level will likely be reduced by at least 1 level (if not more) depending on how similar they are. The idea is that you already have a good reference that helped scope out a lot of the _unknown unknowns_, making this simpler.

## Borrowing an authority

Similar to what I previously wrote in [The Art of Posting](/blog/2025-05-16-art-of-posting/#pre-read-from-subject-matter-experts) and what Mekka wrote [here about The Difficulty Anchor](https://mekka-tech.com/posts/2018-08-09-the-difficulty-anchor/), you can also borrow the authority of someone else more senior in your team or org to endorse your evaluation of the project. This is especially important in areas where you're not seen as an expert. While it's ideal to get this on the record early on (as mentioned in the [earlier section](#upfront-alignment)), this can still be done post-hoc as well. This is especially important when you run into unexpected complexity as you work through the project. Having someone credible validate that "yeah, this turned out to be way messier than we thought" carries much more weight than you making that case yourself.

## Wrap up

The cruel irony of engineering is that doing your job well often makes it invisible. When you smoothly navigate complex technical challenges, stakeholders see the outcome, not the expertise required to get there. Don't let your competence work against you. The technical complexity of your work needs to be communicated, not just demonstrated. Whether it's aligning expectations upfront, citing similar past failures, or borrowing authority from senior engineers, make sure the people evaluating you understand what they're really looking at.