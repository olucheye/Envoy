const mongoose = require('mongoose');
const shortid = require('shortid');

//schema and model for list items
const shoppingSchema = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    userid: String,
    name: {type: String, trim: true},
});

//exporting items from model
module.exports = mongoose.model('Item', shoppingSchema);