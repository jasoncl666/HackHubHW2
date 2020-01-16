const express = require('express');
const router = express.Router();
const User = require('../models/users');
const utils = require('../utils');

router.get('/profile', utils.requireLogin, (req, res) => {
    console.log("getting profile");
    res.render('profile');
});

router.post('/profile', utils.requireLogin, (req, res) => {

    const userId = req.user._id;

    const {email, age, photoURI} = req.body;

    console.log(email, age, photoURI);

    User.findByIdAndUpdate(userId, {profile: {email: email, age: age, photoURI: photoURI}}, {new: true}, (err, doc) => {
        if(err) console.log(err);
        console.log(doc);
        console.log('update successully!');
        res.redirect('/profile');
    });
});

module.exports = router;