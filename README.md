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

# --------------------------
3TypesAndData

`mutation {`
`  createEvent (eventInput: {title: "title1", description: "desc1", price: 9.97, date: "2019-03-21T04:09:08.707Z"}) {`
`    title`
`    description`
`  }`
`}`


`query {`
`  events {`
`    title`
`    price`
`  }`
`}`

# ------------------
4MangoDB

npm install --save mongoose

Mutation:
mutation {
  createEvent(eventInput: {title: "A tes2t", description: "dec", price: 9.99, date: "2019-03-26T03:38:21.774Z"}) {
    title
    _id
  }
}


Query:
query {
  events {
    _id
    title
  }
}

Install bcryptjs --> it is used to encrypt the password, to create a HASH.
`npm install --save bcryptjs`


Also added the relation...


# ----------------------------------------------------
# ----------------------------------------------------

cd frontend
npx create-react-app .
npm install --save react-router-dom

