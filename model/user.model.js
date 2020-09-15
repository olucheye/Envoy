const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //used to encrypt password
const saltRounds = 10;


//@DESC: DB SCHEMA
const clientSchema = new mongoose.Schema({
   username: {
      type: String, 
      trim: true,
      unique: true,
      required: [true, "Please provide a username"]
   },
   hashedPassword: {
      type: String, 
      trim: true,
   },
   email: {
      type: String,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'], 
      trim: true,
      unique: true,
      required: [true, "Email already exists"]
   },
   address: {
      type: String,
   }
},
{timestamps: true});


/**
 * @action Pre-Save hook to hash password before saving
 */
clientSchema.pre('save', async function(next){
   this.hashedPassword = await this.encryptPassword(this.password.trim());
   next();
});

/**
 * @action Schema methods
 * @methods 
 *    - encryptPassword
 *    - genSalt
 *    -authPassword
 */
clientSchema.methods = {
   //encryptPassword Method returns password hash using bcrypt
   encryptPassword: async function(password){
      if(!password) return '';

      const salt = this.genSalt();
      return hash = await bcrypt.hash(password, salt)
   },

   genSalt: async function(){
      return await bcrypt.genSalt(10);
   },

   // authenticates each user password on login
   authPassword: async function(password){
      //response is Boolean
      return await bcrypt.compare(password, this.hashedPassword);
   }
}

//DB model export 
module.exports = mongoose.model("Client", clientSchema);