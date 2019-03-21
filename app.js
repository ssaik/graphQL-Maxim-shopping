const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

//rootURL, request
app.use('/graphql',graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(nameX: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {                     //name should match with Line 14
            return ['Romantic Cooking', 'Sailing', 'All Night Coding'];     //Data, picks by events
        },
        createEvent: (args) => {            //Name should match with Line 18
            const eventName = args.nameX;   //it nameX should match the arg of createEvent lint 18
            return eventName;
        }
    },
    graphiql: true  //gets UI
}));

app.listen(4000);

//Start the server by `npm start`
//==> Now goto localhost:4000/
//To Verify the server is working or not.