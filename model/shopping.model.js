const mongoose = require('mongoose');
const shortid = require('shortid');
const passportLocalMongoose = require('passport-local-mongoose');


//schema and model for list items
const shoppingSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    userid: String,
    name: {type: String, trim: true},
});

const Errand = mongoose.model('Item', shoppingSchema);


module.exports = Errand;