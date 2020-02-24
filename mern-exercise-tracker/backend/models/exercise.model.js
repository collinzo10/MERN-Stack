const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: String,required: true,},
    description: { type: String, required: true },
    duration: {type: Number, required: true },
    date: {type: Date, required: true },

},{
    timestamps: true,   //for when it was created and modified

});
// add the API endpoint route so the server can be use to perform the CRUD operations

const User = mongoose.model('Exercise',exerciseSchema);

module.exports = User;