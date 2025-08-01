---
title: Firefighting Heroes
subtitle: "Symptoms of an unhealthy reliability system"
date: 2025-08-01 00:00:00 -0800 GMT
tags: [The Opinionated Engineer, Incident Management]
ss: preview/firefighting_heroes.jpg
aliases:
  - /firefighting_heroes/
---

We love celebrating heroes in general. So when a hero shows up to save the day, it's only natural that we make sure to recognize their contribution. While it might feel counterintuitive, we should strive to not need heroes entirely instead of hoping that next time when tragedy strikes, a hero will turn up once again. This is not to diminish the value of heroes. They still play a very important role in firefighting and are doing the right thing in an urgent situation. However, _in a perfect world_, they shouldn't be necessary at all and we should at least aspire to work towards building a system with that level of reliability.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

{{< newsletter >}}

## Bian Que and his brothers

If you've never heard of the story about _Bian Que and his brothers_, here's a [Meta AI summary of it](https://www.meta.ai/@binhonglee/prompt/iS2XuvsxNDq) with all the relevant details:

{{< long_quote >}}
Bian Que was a renowned Chinese physician who lived during the Warring States period (475-221 BCE). According to legend, Bian Que and his two older brothers were all skilled in medicine.

The story goes that the eldest brother treated illnesses before they became apparent, the second brother treated illnesses when they were still subtle, and Bian Que treated illnesses when they were severe and obvious.

When people saw Bian Que's dramatic cures, they credited him with great skill. However, Bian Que said that his brothers were actually more skilled because they treated problems before they became serious.

This story highlights the importance of preventive medicine and early intervention in Chinese medical philosophy.
{{< /long_quote >}}

I mention this because one time when I was complaining about all the fires happening in our org and how I keep getting looped into them to help put them out, my then tech lead cited this story to me (which is a little offensive 😡 but she's not wrong lol). I think in general, this is an accurate depiction of the **misplaced prioritization and recognition** where we consistently reward "heroes" solving issues rather than those who worked to prevent fires from happening to begin with simply due to visibility and measurability.

## Automate whenever possible

I remember once reading a Site Reliability Engineer write (verbatim), _"my job is to automate myself out of my own job"_ which I thought was an interesting way to look at things but also an obvious starting point. To do away with the reliance on firefighting heroes, automate the things they do whenever possible. As an example, when something breaks and you find an automated test for that specific breakage, have a system that automatically runs bisect against said test to find the blame commit causing the breakage. Taking it a step further, the system can run all these automated tests every time before release and if anything is broken, bisect to find the blame commit and revert it, then run everything again until there's a good stable version that's ready for release.

## Prevention > Cure

As the idiom says, _"prevention is better than cure"_. In a previous piece about [Process over People](https://binhong.me/blog/2025-05-30-no-blame-sev-culture/#process-over-people), I've talked about the focus on building process as a preventative measure. This is a similar point where we should ideally focus more on **preventing** outages from even happening instead of just putting them out **after** they're already on fire. The hard part however is - yet again - that the visibility of good prevention work is never as prominent as good firefighting work. There is a two-fold solution to this (where ideally both need to happen). Firstly, if you (or you know someone) are doing important prevention work, ensure people are aware of their work. Secondly, leadership needs to prominently acknowledge the value of such work and reflect it as such in _whichever-way-they-usually-do-recognition_ and in performance reviews.

## Accountability on reliability

One of the common pitfalls here is that, once something is shipped, the responsibility to keep it running falls on the team (whoever is on-call at the time of incident) instead of the individual who shipped an _incomplete_ product. This is something I've previously touched on [here](https://binhong.me/blog/2025-05-30-no-blame-sev-culture/#no-blame--no-responsibility). If someone is taking credit for the successful launch (and all its underlying **impact**), they should also be held accountable if the launch causes reliability issues (be it during or shortly after the launch). As to how _accountability_ looks, it can range anywhere from taking ownership of resolving the issue long term, to being penalized in their performance review cycle for an incomplete launch. There's quite a bit of nuance here depending on factors like the scale of outages, any visible warning signs, how preventable the issue was, etc.

## Wrap up

This is as much (if not more) of a culture problem as it is a technical problem. Building reliable systems isn't just about writing better code or implementing more monitoring. It requires fundamentally shifting how we think about and reward engineering work. We need to move away from the hero worship that celebrates last-minute saves and instead build cultures that value the unglamorous work of prevention, automation, and long-term system health. Heroes will always be needed in truly exceptional circumstances, but if your organization consistently relies on them to keep the lights on, it's a sign that your systems, processes, and culture need serious attention. The goal isn't to eliminate heroes entirely but to build systems so robust that heroic interventions become rare exceptions rather than regular occurrences.