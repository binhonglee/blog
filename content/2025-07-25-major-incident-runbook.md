---
title: Major Incident Runbook
subtitle: "Take a deep breath, you got this!"
date: 2025-07-25 00:00:00 -0800 GMT
tags: []
ss: "preview/major_incident_runbook.jpg"
aliases:
  - /major_incident_runbook/
build:
  list: never
  publishResources: true
  render: always
---

I wrote a similar version of this internally at Meta a few years ago for my org after finding myself in the middle of a few SEV1s in a row -- and being consulted / asked for support in other similar situations. I thought this might be something useful to share (as a public version) as well. This won't be perfectly fitting for all use cases, but having a runbook works as an anchor in the midst of chaos, helping to get you unstuck from "what's next?". Admittedly, this is an incomplete runbook that serves more as a template for your team or company to complete with more specific tooling guides (using _which_ tool to achieve _what_, etc.).

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

## Stop the Bleed!

The highest priority is to stop the bleeding immediately. _Flip a killswitch, roll back changes, apply server-side fixes, apply client-side fixes_ - **in that order**. A killswitch generally propagates faster, thus is preferred over code changes, but even then, prioritize rolling back changes instead of forward fixing. Forward fixing adds more unknown factors into the mix (because that's more new code which could now cause new / different problems); rolling back, on the other hand, is more predictable. Server-side fixes over client-side fixes should be pretty obvious since you can guarantee the server version (as the service provider), but you can't always force a client to update (native apps), or there could be some caching involved (web).

## Multiple Workstreams

During a major incident, there are generally multiple things that can or need to happen in parallel. Break them down into clear workstreams and delegate a domain expert to run each of them. If more things are discovered down the line (or the situation changes), switch up the workstream and get different people (domain experts) involved to run different things. Since you're dealing with an incident (which are usually time sensitive), **never hesitate to call people**. This needs to be said a lot because people constantly hesitate about false positives or getting on others' bad side for inaccurately calling them up. But you won't know what you don't know without getting the domain expert to show up and verify what you're seeing.

## Chat Management

Alongside having separate workstreams, you should also set up separate chat threads for each workstream to keep the _main chat_ low on noise. That said, make sure to announce the establishment and / or major milestones of each new workstream clearly within the main chat so everyone relevant is correctly included. You might be in a lot of different chats and things will be chaotic, so you will need to take extra care in ensuring that the right people are in the right chat to allow them to get their different tasks going. Everyone should still be in the main chat, but most discussion should happen in the workstream chat.

## Sync Meetings

There are generally 2 types of sync meetings. First is the "everything just happened so we started a meeting to info dump and get everyone up to speed." This meeting will always be chaotic with a lot of people joining to figure out what's happening and what to do next. (There might also be people who only joined out of curiosity, but as long as they aren't interrupting, they are the least of your problems - unless Zoom is not scaling lol.) Set out a clear goal, a set of tasks, and an owner for each of those tasks. Finally, set a follow-up date and time (usually in a few hours) for everyone to regroup with new findings and progress to determine next steps.

The second type is the follow-up and / or recurring meeting. This will feel more like your regular team standup meeting except with a lot more urgency. It's important to note that if there's any major breakthrough, people shouldn't wait until the next planned meeting time to report (because, well, this is an outage lol) but should instead share it with everyone immediately. This goes back to the previous point about chat management where you (as the incident manager) will need to monitor each workstream chat to catch something like this. After resolving the core issue, there might still be _important_ cleanup work needed to be handled with a similar level of urgency to prevent the same outage from happening again in a very short time. In these long-running incident cleanups, you might opt to have daily (or even twice-a-day) sync meetings until the cleanup is complete.

## Wrap up

As a whole, you will largely be more like a PM / TPM instead of a regular engineer when handling a lot of this _alignment_ work. If you think someone else is better suited to handle this (another more senior engineer or your manager, etc.), ask for help while you focus on the thing that you do best (likely as the subject matter expert on investigation or remediation). Remember that incident management is a skill that improves with practice - don't expect to be perfect on your first few incidents, even experienced engineers can feel overwhelmed when everything is on fire. Don't forget to acknowledge the team's efforts since major incidents are stressful for everyone involved, and use this runbook as a starting point while adapting it based on your team's specific needs and continuously improving your processes with each incident.