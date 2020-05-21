const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

//requiring the Shopping Scheme
//const Client = require('../model/user.model');
const Errand = require('../model/shopping.model');


router.route('/')
    .get((req,res)=>{
    if(req.isAuthenticated()){
       const currentUserID = req.user._id;
       //console.log(currentUserID)
        //get all of the items in the list
        Errand.find()
        .then(items =>{
            //new array of items that are only created by each user
            let userItems = items.filter(item => currentUserID === item.userid );
            //renders dashboard and specific array of items per user
            res.render('dashboard', {username: req.user, shoppingList: userItems});
        })
        .catch(err=> console.log(`Error: ${err}`))
    }else{
        res.redirect('/login');
    }
});

module.exports = router;