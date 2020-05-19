const mongoose = require('mongoose');
const shortid = require('shortid');
const passportLocalMongoose = require('passport-local-mongoose');

//@DESC: DB SCHEMA
const clientSchema = new mongoose.Schema({
    _id:{type: String, default: shortid.generate},
    username: {type: String, trim: true},
    password: {type: String, trim: true},
});

//@plugin localMongoose right after Schema
clientSchema.plugin(passportLocalMongoose);

//@DESC: db model
const Client = mongoose.model("Client", clientSchema);

module.exports = Client;