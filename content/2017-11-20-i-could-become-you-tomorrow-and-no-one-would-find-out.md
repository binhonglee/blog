---
title: I could become you tomorrow and no one will know
subtitle: "because I have your IC number, your house address and phone number."
date: 2017-11-20 00:00:00 -0800 GMT
thumbnail: "img/icImage1.png"
tags: [Cybersecurity, Malaysia, Privacy, Data Breach]
---

## Backstory

I lied, but maybe someone else could. If you didn’t know already, [Malaysia just suffered possibly its largest data breach ever](https://www.lowyat.net/2017/145654/personal-data-millions-malaysians-sale-source-breach-still-unknown/) with personal data of millions of Malaysians (including your full name, IC number, phone number and home address) up for grabs as long as the price is right. If you are not freaked out yet, you should be and I’ll tell you why. I don’t think many people understand how dangerous these data can be. I’m also honestly mildly infuriated about this. No, not about the creator of [sayakenahack.com](https://sayakenahack.com/) (hereafter referred as Keith) but rather how this whole thing panned out. I’ve mentioned before in private conversations with friends about my concerns on cybersecurity in Malaysia but never really gave it too much thoughts. Not until I discovered this whole fiasco.

Let’s face it, with the amount of telecommunication companies being breached, it’s fair to assume that anyone who registered a phone number with their personal info on or before 2014 have their personal information leaked. _(This was also the general consensus of anyone who had seen the raw data, I didn’t.)_ By the time you are reading this article, [the site should have already been taken down](https://www.keithrozario.com/2017/11/sayakenahack-com-answering-the-questions.html) due to [MCMC blocking it](https://www.lowyat.net/2017/147967/mcmc-blocks-sayakenahack-com/). (This does not however, means that the data is gone. Plenty of shady individual everywhere still have a copy of all these dangerous piece of information.) I waited for it to be taken down before sharing this as I will cover an _exploit_ that can possibly end up producing some potentially damaging information with some very basic scripting skills (less than 1 hour of Googling).

## The true risk

When I brought this up to some of my friends, their reactions were rather “Meh, I don’t have anything of worth anyway. Why would they wanna hack me?”. This is where you’re wrong. They don’t have to hack you, you’re ALREADY HACKED. As to what can they do with it? **Identity theft**, basically THEY CAN BECOME YOU. With that, I mean they can apply for loans from banks on your behalf, register phone numbers (to run shady business) on your behalf, essentially enjoy all the benefits of being you without any of the drawbacks.

![Information obtainable from SPR website]({{ site.baseurl }}/assets/img/icImage2.jpeg)

When I first read about the breach, I thought, "it’s been 3 years now, as long as you’ve moved and changed phone number, they pretty much "only" have your IC no. It’s bad, but maybe not as severe as I initially might imagined”. Could I have been any more wrong. If you are a registered voter and your IC no is fallen into the wrong hands, whoever this is can easily pull up your full profile (full name, home address) from the SPR website. And while doing so, every single device that this set of data goes through (router, ISP, some surveillance services, or even a MIM attack) gets to see all of these information as well since the site is not encrypted. (It’s 2017 and TLS is free!)

## Responses

While I don’t think Keith’s approach is perfect (minor things like captcha, API dealing with non-existent query etc), I still think that is the closest solution available which is both informative (educational) and maintain minimal harm to the victims.

With MCMC shutting it down, I really hope that they are actually aware of the risk and provide a much better solution (considering that’s what their job is). To all the people out there calling this as a potential phishing, the website ask for numbers where you may or may not put in an actual existing NRIC and does not ask for anything else. If this person were to phish for NRIC, he might as well brute force the SPR website which comes with 100% accuracy and all your personal information.

And then there is Lowyat.net, no, the data is not in any way manipulated as it was simply **masked** for the safety of the victims because as you said it yourself, _[“the sheer amount of information on the site could subject it to abuse”](https://www.themalaysianinsight.com/s/23152/)_. I think you mean raw data not the masked data. Now that’s just a cheap shot at the choice of words, I read through some of the threads in the Lowyat forum and it seems like they are working closely with MCMC to ‘fix’ this. Hopefully, we will see something soon. As for now, I still stand by Keith on the ‘rights to know’ for the victims.

## Technical considerations

_Feel free to skip this if you are not into the technical exploitation_

That said, it has come to my attention* that the API allows easy data scraping. Remember I mentioned an exploit in the beginning? This is it. By knowing the birthday and birth state of an individual, it is possible to do a targeted background search through scraping with the API. While this approach might not be efficient if your intention was to do a mass scrape of all the data [as mentioned by Keith](https://www.keithrozario.com/2017/11/sayakenahack-com-answering-the-questions.html), the limitation in place is more than enough for such targeted digging. I do not want to go into details but if you string all these information I mentioned about throughout the article together, you’ll easily figure out what I am talking about.

Admittedly, this is less of a threat considering that if you are able to circumvent the captcha used at the SPR site with some sort of image recognition, its easily way worse than any kind of vulnerabilities Keith’s site can be.

_*I didn’t figure this out, credits to this random person who wanted to stay anonymous_

## After thoughts

Honestly, I’m widely upset by the of public’s reaction or lack thereof. Anyone who got their hands onto such information can just show up and ‘become you’ figuratively tomorrow but you couldn’t care less? I guess I’m going a little too far with my fear-mongering approach but I really think the public awareness of such danger is at little to none.

Much like the whole Equifax fiasco in the US, I sincerely think this is an important educational opportunity for both the public and the government officials to understand the importance of cybersecurity. I'm in no way an expert (not even a beginner so to say) in this realm but the ignorance over such topic is hurting the well-being of not just any individual but the trust in the country. With no punishment in place for organizations mishandling such damaging information (that allows impersonation), how am I ever going to trust anyone, any company, with any of my personal details anymore?

> _This article was originally published on [my personal Medium publication](https://blog.binhong.me/i-could-become-you-tomorrow-and-no-one-would-find-out-c9928e915c70)._