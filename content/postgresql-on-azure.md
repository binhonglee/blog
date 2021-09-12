---
title: PostgreSQL on Azure Pipeline with OSX
date: 2021-07-18 00:00:00 -0800 GMT
tags: [PostgreSQL, Azure Pipeline, OSX, Continuous Integration]
ss: "img/psqlss.png"
---

While the defacto way of running postgres on Azure Pipeline according to [this guide](https://devblogs.microsoft.com/devops/using-containerized-services-in-your-pipeline/) seems to be using the docker image, the MacOS image on Azure Pipeline does not have docker support due to some [licensing issue](https://github.com/actions/virtual-environments/issues/2150). So instead, this has to be setup and handled manually. We'd use brew here since it comes installed in the OS image and is the easiest way to deal with it as far as I'm aware. 

## Install (optional) 

By default postgres should already be installed in the included MacOS image but if you prefer to run it on a specific version you'd have to force reinstall the version you want just to be sure.

```yaml
steps:
...
- script: brew install postgresql@13.1
  displayName: Install PostgreSQL
...
```

## Multiple Versions (optional) 

If you'd like to test that it works with multiple versions of PostgreSQL, you can setup a version matrix for it. 

```yaml
strategy:
  matrix:
    postgresql-11-10:
      psqlVersion: '11.10'
    postgresql-13-1:
      psqlVersion: '13.1'
```

Then amend the installation part to make use of the value from the matrix. 

```yaml
steps:
...
- script: brew install postgresql@$PSQL_VERSION
  displayName: Install PostgreSQL
  env:
    PSQL_VERSION: $(psqlVersion)
...
```

## Start Service

Despite being installed by default, it doesn't run by default so you'll need to add something like this to get the service started. 

```yaml
steps:
...
- script: brew services start postgresql
  displayName: Start Postgres Service
...
```

## Set up DB

Now, let's create a database called `db_name` owned by the user called `username` with `password` as password. (You can replace each of these with whatever that works best for you / your process.) 

```yaml
steps:
...
- script: |
    psql postgres -w -c "CREATE DATABASE db_name;"
    psql postgres -w -c "CREATE ROLE username WITH SUPERUSER CREATEDB LOGIN ENCRYPTED PASSWORD 'password';"
    psql postgres -w -c "GRANT ALL PRIVILEGES ON DATABASE db_name TO username;"
  displayName: Setup Database
...
```

## Brew Optimization (optional)

At this point, postgres should already be working as intended but it's not exactly ideal considering the first `brew` call actually takes a long time since it's also trying to run update and cleanup which can take a while. Considering that running brew update and brew cleanup probably has minimal benefit on a CI, we can add the following environment variables so brew wouldn't do that.

```yaml
variables:
  HOMEBREW_NO_INSTALL_CLEANUP: 1
  HOMEBREW_NO_AUTO_UPDATE: 1
```

## OS Condition (optional)

If you're including this as part of a multi OS testing config, you can add an additional condition for each line of the commands here to make sure it doesn't run on other OS-es causing unexpected failures. Similarly, you can add its equivalent for commands specific to other OS-es. 

```yaml
steps:
...
- script: brew services start postgresql
  displayName: Start Postgres Service
  condition: eq(variables['Agent.OS'], 'Darwin')
...
```

## Full config

Finally when put together, your config likely looks something like this.

```yaml
variables:
  HOMEBREW_NO_INSTALL_CLEANUP: 1
  HOMEBREW_NO_AUTO_UPDATE: 1

pool:
  vmImage: macos-latest

strategy:
  matrix:
    postgresql-11-10:
      psqlVersion: '11.10'
    postgresql-13-1:
      psqlVersion: '13.1'

steps:
- script: brew install postgresql@$(psqlVersion)
  displayName: Install PostgreSQL
  condition: eq(variables['Agent.OS'], 'Darwin')

- script: brew services start postgresql
  displayName: Start Postgres Service
  condition: eq(variables['Agent.OS'], 'Darwin')

- script: |
    psql postgres -w -c "CREATE DATABASE db_name;"
    psql postgres -w -c "CREATE ROLE username WITH SUPERUSER CREATEDB LOGIN ENCRYPTED PASSWORD 'password';"
    psql postgres -w -c "GRANT ALL PRIVILEGES ON DATABASE db_name TO username;"
  displayName: Setup Database
  condition: eq(variables['Agent.OS'], 'Darwin')
```

Hopefully you find this article helpful!

---

## About me

I currently work at Facebook as a Software Engineer. I spend some of my free time experimenting and building new things with technologies I find fun and interesting. Follow my exploration journey [here](https://binhong.me/blog) or on [GitHub](https://github.com/binhonglee).
