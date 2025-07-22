---
title: Early takes on vibe-coding
subtitle: "Is it a mid-level engineer yet?"
date: 2025-07-03 00:00:00 -0800 GMT
tags: [The Opinionated Engineer, Internal Tools]
ss: preview/early_vibe_coding.jpg
aliases:
  - /early_vibe_coding/
---

I keep hearing about vibe-coding and I've always written the majority of code myself. While at Meta, I got a chance to try out CodeCompose. It worked really well as an autocomplete but when it tried to do anything more than 5 lines at a time, it would - on many occasions - commit bugs that aren't immediately obvious at first sight. Generally, I've caught them by looking at the generated code and wondering "huh this isn't how I'd do this, why?". That said, it definitely helped me code and ship faster especially on mundane tasks. Vibe-coding though, seems like taking it to a whole new level (using even less supervision and care on the code being committed).

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

{{< newsletter >}}

## Perfect for small, isolated problems

I started my attempt by making Claude code out a GitHub Action workflow file. I have a submodule setup (where a repo is shared and imported across multiple other repos) and wanted to have an automated way to tell how its changes will affect code on other repos while also creating PRs to keep them updated. Seems like a perfectly fine isolated problem to try this out on. I did run out of tokens a few times (being on a free plan) so I had to get creative but it largely worked. I'd say it behaved like a normal engineer writing a first version (which isn't perfect) but can understand and work its way through debugging and resolving the issue slowly when given clear information on what went wrong.

## Not for complex changes in an _intern-size_ project

_Note: Using the phrase "intern-size" here because back then, there was a weird rumor that interns were expected to ship 10k LoC as part of their internship to get return offers in FAANG lol. I don't think it was ever true but definitely a standard people worked towards._

Now that I've got it working on an isolated problem, I wanted to see how it might handle a complex change in a pre-existing project. I have an Android app codebase (for [GlobeTrotte](https://globetrotte.com)) with around 8k+ LoC so I decided to try it on there (using SWE-1 from Windsurf). This is the instruction I provided (admittedly a complex one):

> `add new navhost to edittripactivity and make each of edit day and edit place a separate screen instead (so it push-and-pop for each small edit)`

_PS: `edittripactivity` is a file name (technically `EditTripAcitivity.kt` but I think the LLM understood it), `navhost` is a concept of [how screen navigation works in Jetpack Compose](https://developer.android.com/develop/ui/compose/navigation#create-navhost)._

The LLM took 20+ minutes before running out of time which required me to make a `continue` call not just once but twice before telling me it was done. _It's all chaos from here on out._ It tells me that there are a bunch of errors so it tries to write more code (?) leading to more errors, so more code, then more errors etc. At some point, I mentioned that there were 88 errors and it figured to try compiling and reading the compiler error (instead of looking for them itself) but that barely cut down the number of errors. **I just kept telling it that there were more errors and it just kept trying to code itself out of the mess by adding more code and thus more errors.** I eventually gave up and ran `git checkout .` to clean everything up.

## Losing track of signatures

At some point, it started making up stuff that either existed with a different name, or something that it thought should exist but didn't (or it forgot to add the implementation for it, I can't tell). The first example is that it keeps calling `PlaceItem()` even though there's no object with that name (and all the `please fix error` prompts never saw it touching them). There is however, an object called `Place()` which I'm assuming is what it was referring to. The second example is where it called `updateDay(delete = true)` despite the fact that `updateDay()` has a bunch of other required params while it also doesn't have `delete` as a param. I can only assume that it just inferred the functionality of the function without actually understanding if it worked as intended.

## Ask clarifying questions

The prompt I provided is a bit vague to be honest. It's asking to make a UX change without actually providing any design example but rather just describing it with words as if the other person would easily understand it. The LLM went to work immediately with that prompt without asking for more clarifying questions like how the screens get triggered, how the layout should work, how the UI should look etc. I think if LLMs can learn to ask clarifying questions, it can be invaluable for situations like this where the ask might be a little too vague to work off of.

## Phenomenal auto-complete machine

I'd be remissed if I didn't mention the auto-complete capabilities of AI coding assistants. In short, they are consistently phenomenal especially when it comes to boilerplate code needing minor tweaks here and there. The AI would make the necessary tweaks automatically making it a breeze when going through the more mind-numbing part of the code base. This is a consistent experience both when I was at Meta (using CodeCompose) and now using Windsurf for my personal project.

## Is it a mid-level engineer yet?

Short answer, no. Long answer, it depends. In terms of raw coding ability in an isolated environment, I think it's meeting the mid-level engineer mark just fine (maybe even better due to its breadth generally uncommon among "humans" lol) but it's the _everything else_ part that's an issue. For starters, I expect a mid-level engineer to ask for help instead of mindlessly trying to commit code (or send out PRs) over and over again that isn't compiling. I also don't (usually) have to nudge them that their code isn't compiling or failing tests. They can see it themselves and would go work on debugging and fixing them proactively. This is on top of all the issues mentioned above when working in a _not-even-that-large_ of a codebase.

For now though, it seems like it's still not good enough to take over even just the coding part of my job so I guess I'm going back to implementing the new `navhost` for my Android app by myself.