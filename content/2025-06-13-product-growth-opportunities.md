---
title: Product Growth Opportunities
subtitle: "Finding ideas that brings you from 1 -> 100"
date: 2025-06-13 00:00:00 -0800 GMT
tags: []
ss: "preview/product_growth_opportunities.jpg"
aliases:
  - /product_growth_opportunities/
  - /2025-06-06-product-growth-opportunities/
build:
  list: never
  publishResources: true
  render: always
---

This is a shorter issue which plays as a complementary piece to Growth Engineer (which will be released later as part of "The Opinionated Engineer" series). It's never easy to come up with new ideas that help with growth, but identifying the _problem_ makes it easier. You'll notice that for the most part in this piece, I'll talk about _"where"_ the opportunities are instead of _"what"_ because that's usually very domain specific and highly depends on the type of problem you ended up needing to solve.

## Funnel analysis

The first thing you learn about identifying opportunities in growth is funnel analysis. Build a funnel logging to understand the user journey and go through it to see where you have the biggest drop. From there, you can take a deeper dive into the flow to understand **why** it is the way it is and see if it can be improved (or if there's any bugs to fix). Similarly, you can go through bug reports to find patterns on how users are being stuck on a specific part of your flow that might have contributed to the funnel losses.

## Product Experience

Alternatively, you can go straight to the bug reports to see if there are any obvious blocking issues. From there, you can test the fix with an experiment and eventually ship them. Even when it doesn't yield material impact, the changes are generally safe to ship (unless it caused unexpected regressions) since they are largely considered "bug fixes". Aside from that, there are other common issues like app performance, screen load time that have a diminishing return curve in user impact.

My favorite example here was when Uber was working on an iOS rewrite, while everyone was debating about how cellular download limit matters (or not), [a data scientist pulled together an experiment to show its material impact](https://x.com/StanTwinB/status/1336929240516710400) (full story [here](https://threadreaderapp.com/thread/1336890442768547845.html) - which is one of my favorite software war stories). Similarly, your team should design and run experiments to understand how certain product experiences can have material user impact (instead of just theorizing over them).

## "We've tried that before"

Often times, new people will join and suggest _old_ ideas as new. When that happens, it's easy to dismiss the idea by citing that something similar has been tried previously and didn't yield the expected result. The hard (and valuable) thing here, however, would be to understand why it failed previously and if anything has materially changed since then that might now allow this to be a viable idea to be re-attempted. You might still fail, but you will likely learn something new instead of learning the same old lesson again (which would be a waste of everyone's time and resources).

## Studying your competitors

Sometimes you might find a specific step that has problems (where you're losing a lot more conversion than anywhere else) but you can't figure out how to fix it. Studying how your competition does it can help you see if there's a better way to do that. This doesn't mean their solution would perfectly fit your problem, but it might be worth testing to see if that solution is similarly applicable for you. Alternatively, they might also be struggling with the same issue and what you're both doing is (at least for now) the best solution that anyone has thought of so far. I listed this a lot lower intentionally because it's generally not been _that_ valuable of an option compared to the other ways of identifying new opportunities above.

## Survivorship Bias

I wrote this section title with the "WWII plane with red dots" image in mind. In case you aren't familiar with it, [here's Claude describing it](https://claude.ai/share/7d06cfc9-95e7-4474-aae4-b56a6c6d3c99). In a similar sense, it can be very easy to fall into the trap of focusing on the demand of your existing users instead of building for new users you have yet to (and want to) acquire. Not to say that existing user feedback is unimportant (which I've literally just said the opposite previously), but rather that it's important to understand and distinguish which feedback helps keep your existing users happy while which feedback is preventing more users from adopting your product.

## Wrap up

Finding growth opportunities isn't about hunting for silver bullets, but more about understanding where your product is bleeding users and why. Don't let growth pursuits distract from building something people actually want. The best growth _"hack"_ is still making a good product that gets people what they want.