const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const preMiddleware = require('./middlewares/preMiddleware');
const passportMiddleware = require('./middlewares/passportMiddleware');
const initDB = require('./config/db');
const routes = require('./routes/user');


preMiddleware(app);
passportMiddleware(app);

//@DESC: Calls Passport Session
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
// }));



//moved userSchema-Model-Plugin

// const dashboardRouter = require('./routes/dashboard');
// const Client = require('./model/user.model');

// //Passport Strategy
// passport.use(Client.createStrategy());
// passport.serializeUser(Client.serializeUser());
// passport.deserializeUser(Client.deserializeUser());

//Route Middleware to Router engine
app.use('/', routes);



//DATBASE & PORT
initDB();
const port = (process.env.PORT || 3000);
app.listen(port, ()=> console.log(`::: Server listening on Port ${port}. Open via http://localhost:${port}/`))