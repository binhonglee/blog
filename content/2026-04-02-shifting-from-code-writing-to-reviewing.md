---
title: Shifting from Code Writing to Reviewing
subtitle: "Leaning onto AI coding workflow"
date: 2026-04-02 00:00:00 -0800 GMT
tags: [vibe-coding]
ss: preview/shift_from_write_to_review.jpg
aliases:
  - /shift_from_write_to_review/
---

When I built GlobeTrotte last year, vibe-coding had just begun gaining traction but I was the "weird guy" who coded everything by hand. I spent a little over 4 weeks building the backend service (Go), iOS app (SwiftUI), Android app (Jetpack Compose), and web (TanStack) all by myself. I like to think that's pretty fast for an app of that level of complexity. The tradeoff here however, was that I have almost no time to "handle the business side".

I wrote about my early skepticism on AI coding [back in July last year](/blog/2025-07-03-early-takes-on-vibe-coding/). TLDR; I tried getting Windsurf's SWE-1 to refactor navigation on the Android app but ended up watching it spiral into compiler errors after compiler errors as it tried to "code its way out" by piling on even more code. At the time, I concluded that vibe-coding wasn't ready but one thing I missed was how much the model mattered.

{{< newsletter >}}

## The inflection point

Building [slogx](https://binhonglee.github.io/slogx) and [Git Navigator](https://gitnav.xyz) was almost an entirely opposite experience. slogx was started because I was curious to explore the capabilities of Google's AI Studio. It definitely impressed me in terms of building good looking UI but its lack of support for *anything else* was a bottleneck that quickly prompted me to move away (especially to build the SDKs). Git Navigator was started because I wanted to see how well Google's Antigravity and Claude Sonnet perform. For pretty much an entire month, all my vibe-coding prompts were basically "the graph rendered wrongly in this / that case". (I probably should've intervened earlier but I was lazy and curious if it can eventually figure it out.) Neither could, but Claude Opus (4.5) managed to build an actual working version. I redid the algo anyway eventually with a much simpler / straightforward idea (just DFS lol), but the fact that it worked when others didn't, makes this an important inflection point to me.

## Dev Velocity

From here on out, most of the code for both slogx and Git Navigator was written by an LLM. I do review every single line of them but that doesn't always say much especially for areas which I'm not already _an expert_ of. It definitely _feels_ like it'd be faster than if I were to build it myself but I haven't done actual testing to know for sure. My suspicion is that it's faster in the first few days, maybe the first week. One month in, I can't tell if I'm meaningfully ahead of where I'd be otherwise. The LoC isn't dramatically higher than GlobeTrotte, but because I didn't write this code, I'm significantly less familiar with my own codebase. That said, I can definitely see the development cycle being _significantly faster_ if I don't actually do line-by-line code review and instead stick to just vibe-reviewing(?) it whenever I see something kinda sus.

## Context switching tax

Another important shift I noticed is the nature of work itself. Before, you'd be "wired in" while designing then coding where you would do deep focus work while holding the entire problem in your head. Now though, the prompting-and-waiting breaks the _chunk_ where you either scroll social media while _waiting_ or review and prompt a separate session in the meantime. However, this means that you're constantly context switching between 2 or more project / features and you're less of a _maker_ but more of a _manager_ making sure your "subordinates" complete their deliverables.

## Visualizing the product for LLM 

One of the trickier things that took me too long to figure out was visualization. Like how humans need to look at the end result (print debugging, hot reload etc.) to easily self-correct and understand what went wrong, LLMs need something like this too. If you're building a webapp, some providers have a Chrome extension or a browser built-in for this purpose. Since I'm building a VSCode extension, I actually didn't find much tooling around it (ironically lol). When I first made all the different coding agents build the graphing UI for Git Navigator, I spent a lot of time screenshotting and explaining what's right / wrong with it.

Eventually, I figured out to make it write a script that it can run against a given folder / repo to see how the graph is sorted. Since the rendering code would order the commits (in TypeScript objects) before passing it to be rendered as UI, the script essentially just dumps the order output for easy viewing by the LLM. This cuts me out from needing to repeatedly screenshot it as LLMs can run the script, then read the output and identify if things are ordered correctly or if there's anything that needs fixing. I think this is probably one of my biggest lessons here, this is like an observability tool except your target audience are LLMs instead of human developers.

## Catching shortcuts

There's been a few times where I caught the model taking shortcuts that technically worked but were obviously wrong. One time, I asked for a complex git operation (some rebase gymnastic) and Opus 4.5 just used the TypeScript backend to create a temporary bash script and run that, instead of running it programmatically through the TypeScript backend. It worked fine locally on my machine (and any Unix based system I think) but it would break VS Code Remote scenarios where files aren't local, or on Windows because path separators are wrong. It's the kind of solution that passes every test you thought to write yet falls apart the moment a real user touches it. This is where review actually matters since LLMs _(largely)_ optimize for "does it work right now" rather than "is this the right solution". If you're not catching these, you're accumulating tech debt at LLM speed.

## Catching product gaps

There are also times where the feature exists and works, but the placement or interaction is off in a "product sense" kinda way. One example I had was asking Codex to implement line and hunk staging for Git Navigator. We had some good planning discussions about the tri-state checkboxes, "include/exclude" wording instead of git jargon, inline diff expansion but, it shipped the entire picker in the side panel. This makes for a weird _UX ergonomics_ because users are looking at the uncommitted changes block when they're deciding what to commit. So burying the granular staging controls in a separate panel means most people likely wouldn't even notice that it exists. I had to ask for it to be moved into the uncommitted changes block itself. Here's another twist, when it did, the LLM's first instinct was to build a new diff renderer from scratch instead of reusing the existing one used for conflict resolution. I think this is probably the _bull case_ for Product Managers being the beneficiaries of vibe-coding considering that this is likely their strong suit.

## Delete everything and try again

Fortunately, I haven't had to rely on this strategy too much but it does happen. I think when building one of the stack features (on Git Navigator), Codex completely misunderstood what I meant and kinda just went off the rails despite being given clear specs to follow. I discarded all the changes (thanks git), started another new session, gave it the same spec, then just let it _try again_. Funnily enough, it worked perfectly on the second run, only needed some minor tweaks before the feature is ready to be committed. I haven't had to resort to this too much (and I don't keep good enough git hygiene to always rely on it 🫣) but it's definitely something to keep in mind if things go weirdly wrong.

## Wrap up

I don't think I'm going back to handwriting all the code (for now). Not because I'm convinced it's faster, but because it _feels_ faster. I think it also comes with a level of detachment that makes me feel more comfortable for being ruthless with code I didn't write while nitpicking for the ideal product experience that I want. It makes it easier to throw things away, cherry-pick only what's good, and not get precious about any of it. Whether that's a healthier relationship with code or just a different kind of laziness, you tell me 🫠.