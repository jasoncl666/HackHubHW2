const express = require('express');
const index = require('./routes/index');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const Tweets = require('./models/tweets');
const User = require('./models/users');

const app = express();

//Set pug as the view engine
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Apply the modules as Application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use(express.static(path.join(__dirname, 'public')));

// setup session middleware
app.use(session({
    secret: 'webdxd',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

//Apply passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Config passport middleware
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

//Set up mongoDB connection
const mongoDB = 'mongodb+srv://jasoncl666:6306zpLIU@huckhub-9ntpi.azure.mongodb.net/hackhub';
mongoose.connect(mongoDB)
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.log(err));

const db = mongoose.connection;

app.use('/', index);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
