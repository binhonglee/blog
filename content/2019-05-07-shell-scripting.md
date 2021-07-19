---
title: Functional and flexible shell scripting tricks
date: 2019-05-07 00:00:00 -0800 GMT
thumbnail: "img/shellscript.jpeg"
tags: [Programming, Scripting, Automation, Shell Script]
---

## Shell scripts vs python or perl

Its 2019 now, who writes shell scripts anymore? Am I right? Well, apparently I do. ¯\\\_(ツ)\_/¯

There are some good arguments for that [here](https://stackoverflow.com/questions/796319/strengths-of-shell-scripting-compared-to-python#796343) and [here](https://www.linuxquestions.org/questions/linux-newbie-8/what-is-the-difference-between-perl-and-shell-scripting-4175486499/) which mainly revolve around 2 things:

1. Shell exists in all Unix systems and makes use of system default features.
2. Shell is an "interactive command function" designed to get user inputs during the process of running them.

Also, [here](https://stackoverflow.com/questions/5725296/difference-between-sh-and-bash)'s an additional relevant reading about the differences between `sh` and `bash`.

## Arguments

In some occasions, you will need to pass an argument (or expect one) into the script like how you might pass a param into a function. In that case, you will use something like `$1` for the first argument, `$2` for the second. Here's an example of how it would look like:

```sh
echo "The input message was $1."
```

```sh
./run_this.sh userInput
The input message was userInput.
```

*Note: The params are separated by spaces so if you want to input a string as a param that contains a space, it might need to be something like `./run_this.sh "user input"` just so `"user input"` would be counted as `$1` entirely.*

In the occasion where you are not sure how long the user input might be and you want to capture it all, you would use `$@` instead. In the following example, I took in the entire string and print them out word by word after breaking them into a string array according to the spaces in between.

```sh
userInputs=($@)
for i in "${userInputs[@]}";; do
  echo "$i"
done
```

```sh
./run_this.sh who knows how long this can go
who
knows
how
long
this
can
go
```

## Functions

If you have done any sort of programming, you should be familiar with the concept of *functions*. It's basically a set of commands / operations that you will be repeating over and over again. Instead of repeating it multiple times in your code, you can put them into a function. Then just call the function which effectively reduces the lines of code that need to be written.

*Side note: If you don't know already, LOC is a horrible metric for any sort of measurement in terms of programming. Don't take this from me, take this from [Bill Gates](https://www.goodreads.com/quotes/536587-measuring-programming-progress-by-lines-of-code-is-like-measuring):*

> *"Measuring programming progress by lines of code is like measuring aircraft building progress by weight."*

Here's how a normal function looks like:

```sh
# Declaring the function
doSomething() {

}

# Calling the function
doSomething
```

Pretty straightforward and easy to understand. Now, here's a few differences between functions in shell scripts and a normal programming language.

### Parameters

If you were to pass a parameter / use a parameter into a function in Java, you have to declare them in the function declaration. They look something like this.

```java
public static void main(String[] args) {
    doSomething("random String");
}

private static void doSomething (String words) {
    System.out.println(words);
}
```

In the shell, however, they do not require a declaration of types or names at all. Each of them is like a separate script that lives in the script itself. If you were to use a param, just pass it in and call it like how you would do it if you were taking in input for this script at the top level. Something like this:

```sh
doSomething() {
    echo $1
}

doSomething "random String"
```

1. Similar to above, if you want to take in everything, you will use `$@` instead of `$1` since `$1` would only use the first input (and `$2` for the second etc.).
2. Functions need to be declared ahead of where they are being called. (Usually beginning of the file before any main operations.)

### Return

Let's say we create a script like below named `run_this.sh`:

```sh
doSomething() {
    echo "magic"
    return 0
}

output=`doSomething`
echo $output
```

Now let's run it and see what is being assigned to the `output` variable.

```sh
$ ./run_this.sh
magic
```

Note that instead of `0`, it shows `magic` instead. This is because when you do ``output=`doSomething` ``, it assigns the output message to `output` instead of the return value since output message is how you communicate almost anything in shell script.

So when does it make sense to use the `return` call then? When you are using it as part of an if statement. Something like this:

```sh
doSomething() {
    echo "magic"
    return 0
}

if doSomething; then
    echo "Its true!"
fi
```

```txt
$ ./run_this.sh
Its true!
```

In this case, `return 0` means `true` while `return 1` meant `false` in a traditional `boolean` sense.

## Multi-line echo

There are times when you need to print a multi-line message. There are a few ways to go around this. The easiest way is to use `echo` multiple times like this:

```sh
echo "line1"
echo "line2"
echo "line3"
```

It works but probably not the most elegant way to get around this. Instead, you can use `cat << EOF` instead. Something like this:

```sh
cat << EOF
line1
line2
line3
EOF
```

Note that there should not be anything (including spaces or tabs) before `EOF`. If you want to do it in an `if` statement, it should look something like this.

```sh
if [ "a" == "a" ]; then
  cat << EOF
line1
line2
line3
EOF
fi
```

Realize that even the messages itself are aligned to the left. This is because if you leave them tabbed, the output message shown in the command line will also be tabbed. Also, if `EOF` is tabbed, shell would complain about it and usually ends the script there.

## Flags / Options

You've probably seen some of the scripts or commands that comes with an ability to add flags (and sometimes arguments for the specific flag). Something like `git commit -a -m "Some commit message"`.

Here's a quick example of how it looks like (I've tried to be as comprehensive as possible with the example.)

```sh
while getopts ac: opt; do
    case $opt in
        a)
            echo "\"a\" was executed."
            ;;
        c)
            echo "\"c\" was executed with parameter \"$OPTARG\"."
            ;;
        \?)
            echo "Invalid option: -$opt"
            exit 1
            ;;
        :)
            echo "option -$opt requires an argument."
            exit 1
            ;;
    esac
done
```

```
$ ./run_this.sh


$ ./run_this.sh -a
"a" was executed.

$ ./run_this.sh -c
option -c requires an argument.

$ ./run_this.sh -c abcd
"c" was executed with parameter "abcd".

$ ./run_this.sh -a -c abc
"a" was executed.
"c" was executed with parameter "abc".

$ ./run_this.sh -x
Invalid option: -x
```

In the above example, the differences between option `-a` and `-c` is that in the `getopts` line, `c` has a colon (`:`) following it after therefore telling the program to expect a parameter for the option. Another thing to keep in mind is that the options need to be declared in an alphabetical way. If you declare something like `acb`, the `b` declaration would be ignored and using the `-b` flag would lead to the error message instead of the `b` case in the switch condition.

Thanks for reading!

---

## About me

I currently work at Facebook as a Software Engineer. I spend some of my free time experimenting and building new things with technologies I find fun and interesting. Follow my exploration journey [here](https://binhong.me/blog) or on [GitHub](https://github.com/binhonglee).

---

## References

- [Small getopts tutorial](http://wiki.bash-hackers.org/howto/getopts_tutorial)
- [How to output a multiline string in Bash](https://stackoverflow.com/questions/10969953/how-to-output-a-multiline-string-in-bash#10970616)

> _This article was originally published on [freeCodeCamp](https://medium.freecodecamp.org/functional-and-flexible-shell-scripting-tricks-a2d693be2dd4)._