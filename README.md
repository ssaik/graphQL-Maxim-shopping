# graphQL-Maxim-shopping

npm init
npm install --save express body-parser

//body-parser --> json conversion

npm install --save-dev nodemon

//nodemon ==> Automatically restart the server when any file changes.

Run app:==> node app.js

update the package.json --> ``"start": "nodemon app.js"``

# ---------------------------------
2graphQLBasicSchema
This is basic syntax.

npm install --save express-graphql graphql

The following is common, like snippet.

Query:::
`query {`
`  events`
`}`

Mutations::
`mutation {`
`  createEvent(nameX: "sport")`
`}`