---
title: Code Review Culture
subtitle: "Review today or debug tomorrow"
date: 2025-05-23 00:00:00 -0800 GMT
tags: []
ss: "preview/code_review_culture.jpg"
aliases:
  - /code_review_culture/
build:
  list: never
  publishResources: true
  render: always
---

> Ask a programmer to review 10 lines of code, he'll find 10 issues. Ask him to do 500 lines and he'll say it looks good. - [@girayozil](https://x.com/girayozil/status/306836785739210752)

Code review is a really subjective thing where each team or even individual run things very differently. However, bad code review process can lead to bad code smells and unnecessary tech debts (just ask all the vibe coders out there 🫣). I will try my best to share my _rather opinionated_ takes while explaining the reasoning behind each of them.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

## Overly prescriptive formatters 

I'm highly supportive of having a preset of an overly prescriptive formatter. It doesn't matter if it's spaces vs tabs, 2 spaces vs 4 spaces, curly braces on same line or newline; as long as you have a formatter that keeps it consistent. This cuts down on all the unnecessary time reviewing and fixing code formatting while still easy to read and scan through. Make them as strict as possible, ideally 100% reproducible where every line of code only have one way it can be formatted. Again, it doesn't matter which style you pick but just pick something and stick with it, it's all about consistency here.

## Bias against newbie

There were some research that finds that when someone is new to the stack / team / industry, reviewers tends to be stricter and more nitpicky against their code changes relative to a long timer or a more senior engineer. Personally, I see this as a feature instead of a bug. A long timer has earned their reputation (assuming that's how they are a long timer and not just a bad engineer successfully avoiding accountability at every turn) and can be afforded to be treated with more leniency in their code. A _newbie_ however benefits from stricter code review feedback teaching them the style and tradeoffs the team values when it comes to coding patterns thus learning good practice along the way.

In an ideal world, teams would have detailed style guide on how everything is written and every new person will be given ample time to read and understand them as part of onboarding. But the reality is that, this rarely happens between the outdated style guides and the lack of proper onboarding process, code review frequently became the first time a new person has the opportunity to learn about a team's style guide (aside from linters and formatters). Let's make sure to get it right so they don't develop the wrong habit.

## Never blindly accept / accept to unblock

These are generally two separate scenarios but their result is generally the same. A change that is otherwise not meeting the code review bar is getting accepted and pushed to production. Blind accept generally reflects more of a bad team culture where people either don't take code review seriously or they don't feel comfortable pushing back in code review, both of which are bad. "Accept to unblock" generally comes with good intention but doing so essentially voided the role of a reviewer. The most common reason for it's use is due to reviewers not feeling comfortable about blocking a change but do not wish to take responsibility if that ended up being the bad commit causing an outage.

The **only** exception here would be when it's a _time sensitive_ change where "it can't be worse than it is now" **and** that the author is the _domain expert_ of the change. Most common example being a code change attempting to mitigate an ongoing production issue. (I'll write up an incident runbook at some point which will most likely include this.)

## Ask for further details

Sometimes the change request itself is lacking of details about the project or the reason behind such changes. Always ask for further details. In many occasions, it's just the author overlooking it or made an assumption that their reviewers share the same level of context the author has about the project. This is a bit of an extension from the previous section but if you are accepting without understanding _why_, you are in a sense "blindly accepting" the change (even if in this case, it's just _partially_ blind lol).

Similarly, if the change is too complex (or if it's bundling too many changes at once), ask for it to be broken down into atomic changes for better / easier review. Having smaller changes also allows for each change to be better reviewed by different domain experts instead of everyone crowding on the same change request. (I understand this is not always feasible so there will be exceptions but ideally, this is done whenever possible.)

## Fix **now** not later

In some occasions, you might run into response in your review that they will "fix it in a future change". (Generally, it's more common in scenarios where your work adopts the idea of ["stacked diffs"](https://graphite.dev/guides/stacked-diffs).) This is a bad pattern that should be avoided at large (unless _absolutely necessary_) mainly because this change now hinges on a separate future changes to be **correct**, and that the other change could be independently reverted - for any external reasons - without this change, thus causing this bad pattern to now persist in your codebase.

## Involve the Subject Matter Expert

If you're tagged / asked to review a change but you think someone else should take a look too, tag them. Most people are very open to review changes when approached directly (especially if they are the SME, the change likely affects them / their team directly too). I've lost count the amount of times where I wrote some code, ping the SME, then learnt that whatever I'm doing is an anti-pattern which "works fine now" but has no guarantee that it will continue working that way. Funnily, I've even had an experience where the framework team pulled me in to review changes because I was considered the SME for the use case another person was attempting. In general, it's better to have these discussions _before_ a change is committed instead of _after_ (especially if it ended up causing unexpected incidents later on).

## Prototyping

Code changes that are meant to be prototypes (especially RFCs) should clearly indicate that in its title (or some obvious tags / flags). There are 2 types of prototype code, one which is more of an exploration that is never meant to be shipped; while the other is a recommendation for adoption. In both scenario, there should be clear indication on which type of prototype code is this and what is the intention behind the prototype (what are you trying to achieve?). For the former - exploration that is never meant to be shipped, the change should also clearly mark that it should never be shipped (hidden / unpublished etc.) with little comments all over explaining each of the "mocks" or "overrides" done to achieve the exploration. For the latter - recommendation for adoption, the change should be reviewed as strictly as any regular changes (potentially stricter since it's likely coming from a _newbie_ per defined above).

## Long review time

This is more of a polarizing problem where your team either never heard of this problem, or it's something your team is struggling immensely with. In some teams, the lack of proper "incentive" for doing code review has greatly reduced team velocity in shipping due to time taken for a code change sitting around waiting for it to be reviewed. While I'd usually chuck this up as an "incentive" problem, I think this specifically is more of a "lead by example" cultural shift. Usually teams / orgs better at this have more _technically driven_ high level ICs who does a lot of (strict?) code reviews themselves, thus fostering a good code review culture throughout their team / org. So in that sense, "be the change you want to see".

## Wrap up

The culture of code review is something very intentional and will take effort to both cultivate and maintain. Value of good culture however, is usually not something directly measurable (will write a separate piece about intangibles in the future). Having bad culture generally isn't something immediately obvious nor is it something that can be turned around overnight, but rather something that's simmered over a long period of time until it boiling, by then it's _too late_ and people are leaving in droves.