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

        newTweet.save(function (err) {
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
            return res.redirect('http://localhost:3000/account/' + newUser._id);
        });
    })
    /*
    newUser.save(function (err) {
        if (err) {
          console.log(err);
        }

        console.log("User saved: " + username + " " + password);

        // create new tweets for new user
        const newTweet = new Tweets({
            _id: new mongoose.Types.ObjectId(),
            tweet: [
                {content: "This is my first tweet!"},
                {content: "This is my second tweet!"}],
            user: newUser._id
        });

        newTweet.save(function (err) {
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

        // jump to user's account page
        res.redirect('http://localhost:3000/account/' + newUser._id);
    });
    */
});


router.get('/account/:userid', (req, res) => {

    const userId = req.params.userid;

    // populate to Tweets and display
    var content = req.body.tweetcontent;
    //console.log("New Tweet: "+ content);

    //res.render('account', {userId: userId});

    res.render('index', {message: 'Welcome '+ userId});
});

module.exports = router;