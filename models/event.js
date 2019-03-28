const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//2 Steps need to follow
//1 Create Schema
//2 Create model with Schema.

//It is like blueprint of Object/Metadata of object
const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }
});

module.exports = mongoose.model('EventModel',eventSchema);