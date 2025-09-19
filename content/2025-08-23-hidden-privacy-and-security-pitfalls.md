---
title: Hidden Privacy / Security Pitfalls
subtitle: "Sometimes good coding practice isn't good enough"
date: 2025-08-23 00:00:00 -0800 GMT
tags: [The Opinionated Engineer]
ss: preview/hidden_privacy_security_pitfalls.jpg
aliases:
  - /hidden_privacy_security_pitfalls/
---

Most software engineers think of this as "someone else's problem" (usually a privacy engineer or security engineer), but realistically, there's only so much stuff (bad code lol) they can catch. Especially if you work in some of the more sensitive areas, it's not realistic to have them do code audits for every change. This means that you as the code author (or reviewer) need to at least pick up some basic instincts about things that can pose risks.

_This is part of a series [(The Opinionated Engineer)](/blog/2025-05-04-the-opinionated-engineer/) where I share my strong opinions on engineering practices._

_**Disclaimer**: I'm neither a privacy engineer nor a security engineer (but a software engineer) so take this mostly as a way to raise awareness about considering some of these pitfalls while building instead of as an expert opinion on what to do._

## Timing attack

Even if you return the same response every time, you might still be leaking data (or mostly inference) based on the timing it took the server to respond. As an example, a typical email + password login system probably looks like this:

1. Hash password
2. Email lookup
3. Compare hash

Now, considering that password hashing can take quite a bit of time and resources, we could rearrange the order to make it more efficient by making use of "early returns." Something like this:

1. Email lookup
2. Hash password
3. Compare hash

With this new setup, you'd only do password hashing when an email already exists in your record, thus saving time and processing power from unnecessary password hashing. However, you're also returning your network request much sooner. This becomes an unintentional leak where a bad actor can use it to tell if an email exists in your database or not by doing some timed response comparison. My favorite solution to this problem (when applicable) is to add a random response delay—not long enough to significantly affect user experience, but just long enough to throw an attacker off.

## Scraping

Generally the _easy_ solution here is to slap a rate limit on it and call it a day. The problem, however, is that you need to realize not all endpoints are created equal. Most evidently, you have an endpoint that returns info about a user when given an ID, while you also have an endpoint that returns info about **a list of users** when given a list of IDs. Both of these endpoints can't just share the same rate limiting because scraping the latter endpoint is `list_length`x more _efficient_ than the former.

## Credential stuffing

This is usually the result of password reuse. While you can _technically_ do credential stuffing with just randomly enumerated credentials, the cost is unlikely to be worth the outcome for the attacker (unless there are some specific exceptions). Since people reuse passwords and there have been many previous hacks (unfortunately containing plaintext passwords), your perfectly secure authentication system becomes vulnerable not because of your code, but because of breaches elsewhere. That said, these attacks are _usually_ more obvious, coming from an _expected_ set of IPs (all from the same location or same VPS provider, etc.).

## Contactpoint disclosure

A little different from the rest of the list, this is more of a _type_ of disclosure than a _method_ of disclosure. While many systems are more conservative and opt for the route of never even disclosing if a specific contactpoint (email / phone number) is even associated with the platform, some do allow for it. However, this will require a bit more care in handling such disclosure where we don't want to disclose **other** contactpoints being connected to a given contactpoint (even through inference). The main reason being that this risks leaking identities behind pseudonyms where people can _connect the dots_.

## Rate limiting

Rate limiting is both a valuable tool and also a potential risk of exposure. Most evidently, rate limiting helps reduce (and hopefully prevent) scraping and credential stuffing attacks. However, in some systems, rate limits are set on a per-account basis, making it a risk of exposure as you can do targeted attacks with some reasonable correlation to get information out of it.

Here's an example:

_Condition: email A and phone A are both owned by the same account while email B is not._

- try (and fail) login with email A -> no rate limit
- try (and fail) login with email B -> no rate limit
- try (and fail) login with phone A -> no rate limit
- keep trying email A until it's rate limited
- try (and fail) login with email B -> no rate limit (since different account)
- try (and fail) login with phone A -> **rate limited**

There are many reasons (or other situations) where it's not immediately obvious how introducing an account-based rate limit can be a risk.

## Phone recycling

Many platforms rely on phone number verification to authenticate your ownership of the account, but phone number ownership isn't exactly _immutable_. In fact, phone numbers commonly switch hands in most countries for a variety of reasons (especially as people move across countries). Unfortunately, this is a much trickier problem to tackle due to the wide variety of carriers spread across different countries having different processes and regulations around it.

## Email recycling

While email recycling isn't as common as phone recycling, it still persists (especially those with custom domains). In fact, many years ago one of the largest email service providers actually allowed anyone to register expired email addresses. This became a major attack vector on Facebook since many people back then set their emails to be shown publicly on their Facebook profiles, while also simultaneously stopping using those same email addresses - leaving them to expire. Thankfully, most email providers have learned of such attack vectors and no longer allow deactivated / deleted email addresses to be re-registered _ever_.

## Wrap up

These pitfalls often emerge from well-intentioned optimizations that look perfectly reasonable in isolation. The key is developing a mental checklist of common attack patterns rather than becoming paranoid about every line of code. Security isn't just about preventing obvious attacks but instead, it's to think through the subtle ways your system behavior can be observed and / or exploited.