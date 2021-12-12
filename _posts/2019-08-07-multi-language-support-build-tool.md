---
layout: post
title: Multi-language Support Build Tool
subtitle: "Developing with Please"
feature-img: "assets/img/plz.png"
thumbnail: "assets/img/plz.png"
tags: [Build, DevOps, Automation]
excerpt_separator: <!--more-->
---

<!--more-->

I recently started learning about Go to find out what’s all the hype about. So I figured what’s a better way than to build a project out of it? As I was setting up my machine and going through tutorials step-by-step, I was slightly annoyed by the fact that the development of Go projects are limited to inside the `$GOPATH`.

Personally, I have all my side projects stored at the top level of the computer. It might not be the best way to do it but I’m liking that I can see all my projects at one glance. I guess one could argue that you can soft link the folder into the folder inside `$GOPATH` and I would pretty much achieve the same effect. But it didn’t quite feel right to me, sounds like a really hacky workaround that might not worth the maintenance cost as I switch to a separate machine only to have to do everything all over again.

_*Note: Yes, I did eventually found out that you can now do development without being in `$GOPATH` with `go mod`._

Instead, I started looking into build tools that can do that. Admittedly, I intentionally picked something that’s not so mainstream (Buck, Bazel, Pants) and found Please. (The other part of me liked the idea of naming my run alias as `plz work` because it’s mildly funny.)

## Build Tools

So what is a build tool and why do we need them? In most occasion of a side project, you build and run each part of your project separately in a package of its own with only one (or two) programming languages each. In which you never needed to cross compile or compile multiple projects at once in parallel. Even when you do, there’s nothing that needs more than a couple lines of shell scripts to string them together since the performance gain through parallel compiling is not that significant if at all.

However, this does not hold the same for companies that adopt the concept of monorepo. Instead of multiple smaller repositories, they host all of their code (which can be a mix of many different languages and requires many different build flows) in just a single repositories. In this case, different projects can also share the same library that is already imported and in use by the other project thus making sure that the imported library version is always consistent across all the projects.

Here’s a quick summary of why and why not. I’m not here to debate if you should or should not use a build tool or monorepo. I’ll leave them to the experts. I’m just here to share about the possibility of doing so.

Advantages:

- Multi-language compatibility
- Not limited to any specific path
- Consistently work across supported devices
- Smoother e2e workflow (if set up correctly)

Disadvantages:
- Slightly steeper learning curve
- Can be complicated to set them up

## Installation

There are a few pretty straightforward way to install it according to their [documentation](https://please.build/quickstart.html) though admittedly, you probably shouldn’t just run some random script from some random website online (but then again, compiling from source can be a bit of a pain) so that’s really up to you.

_*Note: You mostly only need this installed to initialize the project. Others wanting to build / develop the project does not necessarily have to have `please` installed locally for them. Similar to how Gradle works with `./gradlew` on machines without Gradle installed, Please generates a `./pleasew` file that can be ran as an alternative if one does not have Please installed in the machine._

## Setup

### BUILD files

Honestly the BUILD file syntax for Please looks very much alike (if not identical) to some of the other more popular build tools like Bazel or Buck. I don’t know of the exact name for it but it is very Python-ish. In fact, GitHub linguist’s `language.yml` actually explicitly [classifies them as Python](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml#L4001-L4003). I recommend checking out [the documentation](https://please.build/lexicon.html) as they are pretty good in detailing the available fields and their purpose for it.

### External Dependencies

This is probably the most tedious part of the whole process. It makes you realize how much have you’ve taken tools like `dep` or even `npm` and `yarn` for granted. Unlike those other tools I’ve mentioned, you’ll have to manually list each and every one of the external dependencies (and their dependencies) properly so Please knows which to prioritize and how to build and manage them in the most efficient parallel way. Fortunately, this should be a one time thing as even if you consistently increase dependencies, chances are you already have the dependencies of the new dependencies listed.

## Code Structure

You have a lot of freedom here. While you might not want to go crazy and have your code all over the place (making them referencing each other a nightmare), you can afford to structure them slightly different from the conventional way since the build tool will handle the hierarchical setup for you. For instance, you can have your main go file 2 levels (or more) inside some folder unlike the usual top level requirements. Similarly, if you need some folders of multiple different programming languages to overlap in between each other, that’s pretty possible (though I would question the need for it and if there’s a rational reasoning behind it).

---

## pleasings

Aside from the built-in supported languages and rules, they also have an additional repository that is home to the rules that are not actively maintained / updated thus not being part of the core functionality / rule. These includes support for things like Android, Rust, Scala, Kotlin and even Nim (okay, I wrote the one for Nim so I’m just shamelessly sneaking it in here).

## genrule() / gentest()

Even with pleasings, there’s a possibility where there’s something you work on (or need for your project) that is not supported. In my project, I’m also compiling Vue.js code for the web. In this case, I used a genrule() to build it with pnpm (similar to npm and yarn) and a gentest() to run its tests. While it’s pretty straightforward to do it this way, I’ve also effectively reduced the benefits of using a build tool since I’m mostly waiting on this one rule (and rely on pnpm’s build efficiency instead of Please’s) when building my entire project. Here is an example how I did mine:

```py
genrule(
    name = 'pnpm',
    visibility = ['PUBLIC'],
    outs = ['node_modules'],
    cmd = ' && '.join([
        "top_level=$(pwd | awk -F'plz-out' '{print $1}')",
        "pnpm i",
        "ln -s \"$top_level\"\"node_modules\" \"node_modules\"",
    ]),
)

genrule(
    name = 'build',
    outs = ['dist'],
    cmd = ' && '.join([
        "current=$(pwd)",
        "cd $(pwd | awk -F'plz-out' '{print $1}')",
        "pnpm run build",
        "mv \"dist\" \"$current\""
    ]),
    deps = [':pnpm'],
)
```

*Note: Please do have [some support for JavaScript](https://github.com/thought-machine/pleasings/tree/master/js) in the `pleasings` repository in which you can use their `yarn_library()` and `js_binary()`. However due to the nature of node.js dependency hell nowadays, handwriting the `yarn_library()` rules for all the libraries you want + all the libraries those libraries depends on and so forth will probably take forever. I also did not look too deep into this to tell if this would work any differently from just running `yarn install` just by itself.

---

## CI Testing

One of the other benefit of having a build tool properly set up is that it would be slightly easier (and more consistent) to set up your CI testing both in terms of testing environment and testing outcome. Of course, there are still some external dependencies like language version installed etc but for the most part, build tools would always pull fresh version of the new build regardless if there is a cached version on the machine (that might mess with the consistency of the test result).

## VSCode

For most code editors, their linter will rely on the env value of `$GOPATH` to look for third party libraries used in your go codes. Since those libraries don’t live in there when building with Please (it is in the `plz-out` folder inside your project folder), you will want to have a `settings.json` file that points the linter to the right location consisting of the compiled libraries. Something like this:

```json
{
    "go.inferGopath": false,
    "go.gopath": "{workplaceFolder}/plz-out/go:/{workplaceFolder}/plz-out/go/src",
    "files.watcherExclude": {
        "**/plz-out/**": true
    }
}
```

_*Note: you will want to replace `{workplaceFolder}` with an absolute path to wherever your project lives since the linter seems to complain about using a relative path as `$GOPATH`._

---

Hopefully this has been helpful in opening you up to trying and mixing different programming languages into your project. Why? To me, side projects are just experimental grounds for fun. If it sounds interesting enough, I’ll try and make it happen (or in this case, see if someone has done it and use their ready build tool).

If you are interested, [this](https://github.com/binhonglee/GlobeTrotte/) is the side project I’ve been working on. Thus far, its still not functional. It will most likely take another few months or so (depending on my progress and how much free time I have committed to this outside of work) before I can deploy a minimally working version of it.

---

## About me

I currently work at Facebook as a Software Engineer. I spend some of my free time experimenting and building new things with technologies I find fun and interesting. Follow my exploration journey [here](https://binhong.me/blog) or on [GitHub](https://github.com/binhonglee).
