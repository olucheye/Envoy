const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const dotenv = require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local-mongoose');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


//@DB Credentials
const mongodb = process.env.DB_URI;
mongoose.connect(mongodb, {useNewUrlParser:true,  useUnifiedTopology: true});
const db = mongoose.connection;
db.on('open', ()=> console.log(`Database is now connected`));

//@SCHEMA
const User = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true},
    address: {type: String, required: true, trim: true}
});


app.get('/', (req,res)=>{
    res.render('landing');
});

app.get('/register', (req,res)=>{
    res.render('register');
});

app.get('/login', (req,res)=>{
    res.render('login');
});

const port = (process.env.PORT || 3000);
app.listen(port, ()=> console.log(`Server is now running on Port ${port}`))