/**
*  @file: Handles business logic for UserRequest controller
*  @require : User model, controller file
*
*/

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtExpress = require('express-jwt');
const User = require('../model/user.model'); //db model
const Errand = require('../model/shopping.model'); //new item
const customErr = require('../utils/customError'); // custom Error handler

class userService {
   
   async register(data){
      if(await User.findOne({email: data.email})){ 
         throw new customErr ('Email already exists', 400)
      }

      const user = new User(data);
      await user.save();

      return{
         
      }

      
   }
}


module.exports = new userService();