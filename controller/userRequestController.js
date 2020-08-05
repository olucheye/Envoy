/**
 * @file: Controller Class that handles the routing web logic
 *
 * @action POST Requests to routes
 */ 

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

// DB models are brought in
const Client = require('../model/user.model');
const Errand = require('../model/shopping.model');


class userRequestController {

   async register(req, res){
      
      const{username, password} = req.body;

      let trimmedUsername = username.trim();
      let trimmedPassword = password.trim();

      //finds user and pushes error
      const alreadyRegistered =  Client.findOne({username: trimmedUsername}, (err,client)=>{
         if(!client){
               return true;
         }
      });

      let errors = [];
      //validate presence of both username & password
      if(!username || !password){
         errors.push({msg: 'Please fill in the required fields'});
      }
      //validate password length
      if(password.length < 5){
         errors.push({msg: 'Password to short'});
      }

      if(alreadyRegistered){
         errors.push({msg: `Username is taken already`})
      }

      if(errors.length > 0){
         res.render('register', {
               errors,
               username,
               password
         });
      }else{
         //@desc: Passport-local-mongoose method
         Client.register({username:username}, password)
               //handling promise response
               .then(user => {
                  passport.authenticate('local')(req,res, function(){
                     //redirect to Client dashboard when account is created
                     res.redirect('/dashboard')
                  });
               })
               .catch(err=>{
                  res.redirect('/register'),
                  console.log("Error: " + err);
               });
               
    }

   }

   async login(req, res){
      const{username, password} = req.body;

      let trimmedUsername = username.trim();
      let trimmedPassword = password.trim();

      let errors = [];
      //validate presence of both username & password
      if(!trimmedUsername || !trimmedPassword){
         errors.push({msg: 'Please fill in the required fields'});
      }
      //validate password length
      if(password.length < 5){
         errors.push({msg: 'Password to short'});
      }

      
      //finds user and pushes error
      const clientFound =  Client.findOne({username: trimmedUsername}, (err,client)=>{
         if(!client){ return errors.push({msg: `Username doesn't exisit`}) }
      });

      if(errors.length > 0){
         res.render('login', {
               errors,
               username,
               password
         });
      }else{
         //define user and credentials to be passed into passport function
         const user = new Client({
               username: req.body.username,
               password: req.body.password
         });

         req.login(user, function(err){
               if(err){
                  console.log(`first one`)
                  res.render('login')
               }else{
                  passport.authenticate('local')(req,res, function(err){
                     //redirect to Client dashboard when account is created
                     res.redirect('/dashboard')
                  });
               }
         })
      }

   }

   async newItem(req, res){
      const {newItem, userid} = req.body;
      //passing the user's specific id into the new object
      const newRequest = new Errand({ name:newItem, userid})
      newRequest.save()
         .then(item=> {
            res.status(200);
            res.redirect('/dashboard');
         })
         .catch(err=>{
            console.log(`There was error creating the item: ${err}`)
         });
   }
}

module.exports = new userRequestController()