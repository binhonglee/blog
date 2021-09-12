---
title: Ava with Vue (2.x) + TypeScript (and NYC)
subtitle: "Component and Unit Testing with Test Coverage"
date: 2021-05-22 00:00:00 -0800 GMT
tags: [Vue, Test, Coverage, TypeScript]
ss: "img/avass.png"
---

When working on a project with Vue (TypeScript), I faced a lot of roadblocks trying to get code coverage to work. The issue is largely covered in [this issue thread](https://github.com/vuejs/vue-cli/issues/1363). Most solutions / workarounds for that seems to revolve around changing the bundling flow with webpack. Considering my lack of familiarity with webpack (on top of my use of scss and pug in Vue files), putting together a webpack config that works for me turns out to be extremely challenging. That somewhat prompted me to move the build and test process away from `vue-cli` while starting to experiment with different tools that could work. One thing to note is that, I'll be using babel to handle TypeScript compiling / transpiling instead of `ts-node` as recommended from Ava's guide. 

## Babel

We use babel to help Ava properly transpile the Vue and TypeScript files. This is especially useful if you would like to get accurate code coverage for your tests.

Here's how the `.babelrc` should look like:

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "babel-preset-typescript-vue"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-typescript",
    [
      "module-resolver",
      {
        "alias": {
          "@": "./src"
        }
      }
    ]
  ],
  "env": {
    "test": {
      "plugins": ["istanbul"]
    }
  }
}
```

A few things to note here:
- Alias set is optional. You only need it if you actually use the alias. You can also set multiple aliases or point it to a different directory depending on how your project is setup. Make sure you sync it with your `tsconfig.json` to prevent confusion / unwanted errors
- `istanbul` plugin is also optional. This is only needed if you want to also set up code coverage with `nyc` (more on this later).

## Setup File 

Setup file is there to set the test environment considering that these Vue component files are supposed to be ran inside a Vue instance with some preset, this file serve as a similar purpose but limited only to testing use.

Here's a sample `_setup.js` where you can build on top of depending on what you need / use. See original reference [here](https://github.com/avajs/ava/blob/main/docs/recipes/vue.md).

```js
var html;
var options = { url: "http://localhost/" };
require("jsdom-global")(html, options);

// Fix the Date object, see <https://github.com/vuejs/vue-test-utils/issues/936#issuecomment-415386167>.
window.Date = Date;

// Setup browser environment
const hooks = require("require-extension-hooks");
const Vue = require("vue");

Vue.config.productionTip = false;
Vue.config.devtools = false;

hooks("vue").plugin("vue").push();
hooks(["vue", "ts"])
  .exclude(({ filename }) =>
    filename.match(/\/node_modules\//),
  )
  .plugin("babel")
  .push();

if (!window.localStorage) {
  window.localStorage = {
    getItem() {
      return "{}";
    },
    setItem() {},
    clear() {},
  };
}

localStorage = window.localStorage; 
```

One of the changes I made was to set `localStorage` so you can also use it for the test.

You'll also need to include this file in your `ava.config.js` like below:

```js
export default {
  extensions: ["ts", "vue"],
  require: ["./src/tests/_setup.js"],
  babel: true,
  files: [
    "src/tests/**/*.spec.ts",
  ] 
};
```

At this point you should be able to run your Ava tests as intended and it would work just fine. However, if you want to have code coverage for the project, read on on how to setup your NYC config.

## NYC (optional)

One of the main reasons I started exploring for this option is to get good code coverage report. This setup allows us to let NYC generate proper coverage reports.

```json
{
  "instrument": true,
  "sourceMaps": false,
  "all": true,
  "check-coverage": false,
  "per-file": true,
  "include": [
    "src/**/*.{ts,vue}"
  ],
  "exclude": [
    "**/*.{spec,test}.{js,ts}",
    "src/scripts/**/*",
    "src/tests/**/*",
    "*.js"
  ],
  "extension": [
    ".ts",
    ".vue"
  ]
} 
```

# Conclusion

Personally, I wrote this piece based on my work on [GlobeTrotte](https://globetrotte.com). I've tried my best to cleanup the code for it to be as reusable as I can. Feel free to let me know if there's any issue with it. Hopefully you find this helpful.

---

## About me

I currently work at Facebook as a Software Engineer. I spend some of my free time experimenting and building new things with technologies I find fun and interesting. Follow my exploration journey [here](https://binhong.me/blog) or on [GitHub](https://github.com/binhonglee).
