const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.set('view engine', 'ejs');

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


//@DESC: POST route
router.route('/register')
    .post((req,res)=>{
    const{username, password} = req.body;

    Client.register({username:username}, password)
        .then(user => {
            passport.authenticate('local')(req,res, function(){
                //redirect to order Page when save is successful
                res.redirect('/dashboard')
            });
        })
        .catch(err=>{
            res.redirect('/register'),
            console.log("Error: " + err);
        });

});

router.route('/login')
    .post((req,res)=>{

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


//@DESC: POST Request from dashboard form
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
        })
});

module.exports = router;