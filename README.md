#COGSS 2.0

#What is COGSS
COGSS stands for Collegiate Online Gymnastics Scoring System. It will be a web app that makes scoring meets as easy as
inputing scores. The site manages the rest for you, making it very easy to host a meet of any size.

## Tasks
This kanban board is open to the public to see, because I need a lot of help with Node JS and Angular. This project
needs to be completed by the end of February.
[Trello Task List](https://trello.com/b/gnepwnBb)

## Internal API
|HTTP|URI|Purpose|
|----|---|-------|
|GET|/heartbeat|Check to see if the server is online|
|GET|/meets|Get a list of meets that are public or you have access to|
|POST|/meets|Create a new meet (Required: name, loco, date)|
|GET|/meets/{meetId}|Get the meet info and teams attending a certain meet|
|PUT|/meets/{meetId}|Updates a meet's data|
|GET|/teams/{teamId}|Get the gymansts on a team|
|POST|/teams|Create a new team (Required: meetId, name, email)|
|PUT|/teams/{teamId}|Update a team's data|
|GET|/gymnasts/{meetId}/women|Get womens scores for a meet|
|GET|/gymnasts/{meetId}/men|Get mens scores for a meet|
|POST|/gymnasts|Create a new gymnast (Required: teamId, meetID, first name, last name, gender)|
|PUT|/gymnasts/{gymnastId}|Update a gymnast|
|GET|/users|Get a list of all user's IDs and emails on the website|
|GET|/users/{meetID}|Users with access to a meet|
|POST|/users|Add a new user (Required: email, password)|
|PUT|/users/{userId}|Update a user|