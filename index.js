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

//@ call session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//@initialize passport and pass session in succession
app.use(passport.initialize());
app.use(passport.session());


//@DB Credentials
const mongodb = process.env.DB_URI;
mongoose.connect(mongodb, {useNewUrlParser:true,  useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('open', ()=> console.log(`Database is now connected`));

//@DESC: DB SCHEMA
const clientSchema = new mongoose.Schema({
    _id:{type: String, default: shortid.generate},
    username: {type: String, trim: true},
    //lastName: {type: String, required: true, trim: true},
    //email: {type: String, trim: true},
    password: {type: String, trim: true},
    //address: {type: String, required: true, trim: true}
});

//@plugin localMongoose right after Schema
clientSchema.plugin(passportLocalMongoose);

//@DESC: db model
const Client = mongoose.model("Client", clientSchema);

passport.use(Client.createStrategy());
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());

//@DESC: Route calls
app.get('/', (req,res)=>{
    res.render('landing');
});

app.get('/register', (req,res)=>{
    res.render('register');
});

app.get('/login', (req,res)=>{
    res.render('login');
});


//schema and model for list items
const shoppingSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    name: {type: String, trim: true},
});

const Errand = mongoose.model('Item', shoppingSchema);

//Dashboard, on load,
app.get('/dashboard', (req,res)=>{
    if(req.isAuthenticated()){
        //get all of the items in the list
        Errand.find()
        .then(items =>{
            //renders dashboard and items requested
            res.render('dashboard', {username: req.user, shoppingList: items});
            console.log(req.user);
        })
        .catch(err=> console.log(`Error: ${err}`))
    }else{
        res.redirect('/login');
    }
});

//@DESC: POST route
app.post('/register', (req,res)=>{
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

app.post("/login", (req,res)=>{

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
app.post('/addItem', (req,res)=>{

    const {newItem, userid} = req.body;

    const newRequest = new Errand({ id:userid, name:newItem})
    
    newRequest.save()
        .then(item=> {
            res.status(200);
            res.redirect('/dashboard');
        })
        .catch(err=>{
            console.log(`There was error creating the item: ${err}`)
        })
});


const port = (process.env.PORT || 3000);
app.listen(port, ()=> console.log(`Server is now running on Port ${port}`))