---
title: Building a Simple Newsletter Service
subtitle: "Just a DB with some HTMLs"
date: 2025-05-21 00:00:00 -0800 GMT
tags: [Self Hosted, Newsletter, Service, Email]
ss: "preview/simple_newsletter_service.jpg"
aliases:
  - /simple_newsletter_service/
---

When I had the idea on the series about [The Opinionated Engineer](/blog/2025-05-04-the-opinionated-engineer/), I figured maybe that's something worth setting up a newsletter service over. That said, after some consideration, I just thought that I didn't need anything too complex and decided to roll my own because "how hard could it be?". As far as I can tell, I think it's working fine so far(?) and took me around one whole day to put the whole thing together from my couch. You can find all of it's source code [here on GitHub](https://github.com/binhonglee/subscription).

{{< newsletter >}}

## Existing newsletter services

Aside from Substack, pretty much all other services provide it with a "freemium" model where you are charged based on the number of subscribers (regardless if they are paid). Admittedly, I doubt my newsletter would get to that point (I try to not take myself too seriously lol) but I also didn't need most of the things those services are providing. Not to take anything away from them, they all seem really useful if someone is doing that for a living, but I mostly write for fun and as a way to do some knowledge preservation (future self-reference) with the sharing part mostly being a bonus.

As for Substack, I didn't look too deep into things and while they don't have the best of reputation, their product seems to fit my use case best where I won't have to pay anything ever unless I started having paid subscribers. That said, I thought I didn't need something as fancy but just something simple that goes with my personal blog.

## Design

It's a pretty straightforward design with a DB storing the email, a key (used in place of the email as an identifier), and it's confirmation status. When someone subscribes, they get sent an email to confirm their subscription, which they can pick to either "Confirm" (where we update the confirmation status) or "Unsubscribe" (where the entry is removed from the DB). First reason to use a key is so that we know the confirmation or unsubscribe click is coming from the users' email instead of just people manually typing the link with someone else's email as the param. Secondly, it prevents unintentional leak of the user's email in address bar / browser history. Not necessarily a big deal but just not the ideal privacy design. (You could argue that _exposing_ the key that way isn't great either but I'd imagine being unintentionally unsubscribed from ~~a~~ my newsletter is likely a non-issue for most people lol.)

## Python core library only

The whole thing is written in Python (with some HTML templates) without using any third party library. I can't say this was fully intentional but I generally like to avoid external libraries unless absolutely necessary which in this case, it's not. As for "why Python", it was an arbitrary decision as I've been doing interviews with Python and sometimes feel like I probably should brush up on it's syntaxes lol. (Kept having to Google random things like "split string in Python", "define object in Python" is uhh, not exactly ideal while in the middle of a coding interview session lol.) I did regret on this slightly because this can't be "compiled into a binary" where it can just be dumped somewhere to run by itself forever with some config files and HTML files. Instead, it needs the server to have Python installed and run the actual Python code. I'd prefer keeping and running only the binary on server but I digress.

As for it being HTML / CSS only, it's mostly an extension from my personal site and blog being that way [which I've previously discussed about here](/blog/2022-01-31-rebuild-personal-site/). My personal opinion is that our growing reliance on JavaScript to do things had made us forget how powerful raw HTML and CSS could be in general. But also, I've been pleasantly surprised at how maintainable this has made my site as a whole. No worries about vulnerabilities or chasing and rebuilding it on the next / new shiny framework.

## Email HTML quirks

For the most part, email HTML behaves mostly the same with regular page HTML but there's a few things that didn't work which I'd like to point out:

- `<button type="submit" />` within a `<form method="post" />`
- `var()` CSS params
- `html {}`, `:root {}`, `body {}` selector in CSS
- `:hover` - I read that some email provider supports them but most don't
- `<style />` block (Gmail client specific) - Despite [what Google says](https://developers.google.com/workspace/gmail/design/css), only inline CSS is rendered on Gmail's own clients*
- JavaScript - expected to prevent XSS lol

I also tried to include everything in the email itself and didn't make any references to external files for CSS which I assume would likely be stripped off as well.

_*The content of the email do remain so if you use a 3rd party client (like Mail on iOS) it'd render just fine but Gmail apps or web client won't render anything in `<style />` tag._

## Credential stuffing

Shortly after I deployed it to the open internet (like within 48 hours), I started seeing weird traffic with [random emails signing up but never confirming their sign-ups](https://www.threads.com/@binhonglee/post/DJ4rP3FyZsn). [Shubham](http://shub.club/) mentioned that this is a "stuffing attack". I did some more digging and find that this is a common thing where bad actors would just randomly try (usually old hacked) credentials on your site to see if they work. In my case, my param is set as `email` so it's likely super obvious that it takes an email. To be quite honest, I haven't figure this all out but I added some secret key and some extra logging to track bad ips. It's not perfect but it seems to be doing it's job so far (along the confirmation check) in blocking majority of the spam traffic from actually signing up. As to why this is bad, I woke up to multiple emails mentioning that my send attempt to certain emails were bounced 🙃, probably a bad reputation thing if my email continues to be bounced.

## Wrap up

This is a fun little experience and mostly a good opportunity to brush up my Python skill better. (Ironically, I ended up doing my next interview in TypeScript lol.) I'd imagine if I started having more, different, thematic series in the future, it might make sense to allow for segmented subscription / un-subscription but that's work for another day. For now, I hope you enjoy reading this as much as I had fun building and writing this. Please subscribe below (or don't lol).