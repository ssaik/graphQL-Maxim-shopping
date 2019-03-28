const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'EventModel'        //Which should match the "module.exports = mongoose.model('Event',eventSchema);" in event.js
        }
    ]
});

module.exports = mongoose.model('UserModel', userSchema);