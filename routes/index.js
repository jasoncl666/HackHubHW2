const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Tweets = require('../models/tweets');
const User = require('../models/users');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mongoose = require('mongoose');
const passport = require('passport');

router.get('/', (req, res) => {

    console.log("Get req received!")

    res.render('index', {message: 'Welcome'});

    //res.render('index', {message: 'Welcome '+ username});
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.redirect('http://localhost:3000/account');
});

router.post('/signup', (req, res) => {

    const {username, password} = req.body;

    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: password
    });
    
    // register new user
    User.register(newUser, password, (err, user) => {

        if (err) {
            console.log(err);
        }

        // create new tweets for new user
        const newTweet = new Tweets({
            _id: new mongoose.Types.ObjectId(),
            tweet: [
                {content: "This is my first tweet!"},
                {content: "This is my second tweet!"}],
            user: newUser._id
        });

        newTweet.save((err) => {
            if (err) {
                console.log(err);
            }
            console.log("Tweet saved!");

            // update ref property of newUser to reference this tweet id 
            User.findByIdAndUpdate(newUser._id, {tweets: newTweet._id}, {new: true}, (err, doc) => {
                if(err) console.log(err);
                console.log("update successully!");
            })
        });

        // create session
        passport.authenticate('local')(req, res, () => {
            return res.redirect('http://localhost:3000/account');
        });
    });
});

router.get('/account', (req, res) => {

    const userId = req.user._id;

    console.log('User ID: ' + userId);

    // newly created tweet, then update mongoDB
    var content = req.body.tweetcontent;

    // populate to Tweets and display
    Tweets.findOne({user: userId})
    .populate('tweets')
    .exec()
    .then((doc) => {
        res.render('account', {tweets: doc});
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;