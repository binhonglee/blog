---
layout: post
title: RESTful API with Spark Kotlin
subtitle: "The not-so-mainstream way of building an API"
feature-img: "assets/img/sparkcover.jpeg"
thumbnail: "assets/img/sparkcover.jpeg"
tags: [RESTful API, Kotlin, Spark Kotlin, API]
excerpt_separator: <!--more-->
---

When speaking of building a backend API, the most common tools is either Spring Boot for Java or ExpressJS for JavaScript. Even for Kotlin, Spring Boot and JetBrain’s own ktor is the usual option to go with. But today I’ll explore into the less popular option of spark-kotlin.
<!--more-->

_Disclaimer : I am not in anyway affiliated nor do I work at the project. I just simply stumbled upon it and started using it when working on a side project. (coming soon™)_

## Understanding REST

If you already know or built a RESTful API, you can skip this part. There are already quite a few [guides](http://www.looah.com/source/view/2284) out there that goes into the specifics of what REST is and all the amazing things about it. So instead, I’ll just cover the basics (more like, that’s all I know about it). It’s the standard way of communication on the internet through HTTP. In the world of internet, the frontend web interface needs a way to communicate with the backend. While the frontend can say all kinds of things, they still need to declare a set of standard ‘phrases’ between them so the backend knows what the frontend is asking for.

## Setting up

Here are a few thing you might want to have installed before getting started:

- Maven / Gradle
- Kotlin
- Java? (not too sure but you’ll probably need it)
- (optional) IntelliJ

## Getting started

According to the [official GitHub repo of spark-kotlin](https://github.com/perwendel/spark-kotlin), here are the following things to include to use it for either Maven or Gradle. Personally, I’m using Gradle for this simply because I’ve never used it outside of Android Development. (Also, its the new sexy thing. Kinda?)

```xml
<dependency>
    <groupId>com.sparkjava</groupId>
    <artifactId>spark-kotlin</artifactId>
    <version>1.0.0-alpha</version>
</dependency>
```

```groovy
dependencies {
    ...
    compile "com.sparkjava:spark-kotlin:1.0.0-alpha"
    ...
}
```

## The basics

This is what attracted me to use it over spring-boot. It just looks so much easier and straightforward comparatively. Admittedly, I’ve never used spring-boot for server development so I could be totally wrong especially if/when it comes down to a large scale application.

### GET request

```kotlin
import spark.kotlin.*

fun main(args:Array<String>) {
    get("/") {
        "Welcome to website abc."
    }
}
```

That’s it! I could’ve just ended the article here and you can pretty much figure out the rest on your own. But yea, let’s explore into a few more interesting features.

### POST request

```kotlin
import spark.kotlin.*

fun main(args:Array<String>) {
    post("/checkExist") {
        checkItem(request.body())
    }
}

fun checkItem(input:String): String {
    return if(exists) "Exists." else "Does not exist."
}

fun exist(input:String): Boolean {
    //Some check to make sure given string exist
}
```

For POST request, they work as easily too! All you need to know is that the request body can be retrieved with `request.body()`.

## More fun stuff

### redirect(), params()

Now, what if you want to have the same output for separate links? Well, you can just do `redirect("/path")`. You can also get information from the URL through `params(":path")` tag. Something like this…

```kotlin
import spark.kotlin.*

fun main(args:Array<String>) {
    post("/checkExist") {
        redirect("/checkExist/" + request.body())
    }

    get("/checkExist/:id") {
        checkItem(params(":id"))
    }
}

fun checkItem(input:String): String {
    if (exist(input)) {
        return "Exist."
    } else {
        return "Does not exist."
    }
}

fun exist(input:String): Boolean {
    //Some check to make sure given string exist
}
```

### Instance API

You can also have a separate instance API that is running on a different port or with a different setting than the static API simply by declaring it as a separate variable.

```kotlin
import spark.kotlin.*

fun main(args:Array<String>) {
    val http = ignite {
        port = 4567
        ipAddress = "0.0.0.0"
    }

    http.get("/") {
        "Welcome to website abc."
    }

    http.get("/404") {
        status(404)
        "Page does not exist."
    }
}
```

Of course, there are a lot of more advanced features (such as session, uri, etc.) that I did not cover. Feel free to explore them on your own following the [README of the repo](https://github.com/perwendel/spark-kotlin/blob/master/README.md).

---

From here on out, I’m including some relevant but not exactly spark-kotlin stuff on it.

## Dealing with JSON

In many (or most) occasions, both requests and responses will be in JSON format. Here’s where Google's [Gson library](https://github.com/google/gson) comes in handy. It is really easy to use and had a wide range of support. I put together a simple example below to show how it is and can be used.

```kotlin
import com.google.gson.GsonBuilder

fun main(args:Array<String>) {
    // Some codes
    val json: String = "{\"id\": 32151986,\"info\": \"someWords\"}"

    // Creating the item from JSON
    val newItem: Item = GsonBuilder().create().fromJson(json, Item::class.java)

    // Creating JSON string from item
    print(GsonBuilder().setPrettyPrinting().create().toJson(newItem))
}

data class Item (val id: Long, val info: String)
```

## Unit testing

It took me a while to find a testing library that works as easily as I wished. This is a test library made specifically for the spark framework by [Despegar](https://www.despegar.com/) called [spark-test](https://github.com/despegar/spark-test).

```kotlin
import com.despegar.http.client.*
import com.despegar.sparkjava.test.SparkServer
import spark.servlet.SparkApplication

class YourTest: SparkApplication {
    override fun init() {
        main(arrayOf())
    }
}
var testServer: SparkServer<YourTest> = SparkServer(YourTest::class.java, 4567)

class Tests {
    @Test
    fun getTest() {
        var get: GetMethod = testServer.get("/", false)
        var httpResponse = testServer.execute(get)
        assertEquals(httpResponse.code(), 200)
        assertEquals(String(httpResponse.body()), "Welcome to website abc.")
        get = testServer.get("/404", false)
        httpResponse = testServer.execute(get)
        assertEquals(httpResponse.code(), 404)
    }

    @Test
    fun checkExistTest() {
        val post: PostMethod = testServer.post("/checkExist", "someInput", true)
        val httpResponse = testServer.execute(post)
        assertEquals(httpResponse.code(), 200)
        assertEquals(String(httpResponse.body()), "Exist.") // or "Does not exist."
    }
}
```

A few things to keep in mind though:

- This is a Java library made for [spark-java](https://github.com/perwendel/spark) instead of [spark-kotlin](https://github.com/perwendel/spark-kotlin)
- The server needs to be running on the background (in my case, on port 4567) for this to work
- Unable to attach a request body for DELETE request

_Note: As mentioned at the time of writing, the DELETE request is unable to attach any kind of request body to it making it hard to test your DELETE request. Personally, I use different URL each feature so I just redirect a POST request from the same url to the DELETE request and test it through the POST request instead. Not ideal, but it works for now._

---

## About me

I currently work at Apple Inc. on the role of Siri Language Engineer as an Independent Contractor through AdvantisGlobal. I spend a lot of my free time experimenting and building new things with technologies I find fun and interesting. Follow my exploration journey here or on [GitHub](https://github.com/binhonglee).

---

## References

- [Kotlin WebApp Tutorial](https://medium.com/@codemwnci/kotlin-webapp-tutorial-todolist-part-1-c544b9a70f29) by Wayne Ellis
- [Build REST Service with Kotlin, Spark Java and Requery](https://medium.com/@v.souhrada/build-rest-service-with-kotlin-spark-java-and-requery-part-1-1798844fdf04) by Vaclav Souhrada

> _This article was originally published on [Hacker Noon](https://hackernoon.com/restful-api-with-spark-kotlin-f43bd57affc4)._