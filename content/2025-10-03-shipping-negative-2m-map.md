---
title: Shipping a project with -2M MAP
subtitle: "Not everything is your problem"
date: 2025-10-03 00:00:00 -0800 GMT
tags: [Project Presentation, Growth]
ss: "preview/negative_2m_map.jpg"
aliases:
  - /negative_2m_map/
build:
  list: never
  publishResources: true
  render: always
---

There's a saying in Meta that 'Nothing is somebody else's problem' but sometimes, it really is. At this point in time, I was working on a growth team whose top-line goal was to grow Facebook MAP (monthly active people). So naturally, it's surprising for me to have shipped something that directly regressed the very metric the team should be growing.

_This is part of a series [(Project Presentation)](/blog/project-presentation/) where I share stories of my past projects._

{{< newsletter >}}

## Background

This was still within the first year of me joining the team. Unfortunately, up to this point, I hadn't had any successful (+MAP) launches, and I'd been eager to prove myself. The most recent project I worked on before this was to show an educational screen to users right after they logged in (under a specific condition) before they got redirected to newsfeed. Once a user logs an impression on newsfeed, they are considered MAP.

![](/blog/img/negative_2m_map_1.png)

My project failed because for some reason it logged a MAP increase on the very first day - which didn't make sense because users should be MAP on the first day regardless of whether they're in the test or control group. If anything, it could have had a slight drop if users dropped off on the interstitial before they reached newsfeed. At this point, my manager suggested that we move on to something else since no one really knew why. I was, however, adamant about figuring out what happened, so I started digging into it anyway. (**major mistake**)

## The Bug

I dug through the stacktrace step-by-step, the code line-by-line, until I saw a variable that caught my eye: `is_platform_login`. For some reason, when it was true, we ignored the `next` param in redirection. I didn't know what "platform login" was, so it was time to get some help. I asked my mentor / tech lead what "platform login" was and was told that it's third-party login (think "Login with Facebook" on other sites). It's something owned by a separate team, and I should go ask this specific person (Kevin) if I had more questions about it. So I decided to test how it worked. I opened up Spotify, clicked "Login with Facebook," then logged in (through that specific condition), and thereafter I was redirected to FB Newsfeed instead of going back to Spotify to complete my login!

## Discovering the scope

First, I looked up the blame and just asked the person (on a sister team) why they explicitly excluded platform login from this redirection. They told me that's just how the team tests and ships new features in general. Fair, but I didn't think it made sense in this case. So I reached out to Kevin and asked if they were aware of the bug. They were surprised and agreed with my assessment that it should be fixed.

![](/blog/img/negative_2m_map_2.png)

I merged the change and started an experiment for the fix. After a while, I pulled the metrics on the experiment and saw that it regressed MAP heavily, around 2M MAP. This wasn't exactly surprising, as you've seen in the image above, since we were redirecting the users back to the third-party platform source, which no longer counted them as MAP. I went back to Kevin and asked what their team's goal metrics were and if they had a data scientist on their team willing to help with experiment analysis.

## Justifying the ship

We brought the experiment to be reviewed. (If you aren't familiar, [here's a previous article on how experiment review works](/blog/2025-06-27-experiment-review-process/).) Most people understood the reasoning behind the ship recommendation, but there were some questions around better understanding whether this was intended user behavior. After some back-and-forth, we agreed to ship this with a long-term holdout to study the potential long-term MAP effect.

A few months later, we pulled the data for the long-term holdout and verified that the long-term MAP regression was closer to 20k. This meant that 90% of the users who were _forced_ to newsfeed (caused by the _bug_) did not stay MAP for very long and eventually churned one way or another anyway. It's likely because these users did not intent to _actually use_ Facebook to begin with, thus also unlikely to stick around when they were _wrongly_ redirected.

## Takeaway

For one, I was penalized for essentially spending too much time on work that wasn't aligned with the team I was on. Realistically, I should have taken my manager's advice to move on to another project. Even after I'd found the bug, I should have passed this off to Kevin and their team to run the experiment and provided support instead of trying to be the hero. The results from the long-term holdout also didn't materialize until the next performance review cycle, so that definitely didn't help.

Finally, I still never actually figured out whether this was the bug that was causing my original project to fail. We suspect it might be related, but I never re-ran it and never got any sort of verification that it solved the issue. It was a lot of learning experience for me overall, but at least I delivered (imo) the ideal user experience and was able to justify the change _despite_ the team's goal metrics.