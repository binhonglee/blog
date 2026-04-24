---
title: Quick Fix for a Dangerous Session Pattern
subtitle: "Preventing potential privacy leaks before they happen"
date: 2026-04-24 00:00:00 -0800 GMT
tags: [Project Presentation]
ss: "preview/dangerous_session_pattern.jpg"
aliases:
  - /dangerous_session_pattern/
---

With [the recent announcement of Meta Account](https://about.fb.com/news/2026/04/meta-account/), I wanted to share a small incident on how I helped mitigate one of the more glaring privacy issues that came up during development. As you might know, this is a brand new account type (different from the existing one), so internally there's a simple function (something like `session.isNewAccountType()`) attached to your session for easy reference when needed, like showing different UI for different account types. But what about before you log in?

_This is part of a series [(Project Presentation)](/blog/project-presentation/) where I share stories of my past projects._

{{< newsletter >}}

## Background

One random afternoon, the tech lead on the login team came to me (mainly because I was like the only other person in the office) and asked, "Isn't it a bad practice to use this function `genSession_DO_NOT_USE_DANGEROUSLY_IMPERSONATE()`?" And I was like, "Uh yeah, that's why it's named that way." We asked the PR author why they decided to do this. Turns out, the team that built the `session.isNewAccountType()` function didn't build one for a logged-out session, so the only way to do the check is by creating a session impersonating that user, then calling it.

Something like this:

```js
session = await genSession_DO_NOT_USE_DANGEROUSLY_IMPERSONATE(uid)
if (session.isNewAccountType()) {
  /* logic for new account type */
}
```

_Note: Function names are slightly altered and I'm using JS instead of Hack for readability purposes, but it should be obvious what I'm referring to if you've worked on any product space in Meta (especially FB)._

This is a pretty dangerous pattern since you're leaving a dangerous `session` variable everywhere in the code that can be accidentally misused for other things, which could end up leaking privacy-sensitive information (since it's basically impersonating as if the user is logged in). Even if it's inlined, it could be unknowingly refactored in the future by people or bots (or AI) and has the same abuse problem.

## Reaching out

After figuring out the right owners, we set up a group chat with their team to understand why they decided to do this (or if it was just an oversight) and what level of effort they thought would be required to make this work. To my surprise, they didn't think this was a bad practice at all, so they opted to keep it the way it was. We scheduled a meeting to raise our concerns and align on what could or should be done here. During the meeting, they cited that a logged-out friendly version would take their team around 3 engineering weeks to build, which frankly was time they didn't have.

## Discovery

While I did join the meeting, I left most of the talking and discussing up to the tech lead and others. I focused mostly on digging into their codebase to understand how it works and why it would take 3 weeks to build (since it _looks_ like it should be straightforward). I learned that the session infra is pretty convoluted (for good reason). Mainly because everything in there needs to support not just FB but also other Meta apps like IG, VR, etc. (and all their ID types). There's also a bunch of different abstraction layers for stuff that needs to be supported for different combinations of apps. That said, I was able to get a prototype working for FB (in limited use cases) by the end of the meeting, so I thought maybe I could build this myself in less than the aforementioned 3 weeks.

_Side note: I was between projects at the time (due to some project reprioritization) and would be going on leave for a whole month (recharge) in about 2 weeks, my manager and I decided not to start any new projects until after I returned. Since I had some free time with nothing scheduled on my timeline, I decided to take a poke at this problem myself._

## Building the fix

After the meeting ended, I showed my prototype to the few people in the meeting room. I told them I'd continue to work on it and see where it goes. Anyway, about 3 or 4 days later, I got the thing working, but there were still a few things that needed cleanup. One major issue was some access token stuff that I had just randomly picked an existing token for my testing. I went back to the group chat with my working example and asked for recommendations on how to go about the access token issue. They commented on the PR and gave me some pointers on creating a new access token with limited permissions (to be used only for this purpose). After some trial and error and back-and-forth, I got a fully working fix!

## Mitigated

At this point, it had been around 1.5 weeks since the discussion on this issue started. After getting the PR approved and shipping it, the call becomes significantly cleaner and no longer bears the risk of using an impersonation session. Thereafter, I made an announcement post and specifically made sure to call this out to all the teams working in the logged-out space.

The eventual version looks something like this:

```js
session = await genLoggedOutSession()
if (session.isNewAccountType(uid)) {
  /* logic for new account type */
}
```

## Takeaway

Scary function names are there for a reason and we should definitely avoid using them whenever possible. That said, I had great peers who were able to take on the alignment discussions (especially during the meeting), which allowed me to focus on diving into their codebase during the meeting to better understand the work and complexity being discussed. I think this is probably an example of _code wins argument_, though admittedly, having free bandwidth definitely helped. While we disagreed with the owning team's assessment (that the original version was an acceptable practice), we didn't push to argue who was right since it didn't seem fruitful. Instead, we focused on aligning to get the right fix out. After all, the goal isn't to win arguments but to mitigate the potential privacy risk.
