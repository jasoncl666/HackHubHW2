const express = require('express');
const router = express.Router();
const Tweets = require('../models/tweets');
const utils = require('../utils');

router.get('/account', utils.requireLogin, (req, res) => {

    const userId = req.user._id;

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

router.post('/account', utils.requireLogin, (req, res) => {

    const userId = req.user._id;

    // newly created tweet, then update mongoDB
    const content = req.body.tweetContnet;

    console.log('New Tweet: ' + content);

    // populate to Tweets and display
    Tweets.findOne({user: userId})
    .populate('tweets').exec().then((doc) => {
        console.log(doc._id);

        Tweets.findByIdAndUpdate(doc._id, {$push:{tweet: {content: content}}}, {new: true}, (err, doc) => {
            if(err) console.log(err);
            return res.redirect('/account');
        })
    }).catch((err) => {
        console.log(err);
    });
});


router.post('/account/delete', utils.requireLogin, (req, res) => {

    const {tweetsID, tID}= req.body;

    Tweets.update({_id: tweetsID}, {$pull: {tweet: {_id: tID}}}).exec()
    .then((doc) => {
        res.redirect('/account');
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;