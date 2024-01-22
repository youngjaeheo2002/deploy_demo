# GoGo / Limeade

> _Note:_ This document is meant to be written during (or shortly after) your initial planning meeting.  
> It does not really make sense for you to edit this document much (if at all) while working on the project - Instead, at the end of the planning phase, you can refer back to this document and decide which parts of your plan you are happy with and which parts you would like to change.

## Iteration 2

- Start date: 2023 June 28
- End date: 2023 July 7

## Process

Quick Introduction to the process

#### Changes from previous iteration

List the most significant changes you made to your process (if any).

- At most 3 items
- Start with the most significant change
- For each change, explain why you are making it and what you are hoping to achieve from it
- Ideally, for each change, you will define a clear success metric (i.e. something you can measure at the end of the iteration to determine whether the change you made was successful)

> _Note:_ If you are not making any changes to your process, it means that you are happy with all of the decisions you made in the previous iterations.
> In this case, list what you consider to be the most significant process decisions your team made. For each decision, explain why you consider it successful, and what success metric you are using (or could use) to assert that the decision is successful.

We are not doing standup every day. Instead we are doing only about 5 a sprint. This is because we realized we don’t really need to communicate with each other every single day and usually we don’t make significant changes every single day. Success for this change is just doing the standup meetings.
We are going to connect Jira to our repo and do the other Jira related changes according to the instructions for Sprint 2. This is because we are required to and we think it’s a good idea. Success for this change is completing everything according to the instructions on the Sprint 2 document.

#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.
Youngjae and Lukas - work on user profiles
Kai - implementing design on event page and work on add events
Ami - implement myEvents page component
Gary - working on documentation and jira

#### Events

Describe meetings (and other events) you are planning to have:

- When and where? In-person or online?
- What's the purpose of each meeting?
- Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.

5 online standup meetings using messages on discord

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.

- Artifacts can be To-do lists, Task boards, schedule(s), etc.
- We want to understand:
  - How do you keep track of what needs to get done?
  - How do you prioritize tasks?
  - How do tasks get assigned to team members?

Jira Board

- assigning story points and members to tasks

#### Git / GitHub workflow

Describe your Git / GitHub workflow.  
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

- Be concise, yet precise.  
  For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? Etc.

- If applicable, specify any naming conventions or standards you decide to adopt.

- Don't forget to **explain why** you chose this workflow.

We have a main branch and a development branch. During the sprint, changes should be merged to the development branch and then at the end of the sprint, the main branch should merge with the development branch. This is to protect the integrity of the main branch during sprint and while changes are still being made. Changes would be made to the development branch using pull-requests. People review pull requests and merge them by themselves. As for naming conventions we will name them after our tickets on jira as soon as we get the jira to github repo connection worked out. This is so jira can track our branches.

## Product

_This entire section is mandatory._

#### Goals and tasks

- Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
- Order the items from most to least important.
- Feel free (but not obligated) to specify some/all tasks as user stories.

---

- add a page for user profiles and related info/features
- add event details page
- add “My Events” page to user profile

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

- Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
- Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
- Be concise, yet precise.  
  For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

---

- Build an interactive website demo that can be run locally
