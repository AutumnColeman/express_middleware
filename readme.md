#Express Middleware exercises

##Logging middleware

Write an express middleware that will print (console.log) out the request method and the request path of all requests in the app, and delegate to the regular route handler.

##Logging middleware 2

Write an express middleware that will log the same information as above, but in a log file. You may choose to write this using the fs calls, or a the morgan npm module.

##User Authentication

Implement user authentication for the Markdown Document API you implemented yesterday. Instead of using a database, you can just store everything in memory - but this means the tokens may be lost when your server is restarted.

The authentication will work the same way as the E-Commerce app. A first login request to POST /api/login will cause the backend to generate a new random token, which will be returned to the client (we'll just use Postman again). You will then retain the token, and use the token in the query string (we can just use a query parameter token across the board for simplicity) of subsequent requests.

All APIs other than the login API /api/login will require authentication - which means checking to see if the passed in token is the correct token associated with the user. To eliminate duplicate code used for this verification, you will write an authentication middleware.

For this exercise, instead of storing the users in a database, just hardcode the username and password for each user in your code. You can use a JavaScript object to associate usernames with their randomly generated auth tokens.
