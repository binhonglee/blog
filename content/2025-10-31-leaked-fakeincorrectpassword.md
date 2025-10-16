---
title: Leaked `FakeIncorrectPassword`
subtitle: "When your social media break turns into work"
date: 2025-10-31 00:00:00 -0800 GMT
tags: [Project Presentation, Incident Management]
ss: "preview/leaked_fakeincorrectpassword.jpg"
aliases:
  - /leaked_fakeincorrectpassword/
build:
  list: never
  publishResources: true
  render: always
---

It was Thanksgiving day and I was mostly chilling at home scrolling Threads while watching YouTube. I then came across this post:

{{< threads "https://www.threads.net/@justinamphlett/post/DC7O6MHOXaX" >}}

I immediately recognized that the screenshot is bad. `FakeIncorrectPassword` is an internal error code used when the integrity system thinks you're a bad actor (bot, scraper, credential stuffer etc) and so we would show you an _Incorrect Password_ error message regardless of whether the password is correct. But as seen in the screenshot, we show the raw `FakeIncorrectPassword` string directly instead of the regular _Incorrect Password_ error.

_This is part of a series [(Project Presentation)](/blog/project-presentation/) where I share stories of my past projects._

{{< newsletter >}}

## Notifying owners

The user noted that this happens on mobile web which means they happened to land on a test group, since a sister team had just started public testing this new UI / flow on mobile web. I tried ringing up the oncall for their team (who also happened to be the owner of the public test) but I saw that they had actually marked themselves out-of-office for the whole weekend through the upcoming Monday. Well, that's not good (also weird that they were off while oncall❓).

![](/blog/img/fakeincorrectpassword1.png "Comparison between old vs new login screen")

## Investigation

Anyway, I had a few hours to kill before I needed to leave to join my friends' Thanksgiving party. I looked at the time and told myself _"I have time"_ so I decided to start debugging it myself. I'd worked tangentially with this stuff before so I knew a few other things (like 2FA) that also need special handling should be working as intended. My hunch told me that this was caused by the gap between the Python stack (IG server) throwing some error that wasn't properly consumed by the Hack server stack (that determines the UI). So I searched for `FakeIncorrectPassword` in the Python stack and found something like `TwoFactorError`. Then, I looked for `TwoFactorError` in the Hack stack to see how it works and eventually found the one that didn't handle the case for `FakeIncorrectPassword`. Simple enough, I just had to add more stuff (IIRC I added a few others as well as the aforementioned `FakeIncorrectPassword`) to the existing switch case.

![](/blog/img/fakeincorrectpassword2.png "Simple diagram to show how the calls relate")

## Testing

At first, I tried triggering the `FakeIncorrectPassword` error on my devserver to test the fix but I don't really know how most of these things work (having never worked on integrity teams). I eventually figured I could just comment out the integrity system calls and just always force return `FakeIncorrectPassword` error. Trigger login and take a screenshot for both before and after the fix. Done! I sent the fix out for review and waited for a bit to make sure everything turned green on CI before leaving for the Thanksgiving party (didn't want to bring my laptop with me since I wasn't actually oncall lol).

## Shipping

Before heading out, I tagged 2 other oncalls (on top of the OOO oncall) to let them know that I'd written the fix and I'd let them decide if they wanted to ship it or wait till Monday. One of them saw it and immediately approved + shipped my fix. Monday came around and my change got the attention of a few people from the security team. They eventually filed a post-hoc SEV for this and did an in-depth review on what went wrong in the process that led to the leak of this error message.

## Takeaway

The main culprit here is that most Instagram code lives in a different stack (Python) than where the UI is (Hack) and a lot of the Python code just uses `string` everywhere instead of proper enums for something like this, making it really hard to keep track of all the potential edge cases that could be missed. Having some familiarity with both the Python and the Hack stacks made it easier to trace the problem and spot the gap in the error handling logic. The fix itself was straightforward once I found the right place, but getting there required understanding how errors flow between multiple systems.