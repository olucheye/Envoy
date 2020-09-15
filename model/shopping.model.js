const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const shortid = require('shortid');

//schema and model for list items
const shoppingSchema = new Schema({
   sku: {
      type: String,
      default: shortid.generate
   },
   name: {
      type: String,
      trim: true,
      required:[true, 'Item name required']
   },
   cost: {
      type: Number,
      trim: true,
      required:[true, 'Price is empty']
   },
   userid: {
      type: Schema.Types.ObjectId,
      required: true,
   }
},
{timestamps: true});

//exporting items from model
module.exports = mongoose.model('Item', shoppingSchema);