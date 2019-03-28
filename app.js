const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');
const User = require('./models/user');

const bcrypt = require('bcryptjs'); //To create HASH for password, i.e. Encrypt password

const app = express();

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

        type User {
            _id: ID!
            email: String!
            password: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }
    
        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {                     //name should match with Line 14
            // return events;
            // Event.find({title: 'A Test'})
            return Event.find()
                .then(events => {
                    return events.map(event => {
                        // return { ...event._doc }; //here you cannot user ID, because that is saved in different format
                        return { ...event._doc, _id: event.id}; //instad add Id here and it formats by Mongoose, then you can query in Graphql
                    });
                })
                .catch(err => {
                throw err;
            });
        },
        createEvent: args => {            //Name should match with Line 18
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)
            });
            //Hits DB and saves into the DB.
            return event.save().then(res => {
                console.log(res);
                //To return/Get in Mutations
                return {...res._doc, _id: res.id};   //_doc has all the core property of the event object, i.e. metadata
            }).catch(err => {
                console.log(err);
                throw err;              //GraphQL handles and throws an error.
            });
            return event;
        },

        createUser: args => {
            return User.findOne({email: args.userInput.email}).then(user => {
                if(user) {
                    throw new Error('User Exist Already.');
                }
                return bcrypt
                .hash(args.userInput.password, 12)
            })
                .then(hashedPassword => {
                    const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(result => {
                return { ...result._doc, _id: result.id};       //To Return/Get in Mutations
                // return { ...result._doc, password: null, _id: result.id};       //To Return password as NULL after saved to DB
            })
            .catch(err => { 
                throw err;
            });
        }
    },
    graphiql: true  //gets UI
}));

//username can be set as ${process.env.MONGO_USER} same like password too. which comes from nodemon.json
// mongoose.connect(`mongodb+srv://saikiran:mejoEZJCMM2o3t6c@ssaikgraphqlcluster-rnku5.mongodb.net/test?retryWrites=true`)
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ssaikgraphqlcluster-rnku5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
                .then(() => {
                    app.listen(4000);
                })
                .catch(err => {
                    console.log(err);
                });

// app.listen(4000);

//Start the server by `npm start`
//==> Now goto localhost:4000/
//To Verify the server is working or not.