---
title: "[Idea] Supercharge Social Media Search with LLM"
subtitle: "Plug AI into Search but better!"
date: 2025-06-15 00:00:00 -0800 GMT
tags: []
ss: "preview/social_media_search_with_llm.jpg"
aliases:
  - /social_media_search_with_llm/
---

If you're on Facebook or Instagram, you've probably seen Meta AI being plugged as part of search. However, in my opinion, they're not doing it correctly. They are making the LLM answer the prompt as if it were a generic question. Instead, they should make use of the LLM to find personalized answers based on content they can access. I know it sounds confusing, but I promise it will be worth your time. Let me explain.

_Disclaimer: I'll try to write this like a proposal but also in a blog post format, so it might read a bit weirder than usual._

## Context

> ![](/blog/img/ml_tweet.png)
> Source: [@VishalMalvi_](https://x.com/VishalMalvi_/status/1645513685090140167)

This is not exactly a new idea. Back when I worked on search at Facebook (early-to-mid 2019 - specifically on Workplace Search), the Search team had a feature called "grammar search" where you could search with prompts like "photos of my friends" and it would show you photos of your friends. It's mostly a bunch of hardcoded rules with maybe a little ML on top for synonymous queries to match to an existing rule. Kind of like how Siri works where it's just a bunch of rule-based instructions. (This is a part of [graph search](https://engineering.fb.com/2013/04/29/web/under-the-hood-the-natural-language-interface-of-graph-search/) which had existed for much longer before that.)

## How?

Think of it like the Google Search vs ChatGPT model. ChatGPT compiles the open web content and returns the result in a digestible wall of text while Google Search returns you a list of links. Currently social media search behaves more like Google Search and doesn't understand language semantics. If you search for "followers in San Diego", it would show you results of content with the words "followers" and "San Diego" instead of a list of people who follow you that live in San Diego. This is the gap that LLM fills. In an ideal world, the _AI agent_ would know exactly what you can access and show you the specific content.

## Opportunity

Compared to building _yet another AI agent_, this is a unique opportunity presented only to social media platforms to leverage LLM in building an attractive search model with their (relatively) closed environment and the trove of existing user content as a means to attract more persistent active users. Google's AI overview already does this to some extent, especially with Reddit content (which [they have an exclusive deal for](https://www.404media.co/google-is-the-only-search-engine-that-works-on-reddit-now-thanks-to-ai-deal/)). Whenever I want to see or understand _other people's_ thoughts on certain things, I've developed this habit to reach for Google search on Reddit. I think this is a large void that social media companies should try to fill instead.

### rednote (小红书)

Back when I was working on Search, one of the org's North Star goals (at least what I heard) was to hopefully replace Google's search share. That evidently didn't happen (and the search team / org has since shrunk). However, I feel like this is now an opportunity to rediscover this potential. One of the interesting behaviors I observed from my friends who use the rednote app a lot is that they have essentially replaced searching anywhere else with searching on rednote (especially about food and travel). In my opinion, this is a sign of users' willingness to make behavioral changes to adopt social media search results in place of search engine results from the open web.

## Risk

There are a few pretty obvious risks here (aside from the added complexity).

### People

> ![](/blog/img/fast_company_ss.png)
> Image by [Fast Company](https://www.fastcompany.com/90306769/why-is-facebook-suggesting-i-look-at-photos-of-my-female-friends-in-bikinis)

One of the biggest problems with the original graph search (which will likely be amplified with GenAI) is the creepiness of people. It _famously_ led to [the search typeahead suggesting people search for "photos of my female friends in bikinis"](https://www.wired.com/story/facebook-female-friends-photo-search-bug/) which is at best unfortunate and at worst creepy / weirdly invasive. The AI agent might need some guardrails on the type of content supported to prevent it from becoming a cesspool of unwanted traffic funnel (which could lead to more people leaving the platform or removing their old content entirely).

### Privacy

![](/blog/img/everyone_agent.jpg)

From what I know, AI by and large has been operating more like a black box even today. I see that as a potential risk where it would not understand or miss privacy rules around access, causing it to leak information unintentionally. There are 2 potential solutions to mitigate such risk. The cheap version would be to only train the LLM on publicly shared information. Unfortunately, it would significantly reduce the value of the LLM search itself. The expensive version would be to build an agent (or an extension of the agent) for each individual user based on their _network graph_. This would allow each user to have an AI agent that could potentially be extended into a personal assistant model (anyone remember M?) in the future.

## Ending note

It really pains me as a user that there's so much _AI agent_ everywhere (many of which falls under "who asked?" category) and yet I still struggle to find that one old Facebook post that I know exists somewhere. Please make it happen so at least the LLM integration on search is being put into good use that is attractive to users.