---
title: Test Driven Development with Alexa SDK
subtitle: "Quick guide to building and unit testing an Alexa Skill"
date: 2018-10-29 00:00:00 -0800 GMT
thumbnail: "img/alexa.jpeg"
tags: [JavaScript, Alexa, Alexa Skills, Tdd, Alexa Sdk]
aliases:
    - /2018/10/29/test-driven-development-with-alexa-sdk.html
---

# What is Test Driven Development?

According to [Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development), it means “Requirements are turned into very specific [test cases](https://en.wikipedia.org/wiki/Test_case), then the software is improved to pass the new tests, only.” Basically, you would first have to write the test of the software/feature you are developing before you start working on the developing the software/feature itself.

Here are a few more articles on the benefits and why you should apply TDD:
- [Test Driven Development](https://medium.com/mobile-quality/test-driven-development-d16fd216d45c) by Jan Olbrich
- [Isn’t TDD twice the work? Why should you care?](https://hackernoon.com/test-driven-development-with-alexa-sdk-777f6b5e5486) by Navdeep Singh

# Preparation

Here are a few thing you might want to have set up or installed before getting started:
- [Amazon Web Service](https://aws.amazon.com/) account (a free one will work just fine)
- [node.js](https://nodejs.org/en/) (personally though, I prefer installing and maintaining it through [nvm](https://github.com/creationix/nvm))
- Text editor of your choice

# Setting up

1. Create a new project folder (`mkdir project-name`)
2. Navigate into that new folder (`cd project-name`)
3. Initialize npm (`npm init`)
4. Follow through everything as you prefer (if you don’t know what it is, just press enter and it’ll keep the default) except for test command:, put in node test/testflow.js instead. The command line should look something like the snippet below.

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.
See `npm help json` for definitive documentation on these fields
and exactly what they do.
Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.
Press ^C at any time to quit.
package name: (emptyproject) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: node test/testflow.js
git repository: 
keywords: 
author: 
license: (ISC)
```

Now you have node.js setup for the project.

Unit testing
Shout out to [robmccauley](https://twitter.com/robmccauley) for maintaining [testflow](https://github.com/robm26/testflow) that provides unit testing for Alexa skills. Here’s what the following commands will do :

- Clone testflow repository into your project at the ‘test’ folder. (If this project is also a git project itself, I recommend doing `git submodule add` instead of `git clone`.)
- Create a folder named ‘dialogs’
- Create a file named ‘default.txt’ in the ‘dialog’ folder
- Edit the ‘SourceCodeFile’ line in the cloned ‘testflow’ repository to point to the ‘index.js’ in the base level of the folder (feel free to edit it to your personal preference).

```sh
git clone git@github.com:robm26/testflow.git test
mkdir dialogs
touch dialogs/default.txt
sed -i '9c const SourceCodeFile = "../index.js"' test/testflow.js
```

Inside the ‘default.txt’ file in the ‘dialogs’ folder, you should have the intents you are trying to test. The default in the testflow repository consist of the followings but you should definitely add some more customized ones to it depending on what you are trying to do in your skill.

```
LaunchRequest
AMAZON.HelpIntent
AMAZON.StopIntent
```

In case where you are taking in variables through utterances, you can do something like this :

```
DoSomething Input1=userInput1 Input2=userInput2
```

To get a deeper understanding into using testflow, I recommend looking into its [tutorial page](https://github.com/robm26/testflow/blob/master/tutorial/TUTORIAL.md) and the [blog post](https://developer.amazon.com/blogs/alexa/post/35eb8ae8-2cd8-4de7-86c5-97a1abc239b9/testflow-simulate-conversations-with-your-alexa-skill-code-to-ease-debugging) by the author himself.

# Developing the skill

To be honest, I don’t have too much to talk about on this topic. Here is some sample code of how a sample skill can look like. (Also remember to do `npm install --save alexa-sdk`.)

```js
var Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to the sample skill. Say help for help.')
  },
  
  'Intent1': function () {
    this.emit(':ask', 'This is the first intent.')
  },
  
  'Intent2': function () {
    var input1 = this.event.request.intent.slots.InputOne.value.toString()
    var input2 = this.event.request.intent.slots.InputTwo.value.toString()
    var response = doSomething(input1, input2)
    this.emit(':ask', response)
  },

  'AMAZON.HelpIntent': function () {
    this.emit(':ask', 'Insert some help message here.')
  },

  'AMAZON.StopIntent': function () {
    this.emit(':tell', 'Have a good rest of your day!')
  }
}

function doSomething (input1, input2) {
  if (input1.localeCompare(input2)) {
    return "They are the same string!"
  } else {
    return "They are different!"
  }
}
```

I recommend looking into the official [Alexa GitHub repository](https://github.com/alexa/alexa-cookbook) that provides all kinds of sample skills that you can work on top of.

# Deployment

## Alexa Skill Kit

Go to [this page](https://developer.amazon.com/alexa/console/) and select ‘Create Skill’. In there you should see options to ‘add intents’ and ‘custom slot types’. You should add the appropriate slot types and intents accordingly from above. After you are done with that, select ‘Endpoint’ from the side bar and select ‘AWS Lambda ARN’ as the skill’s service endpoint. Make a copy of the Skill ID as you will need it later.

## AWS Lambda

Create an AWS Lambda function selecting ‘from scratch’. After that, you should have an option to ‘add trigger’ where you would select ‘Alexa Skills Kit’. Now in the configuration dialog, you should put in the Skill ID you took a copy of previously then select ‘Add’.

After this, select back to the box that labeled your project name. There should be a ‘Function code’ dialog box appeared below. While you can definitely copy and paste your code onto the online text editor, there might be chance where the packages you have installed and used in your code is included by default. It is also possible that you have more than 1 JavaScript files for the skill.

In this case, you would select ‘Upload a .ZIP file’ under ‘Code entry type’. Locally, zip up all the JavaScript files along with the `node_modules` folder then upload the resulting zip file.

## Submission

When you are done, you can go back to the Alexa Skill Kit page, select the ‘Distribution’ tab and fill out the appropriate information before submitting your skill for review. Hopefully everything goes well and your skill gets published at the Alexa Skill Store!

---

## Credits
- [Build Skills with the Alexa Skills Kit](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html)
- [TestFlow: Simulate Conversations with Your Alexa Skill Code to Ease Debugging](https://developer.amazon.com/blogs/alexa/post/35eb8ae8-2cd8-4de7-86c5-97a1abc239b9/testflow-simulate-conversations-with-your-alexa-skill-code-to-ease-debugging)

> _This article was originally published on [Hackernoon](https://hackernoon.com/test-driven-development-with-alexa-sdk-777f6b5e5486)._