FE Coding Task
FE_Challenge.md
Front-end Coding Challenge
Idea of the App
The task is to implement a small webapp that will list the most starred Github repos that were created in the last 30 days. There will also be a simple drill down feature that displays a time series graph of various metrics for the given repository. You'll be fetching the sorted JSON data directly from the Github API (Github API explained down below).

Features
As a User I should be able to list the most starred Github repos that were created in the last 1 week, 2 weeks, 1 month.
As a User I should be able to identify period of time to search for most starred repos.
As a User I should see the results as a list. One repository per row.
As a User I should be able to see for each repo/row the following details :
Repository name
Repository description
Number of stars for the repo.
Number of issues for the repo.
Username and avatar of the owner.
As a User I should be able to keep scrolling and new results should appear (pagination).
As a User I should be able to drill down into each repo and see the commit activity a weekly basis for up to a year of the most recent history of the repo
Dropdown option allows for selection for showing additions or deletions vor commits (generally "changes"), which applies to both plots
One graph for total number of changes across all contributors per week
On hover we should see the exact number of changes, along with the human readable timestamp
One graph with a multiline plot, one line for each contributor's total changes per week
On hover we see the exact number of changes, along with the human readable timestamp, contributor
A different line on the graph should be shown per contributor
A legend that allows toggle per contributor
Both plots share the same x axis but are separate vertically stacked plots.
Need human readable x axis labels for weeks by start dates, y axis for counts
Things to keep in mind 🚨
Your code will be evaluated on:

whether the techologies required are used
code structure
programming best practices
legibility
styling and appearance
responsiveness
rendering performance
How to get the data from Github
Search Repos
To get the most starred Github repos created in the last 30 days (relative to 2017-11-22), you'll need to call the following endpoint :

https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc

The JSON data from Github will be paginated (you'll receive around 100 repos per JSON page).

To get the 2nd page, you add &page=2 to the end of your API request :

https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2

To get the 3rd page, you add &page=3 ... etc

You can read more about the Github API over here.

Commit/Additions/Deletions Activity
You will need the following to get the total weekly additions/deletions activity

GET /repos/{owner}/{repo}/stats/code_frequency documentation

ex: https://api.github.com/repos/octocat/hello-world/stats/code_frequency

You will need the following to get the total weekly commits activity

GET /repos/{owner}/{repo}/stats/commit_activity documentation

ex: https://api.github.com/repos/octocat/hello-world/stats/commit_activity

You will need the folowing to get the weekly additions/deletions/commits activity per contributor

GET /repos/{owner}/{repo}/stats/contributors documentation

ex: https://api.github.com/repos/octocat/hello-world/stats/contributors

Mockup
mockup

Technologies to use
We'd like to see your implementation using the following technologies:

React (hooks)
Redux (redux-toolkit.js)
Redux Saga
MUI
It is preferred that you use

Highcharts
How to submit the challenge solution?
After you finished your app, please follow the instructions below:

Create or use an existing account on https://codesandbox.io so you can save and share your work
Create a sandbox
Email including
time spent
link to the code sandbox with all necessary dependencies and full implementation
 to join this conversation on GitHub. Already have an account? Sign in to comment
