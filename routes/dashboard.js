const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.set('view engine', 'ejs');

//requiring the Shopping Scheme
const Client = require('../model/user.model');
const Errand = require('../model/shopping.model');


router.route('/dashboard')
    .get((req,res)=>{
    if(req.isAuthenticated()){
       //const currentUserID = req.user._id;
        //get all of the items in the list
        Errand.find()
        .then(items =>{
            //renders dashboard and items requested
            res.render('dashboard', {username: req.user, shoppingList: items});
        })
        .catch(err=> console.log(`Error: ${err}`))
    }else{
        res.redirect('/login');
    }
});

module.exports = router;