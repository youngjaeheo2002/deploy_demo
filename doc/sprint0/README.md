# CSCC01 Project - Limeade / GoGo

## Introduction

This project will be a web-based version of the GoGo app, which aims to allow users to find other people to attend events with.

Here is a [link to the user interface mockup on Figma](https://www.figma.com/proto/VxVHNaAY7aCgBv1k8hdqUR/UX-Mockup?type=design&node-id=9-3&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=9%3A3) that shows how the interface of the app is expected to flow.

## Motivation

The motivation behind the project is to let people be able to experience events that they may not want to go to alone, and also allow businesses to create experiences out of their events that can be promoted.

## Installation

0. Make sure you have Node.js, npm, Angular CLI, MongoDB installed as per the online documentation.

1. Open a terminal window and run the following commands to clone the repository:

```shell
$ git clone https://github.com/CSCC012023/final-project-s23-limeade.git
$ cd [into created directory]
```

2. Run the following commands to start the backend server:

```shell
$ cd backend

$ npm install
```

Then create a `.env` file exactly like the `.env.example`.

```shell
$ node server.js
```

3. Open a new terminal window and run the following commands to configure the frontend:

```shell
$ cd frontend

$ npm install

$ ng generate environments
```

Then edit `./src/environments/environment.development.ts` just like the example file `./src/environments/environment.development.ts.example`

Run the following command to start the frontend:

```shell
$ ng serve
```

Then the app should be ready to go on http://localhost:4200!

## Contribution

The contribution will be based on git flow.

Branches will be named based on their feature name/Jira issue.

We will use Jira for tracking issues and user stories.

We will use pull requests on GitHub that will be reviewed by other team members.
