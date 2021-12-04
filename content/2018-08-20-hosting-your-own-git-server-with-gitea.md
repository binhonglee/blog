---
title: Hosting your own Git server with Gitea
subtitle: "Having additional backups are never a bad idea"
date: 2018-08-20 00:00:00 -0800 GMT
thumbnail: "img/gitea.png"
tags: [Git, Gitea, Continuous Integration, Self Hosted, DevOps]
aliases:
    - /2018/08/20/hosting-your-own-git-server-with-gitea.html
---

Most people (including myself) host their personal projects on a third-party free Git hosting websites like GitHub, GitLab, Bitbucket etc. While that is sufficient for most people, it is also pretty fun to have your own Git service hosted on your own domain name of choice. While I trust my fellow engineers at these companies, I am using this as a personally backup to those services if anything goes wrong ([like GitLab](https://about.gitlab.com/2017/02/01/gitlab-dot-com-database-incident/). Though to their credit, they were able to [recover most of it](https://about.gitlab.com/2017/02/10/postmortem-of-database-outage-of-january-31/)).

## Requirements

There really isn't much requirements except for a working machine and a proper working network. Preferably, you would be hosting this on a Virtual Private Server (DigitalOcean, Vultr, Linode etc.). However, you can also mess around with it on your own machine (it takes and requires very little resources by itself) or even host it at home on a Raspberry Pi!

## Installation

_Referenced from [Gitea's own documentation](https://docs.gitea.io/en-us/install-from-binary/)_

While there is a Gitea package in Debian's contrib (which most popular Linux OS such as Ubuntu and Mint based itself on), it doesn't seem it was maintained by the Gitea folks themselves so I wouldn't advice using it. Instead, the instructions below will provide an easy way to just download and run it with binary.

## Database

You'll need a database to maintain all the information of user accounts and such. Gitea comes with support for SQLite, MySQL and PostgreSQL out of the box so you can pick either of those that you are familiar with to go with. Personally I picked PostgreSQL as I've always wanted to learn how to mess with one.
In your choice of database, you should create a user (preferably only specifically for the use of Gitea) and a database for Gitea. You will need to fill out these credentials later when setting up Gitea.

## Gitea

As Gitea calls itself 'a painless self-hosted Git service', the setup is indeed very straightforward. Simply download and run it depending on they way you want to do it.

```sh
wget -O gitea https://dl.gitea.io/gitea/1.5.0/gitea-1.5.0-linux-amd64
chmod +x gitea
```

_Optionally_, you can also verify the GPG signature of the downloaded file with Gitea's [GPG key](https://pgp.mit.edu/pks/lookup?op=vindex&fingerprint=on&search=0x2D9AE806EC1592E2) for security purposes before running it.

```sh
gpg --keyserver pgp.mit.edu --recv 0x2D9AE806EC1592E2
gpg --verify gitea-1.5.0-linux-amd64.asc gitea-1.5.0-linux-amd64
```

To run Gitea, it is as simple as the following…

```sh
./gitea web
```

By default, it will be running on port::3000 of the device IP (http://localhost:3000/). In case you prefer running Gitea from source, they also have [specific documentations](https://docs.gitea.io/en-us/install-from-source/) for that. I had a lot of troubles trying to set it up myself so YMMV.

## Load Balancer (Optional)

_Referenced from [Gitea's own documentation](https://docs.gitea.io/en-us/reverse-proxies/)_

If you are running this on a remote server (especially if you are also hosting a bunch of other stuffs), you will need to use a load balance (like Apache HTTPD or NGINX) to forward a specific domain to the port. Append your configuration file with the following as you see fit.

#### Apache HTTPD

```apache
<VirtualHost *:80>
    ProxyPreserveHost On
    ProxyRequests off
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

#### NGINX

```nginx
server {
    listen 80;
    server_name git.example.com;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

## Configuration

Open your browser and navigate to the wherever Gitea was hosted. In there, you will be filling out the database settings as you have configured above (for PostgreSQL, it should be on `127.0.0.1:5432`, not sure about the others).

Few things to look out for:
- `Domain / Application URL` - This is important to be set up properly as they are used for SSH and HTTPS connection when it comes to cloning and pushing.
- `Disable Self-registration` - Considering that you are probably setting this up only for your own use, you should select this option so random people wouldn't just sign up and host projects on your server.
- `Admin username and password` - Since you have disabled self registration, you should then set this up in here and use it as your primary account. If you are concerned about security, you can also use the admin account to setup a day-to-day use account so in case the day-to-day account is compromised, you still retain full control of the server through your admin account.

## Usage

For the most part, I'm using this as a backup to my projects hosted on GitHub and GitLab (project pages is an amazing feature) so ideally, I am mirroring most (if not all) of my projects. As part of being a mirrored repository, Gitea will periodically check the source repository for updates so you don't have to manually sync them. That said, I have quite a few projects that I moved away from mirroring and I'll talk about why below.

## Maintenance

In case where your VPS (or Raspberry Pi) might restart constantly or so, it might be a chore to always manually start the service every time it is restarted. You should then consider configuring Gitea to run as a service ([Ubuntu](https://docs.gitea.io/en-us/linux-service/), [Windows](https://docs.gitea.io/en-us/windows-service/)).

---

## Drone.io

When talking about the topic of Git, its hard to stay away from CI. It is such a great idea of automation that saves so much pain and problem especially if it is a huge project that takes a lot of resources and hard to run the tests locally. Here, I'll talk about [drone.io](https://drone.io) which can also be self-hosted along with your Gitea server.

## Requirements

You will need to have [docker](https://www.docker.com/) installed in your machine as drone as a whole relies quite a bit on docker to work. The machine where drone is hosted will also require quite a bit of memory and processing power as running CI can be quite a chore for servers.

## Installation

_Referenced from [drone's own documentation](http://docs.drone.io/installation/)_

First, get the docker image for drone.

```sh
docker pull drone/drone:0.8
```

Next, create a file named `docker-compose.yaml` and fill in the following.

```yaml
version: '2'

services:
  drone-server:
    image: drone/drone:0.8

    ports:
      - 8000:8000
      - 9000:9000
    volumes:
      - /var/lib/drone:/var/lib/drone/
    restart: always
    environment:
      - DRONE_OPEN=true
      - DRONE_HOST=http://drone.example.com
      - DRONE_GITEA=true
      - DRONE_GITEA_URL=http://git.example.com
      - DRONE_SECRET=${DRONE_SECRET}

  drone-agent:
    image: drone/agent:0.8

    command: agent
    restart: always
    depends_on:
      - drone-server
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_SERVER=drone-server:9000
      - DRONE_SECRET=${DRONE_SECRET}
      - DRONE_DATABASE_DRIVER:postgres
      - DRONE_DATABASE_DATASOURCE:postgres://root:password@1.2.3.4:5432/postgres?sslmode=disable
```

Few things to keep in mind in the file above:

- `DRONE_SECRET` - This is a secret string of your choice used for authentication purpose.
- `DRONE_HOST` - URL where this drone server is hosted.
- `DRONE_GITEA_URL` - Link to your Gitea server location (it can also be `http://localhost:3000/` link)
- `DRONE_DATABASE_DRIVER` - Database setup is __optional__. In their [documentation](http://docs.drone.io/database-settings/), they mention the setup process of MySQL and PostgreSQL. Though do note that their documentation doesn't seems to be accurate at least [from my experience](https://github.com/drone/docs/pull/360) setting it up.

In the same directory run the following and drone will be running on `http://localhost:8000/`.

```sh
docker-compose up
```

## Load Balancer (Optional)

Similarly, if this is hosted on a remote server, you will have to add the following with the load balancer of your choice.

#### Apache HTTPD

````apache
<VirtualHost *:80>
    ProxyPreserveHost On

    RequestHeader set X-Forwarded-Proto "https"
    ProxyPass / http://127.0.0.1:8000/
    ProxyPassReverse / http://127.0.0.1:8000/
</VirtualHost>
````

#### NGINX

```nginx
server {
    listen 80;
    server_name drone.example.com;
    location / {
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;

        proxy_pass http://127.0.0.1:8000;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_buffering off;
        chunked_transfer_encoding off;
    }
}
```

## Usage

As mentioned, drone relies on docker not only for its installation but also running the CI itself. Each repository that you want to configure for drone should have to have a `.drone.yml` file like below at the top level of the repository. 

```yml
pipeline:
  build:
    image: node:${NODE_VERSION}
    commands:
      - npm install
      - npm run test

matrix:
  NODE_VERSION:
    - latest
    - "7"
    - "6"
    - "4"
```

Few things to pay attention to in the sample file:

- `image` - Drone supports any docker images available for download. You can look for available docker images at the Docker Hub.
- `matrix` - Like the scenario above, you want to test the project in multiple environments but doesn't want to retype most of the stuffs, you can use matrix as a variable to hold all the different versions you would like to run tests on.
- `commands` - This is the list of commands to run for the test to take place. You should also include installation of project dependent packages (such as `mvn install`, `npm install`, `bundle install` etc).

---

## Personal Notes

#### Mirrored Repositories

Currently from my own experimentation, adding new commits to mirrored repositories (which are read-only) that are mainly hosted elsewhere would not trigger drone to run CI. Therefore, if you were to run drone on your own server, you can either enable it directly with the origin of the repository mirror or push twice to 2 separate servers for every commit. I'm still looking for a solution for this so hopefully there's a better way than that.

#### Memory issues

Some of these instances can take quite a bit of memory spaces to run. Personally, I am hosting this on a 256MB VPS squeezing it with a bunch of other stuffs I hosts. This actually causes an issue where the tests cannot be run properly. As seen [here](https://drone.binhong.me/binhong/LibrarySystem/3/3), at the end of the `build` log, it was just abruptly 'Killed' and ended there and then with no further information. I am still working on investigating this but it is very likely due to the lack of remaining unused memory space on the VPS.

#### Static IP

In case you are hosting this on a Raspberry Pi at home for personal use, you would want to set a static IP direction on your router. This would help make sure that when in your network, you can always connect to the device through the same IP.

#### NGINX

~~I did not go deep into either of the load balancers in here as I am currently working on a separate piece that will focus more onto the configuration and use of NGINX to hosting multiple domain names and 'servers'. Keep a look out for that!~~

_You can read more about NGINX on my next post [here](http://localhost:1313/blog/2018-08-29-how-to-host-multiple-domain-names-and-projects-on-one-server/)._

---

## About me

I currently work at Apple Inc. on the role of Siri Language Engineer as an Independent Contractor through AdvantisGlobal. I spend a lot of my free time experimenting and building new things with technologies I find fun and interesting. Follow my exploration journey [here](https://binhong.me/blog) or on [GitHub](https://github.com/binhonglee).

---

## References

- [How to Setup Gitea on an Ubuntu Server](http://bryangilbert.com/post/devops/how-to-setup-gitea-ubuntu/) by [Bryan Gilbert](http://bryangilbert.com/)
- [Introduction to Gitea with Drone](https://www.slideshare.net/appleboy/introduction-to-gitea-with-drone) by [Bo-Yi Wu](https://www.slideshare.net/appleboy)

> _This article was originally published on [codeburst.io](https://codeburst.io/hosting-your-own-git-server-with-gitea-fc3298aa15ce)._
