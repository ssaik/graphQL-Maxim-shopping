const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const events = [];

app.use(bodyParser.json());

//rootURL, request
app.use('/graphql',graphqlHttp({
    schema: buildSchema(`

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
    
        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {                     //name should match with Line 14
            // return ['Romantic Cooking', 'Sailing', 'All Night Coding'];     //Data, picks by events
            return events;
        },
        createEvent: (args) => {            //Name should match with Line 18
            // const eventName = args.nameX;   //it nameX should match the arg of createEvent lint 18
            // return eventName;
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            events.push(event);
            return event;
        }
    },
    graphiql: true  //gets UI
}));

mongoose.connect(`mongodb+srv://saikiran:mejoEZJCMM2o3t6c@ssaikgraphqlcluster-rnku5.mongodb.net/test?retryWrites=true`)
                .then(() => {
                    app.listen(4001);
                })
                .catch(err => {
                    console.log(err);
                });

app.listen(4000);

//Start the server by `npm start`
//==> Now goto localhost:4000/
//To Verify the server is working or not.