const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const shortid = require('shortid');
const dotenv = require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//@DESC: Calls Passport Session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//@DESC: initialize passport and pass session in succession
app.use(passport.initialize());
app.use(passport.session());


//@DB Credentials
const mongodb = process.env.DB_URI;
mongoose.connect(mongodb, {useNewUrlParser:true,  useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('open', ()=> console.log(`Database is now connected`));

//moved userSchema-Model-Plugin
const clientRouter = require('./routes/user');
const dashboardRouter = require('./routes/dashboard');
const Client = require('./model/user.model');

//Passport Strategy
passport.use(Client.createStrategy());
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

app.use('/', clientRouter);
app.use('/dashboard', dashboardRouter);

const port = (process.env.PORT || 3000);
app.listen(port, ()=> console.log(`Server is now running on Port ${port}`))