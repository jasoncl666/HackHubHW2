const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Tweets = require('../models/tweets');
const User = require('../models/user');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mongoose = require('mongoose');


router.get('/', (req, res) => {

    console.log("Get req received!")

    res.render('index', {message: 'Welcome'});

    //res.render('index', {message: 'Welcome '+ username});
});

router.post('/', (req, res) => {

    var username = req.body.username;
    console.log("Post req received!")

    // Not Working
    if(req.body)
        res.render('index', {message: 'Welcome'+username});
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', (req, res) => {

    var username = req.body.username,
        password = req.body.password;

    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: password
    });
    
    newUser.save(function (err) {
        if (err) {
          console.log(err);
        }

        console.log("User saved: " + username + " " + password);

        // create new tweets for new user
        const newTweet = new Tweets({
            content: "This is my first tweet!",
            user: newUser._id
        });

        newTweet.save(function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Tweet saved!");
        });

        res.redirect('http://localhost:3000/');
    });
});


router.get('/account', (req, res) => {
    res.render('account');
});

module.exports = router;