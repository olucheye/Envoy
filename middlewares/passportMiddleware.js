const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}


module.exports = (app) => {

   app.use(passport.initialize());
   app.use(passport.session());
   app.use(session(sessionOptions));

   return app;
}