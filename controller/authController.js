/**
 * @file: Controller Class that handles authorization and authentication
 * @action POST Requests to routes
 */ 

const mongoose = require('mongoose');

// DB models are brought in
const Client = require('../model/user.model');
const Errand = require('../model/shopping.model');


class authController {

   async login(req, res){
      
   }

   logout(req, res){

   }

   authenticate(req, res){

   }

   authorize(req, res){

   }

}

module.exports = new authController();