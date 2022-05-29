---
title: Rebuilding Personal Site from Scratch
subtitle: "Only HTML + CSS with no frameworks"
date: 2022-01-31 00:00:00 -0800 GMT
tags: []
ss: "preview/rebuild_personal_site.jpg"
aliases:
    - /rebuild_personal/
---

As time goes on in my journey of experimenting with different technologies on building a web interface, I figured it's time for my personal site to return to the fundamentals. So I decided to build it with only HTML + CSS with one of the goals being that it should work perfectly fine with JavaScript disabled.

*Before this, it's built with Vue. You can still find the source [here](https://github.com/binhonglee/binhonglee.github.io/tree/old_dev).*

# Design

## Inspiration

*Skip this next paragraph if you're not interested in my old site's origin story.*

My old site is structured more like a resume than a personal self intro. It's rather serious by nature since it was built at a time when I was looking my first job out of college. I stole the design from the personal site of a great friend of mine, Pat Pataranutaporn (just one out of the plethora of pages) and dulled it down a little. He rebuilt his entire personal site shortly after but I stick with it since I built it in a way that's rather easy to maintain (as in adding and removing stuff overtime). It served me well during those times but at this point a redesign is rather long overdue.

I can't really do design (unless I'm given a rigid component library then maybe 😅) so I looked up how some of the seasoned software engineers design their site and pick out the parts I like about them. Here are some of the websites I took inspiration from:

- [Jane Manchun Wong](https://wongmjane.com/)
- [Cassidy Williams](https://cassidoo.co/)
- [Joe Previte](https://joeprevite.com/)

## Ideology

One of the most obvious common traits among them is how minimal they are while still showing a lot of personality. The other being that 2 / 3 have a dark mode toggle while Jane's site is dark mode only. I stick with these ideas and decided to be more playful with my text colors especially since I can't draw. 

One other takeaway I had was that I really liked the monospaced font used on Cassidy's site. I tried Victor Mono initially since I really like it (and use it day-to-day on all my text editors) but I find it's readability isn't great for longer paragraphs. I decided to settle for Fira Code instead (first font that introduced me to ligatures for programming).

*Note: Monospaced fonts in general aren't meant for regular text reading anyway so this is something completely within expectation.*

# Implementation

## Dark mode

Since I'm not using JavaScript, this is going to be tricky. That said, major credit to Shubham for pointing out the basic concept of its implementation in [this tweet](https://twitter.com/4shub/status/1259298005368270849). On top of that, there's just a lot of CSS gymnastics where I learn about the different selectors and what they each does in CSS ([+](https://www.w3schools.com/cssref/sel_element_pluss.asp), [>](https://www.w3schools.com/cssref/sel_element_gt.asp), [~](https://www.w3schools.com/cssref/sel_gen_sibling.asp), [[]](https://www.w3schools.com/cssref/sel_attribute.asp)).

One important thing of note is that, the toggle "button" (the `detail` component) has to be at the same level as the top level of the rest of the components on the screen. I keep my toggle on the right which is sufficient to prevent colliding / blocked by other stuff on screen.

## Smaller Screens

I tried my best to make everything as modular as possible so it should properly reorganize itself dynamically based on the given screen size. However, there are always exceptions and this is where `@media screen and (max-width: 1000px)` comes in handy for addressing these edge cases.

## Dropdown Menu

As I add a few more sections to my side, I started to realize that the link menu might not fit on certain display sizes. In general, it just follows [this w3c guide](https://www.w3schools.com/Css/css_dropdowns.asp). I originally did one implementation that used the similar idea of the dark mode toggle above but I opted for `:hover` instead of `[open]` due to its interaction where I think it makes more sense to be dismissed when I tap on random places on the screen.

In order to make it more accessible, it is also important to add the appropriate aria labels. [This page](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html) has a rather comprehensive guide on the proper labels to add for each fields.

## Truncation (somewhat unrelated)

This is more for the blog part of the site where I find the default truncation being too lenient thus generating some of the overly long (and not uniformed) summary text.

```css
.description {
  display: -webkit-box; 
  overflow: hidden; 
  word-break: break-word;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical; 
}
```

# Takeaway 

Overall it's been a great experience to relearn and understand what we can do even without any of the modern JavaScript frameworks. It also serves as a great reminder that web existed for quite a while before JavaScript came around. While they may not be as pretty and reactive as it is today, they still works and have a lot to offer (especially as HTML and CSS standards continues to evolve as well).