---
title: Incident Review Process
subtitle: "Let's make sure it doesn't happen again"
date: 2025-11-14 00:00:00 -0800 GMT
tags: [The Opinionated Engineer, Incident Management]
ss: "preview/incident_review_process.jpg"
aliases:
  - /incident_review_process/
build:
  list: never
  publishResources: true
  render: always
---

In the [previous runbook](/blog/2025-07-25-major-incident-runbook/), I mostly focused on things to do _during_ an incident as it happens. This week, we will focus more on what to do _after_ the incident is resolved. This is an opportunity to look back at what went well, what went wrong, and how we can best prepare ourselves or prevent something similar from happening again in the future.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

{{< newsletter >}}

## Report

After the incident, the incident owner should fill out an incident report detailing things like root cause, alerts, remediation, recovery, prevention, etc. Ideally this is made into a template and the author should go into detail about what actually happened vs what should have happened and how it could be improved. The report should be completed at least a day or two ahead of the review to allow for optional pre-reads.

## Review

Usually you'd need someone (or a group of people taking turns) to organize the review. Their job is to pick the set of incidents to review, make sure that incident owners fill out the report adequately, and that everyone relevant is invited and available to attend the review. It's not really a _hard_ job per se but it requires some async communication and some level of familiarity with the org scope to ensure that all the right people involved in each incident will be there at the review.

## Audience

Aside from incident owners and people directly involved in said incidents, team EMs, senior engineers, and senior org leaders (Director / VP) are critical to have present in the review. EMs are there to ensure visibility and awareness of the importance of follow-up work from the incident review. Senior engineers are there to raise questions and/or provide recommendations especially surrounding detection and prevention strategies. Senior org leaders showing up - at the very least - solidify the importance of the review and enforce that planned follow-ups are actually worked on with allocated time instead of being set aside / deprioritized.

## Follow-ups

After the review, there will likely be a laundry list of follow-up work to be done. Note them down in your task tracker (Jira, Asana etc.) and assign them to the right owners. By default, the incident owner would own it but it's very common to have it assigned to peers or even external teams, depending on how/what was broken. One of the more common failure modes here is the lack of tracking on these follow-up tasks. Make sure to have a proper process to (at least) have someone - _anyone_ - review these tasks over time to ensure they are being worked on in a timely manner and actually completed or attempted in good faith. It'd be a shame (with a lot of awkward conversation) if there ended up being another similar incident that could have been prevented by said follow-up task.

## Pattern

In some cases, frequent attendees might notice a pattern of incidents and propose wider improvements (instead of specifics to any incident). One example we ran into was how a lot of incidents could have been prevented by having automated tests. This wasn't because the team didn't make an effort to write them, but because there was a more underlying issue (outside of the team's direct purview) causing existing tests to become flaky. We ended up having an entire workstream focused on fixing all the automated test blockers found in the org. (I'll probably write about my experience working on it someday, under the [project presentation](/blog/project-presentation) series.) Anyway, the point here is that having a consistent set of decision-making audience helps make sure patterns like these can be better discovered instead of overlooked.

## Accountability

I've touched on this previously in [No Blame SEV (Incident) Culture](/blog/2025-05-30-no-blame-sev-culture#no-blame--no-responsibility). Generally, there shouldn't be any explicit _blaming_ happening in the incident review meeting but as I've seen others put it, there could still be _"shame"_. The way I've understood how a lot of this works is that the worse the outage was, the less likely the incident is to be entirely the responsibility of an individual. If you took down the _entire_ production tier of your company, there are likely a lot of things that need to go wrong for it to happen, so it shouldn't all be on you.

Aside from all the "who's wrong / who's to blame" side of accountability, there's also the part where each responsible team needs to take on follow-up tasks to strengthen their end of reliability to prevent similar incidents from happening again. For example, if an internal framework or component library change breaks a bunch of stuff in the company, the most obvious thing would be for the framework/library team to improve their regression testing. But client teams might also want to consider adding stricter test coverage on critical paths so they can be more defensive and catch potential future breakages earlier.

## Wrap up

The incident review process is a critical part of your team's long-term reliability. It can be daunting to those presenting their first incidents so a proper report template helps make sure you always have quality content for the review. From there, getting the right people in the room regularly and actually tracking follow-up work helps make sure you don't fall for the same problem again. Even if you aren't sure where to start, putting together a rough process can help kickstart it as you re-evaluate and refine it as it goes. The goal isn't to eliminate all incidents, but to make sure you're learning from them and getting stronger as a result.