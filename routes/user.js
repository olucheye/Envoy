const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const Client = require('../model/user.model');
const Errand = require('../model/shopping.model');

//@DESC: Route calls
router.route('/')
    .get((req,res)=>{
    res.render('landing');
});

router.route('/register')
    .get((req,res)=>{
    res.render('register');
});

router.route('/login')
    .get((req,res)=>{
    res.render('login');
});

router.route('/logout')
    .get((req,res) =>{
        //delay the process by 2secs
        req.logout();
        setTimeout(() => {
            res.redirect('/');
        }, 2000);
        
    });


//@DESC: =============== POST ROUTE ===================
//@desc: Registers a new user
router.route('/register')
    .post((req,res)=>{
    const{username, password} = req.body;

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

});


//@desc: Logins a registered user
router.route('/login')
    .post((req,res)=>{

        //define user and credentials to be passed into passport function
        const user = new Client({
            username: req.body.username,
            password: req.body.password
        });

        //implement findOne and if available pass req.login
        req.login(user, function(err){
            if(err){
                res.redirect('/login'),
                console.log("Error: " + err);
            }else{
                passport.authenticate('local')(req,res, function(){
                res.redirect('/dashboard')
                });
            }
        });
    });


//@desc: Adds a new item to the Client's wishlist
router.route('/addItem')
    .post((req,res)=>{

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
    });

module.exports = router;