const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const tweets = require('../models/tweets');
const User = require('../models/user');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


router.get('/', (req, res) => {

    console.log("Get req received!")

    res.render('index', {message: 'Welcome'});
});

router.get('/:username', (req, res) => {
    // Not Working
    var username = req.params.username;

    console.log(username);

    res.render('index', {message: 'Welcome'});
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

    var newUser = new User();
    newUser.username = username;
    newUser.password = password;
    
    res.render('index', {message: 'Welcome '+ username});
    
    newUser.save(function (err) {
        if (err) {
          console.log(err);
        }

        console.log("saved: " + username + " " + password);
        // authentication
        // send request to show user's main page
        //var request = new XMLHttpRequest();
        //request.open('GET', 'http://localhost:3000/'+username, true);
    });
});


router.get('/account', (req, res) => {
    res.render('account');
});

module.exports = router;