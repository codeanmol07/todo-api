Todo API

A simple REST API for managing a todo list, built while learning backend development with Node.js, Express, and SQLite.
This was my first project working with REST APIs and a real database, plus my first time using Git and GitHub properly. The API lets you create, read, update, and delete todos, and the data actually persists in a SQLite database file instead of disappearing every time the server restarts.

What it does

-Add new todos
-View all todos, or just one by its id
-Update a todo (mark it done, change the task text)
-Delete a todo

Tech used

Node.js + Express for the server and routes
better-sqlite3 for the database
Postman for testing the API while building it

Running it locally

Clone the repo, then run npm install, then node index.js. The server runs at http://localhost:3000.

Routes

MethodRouteWhat it doesGET/Welcome messageGET/todosGet all todosGET/todos/:idGet one todo by idPOST/todosCreate a new todo (send { "task": "..." })PUT/todos/:idUpdate a todo's task or done statusDELETE/todos/:idDelete a todo

What I learned

This was a good first project for understanding how the pieces fit together — routes, request/response cycles, reading/writing to a database, and the git workflow (commit, push, the occasional "why isn't this working" debugging session). Still figuring a lot of this out, but it works.
