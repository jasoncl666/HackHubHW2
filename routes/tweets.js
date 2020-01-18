/**
 * 
 * RESTful API
 * 
 * back end operations related with tweets (post, get, update, delete)
 */


const express = require('express');
const passport = require('passport')
const Tweets = require('../models/tweets')
const router = express.Router();


// get all tweets without login
router.get('/', async (req, res) => {

    try {
        const tweets = await Tweets.find({}).populate("user");
        return res.json({tweets, error: null, success: true});

    } catch(err) {

        return res.json({error: err, success: false});
    }
});

// accept post tweet with token
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {

    const userId = req.user._id;

    // newly created tweet, then update mongoDB
    const content = req.body.tweetContent;

    // populate to current User's Tweets and display
    Tweets.findOne({user: userId})
    .populate('tweets').exec().then((doc) => {

        Tweets.findByIdAndUpdate(doc._id, {$push:{tweet: {content: content}}}, {new: true}, (err, doc) => {
            if(err) return res.json({error: err, success: false});
            return res.json({ tweet: doc, error: null, success: true });
        })
    }).catch((err) => {
        return res.json({error: err, success: false});
    });
});

// delete tweet 
router.delete('/', passport.authenticate('jwt', {session: false}), async (req, res) => {

    const {tweetsID, tID} = req.body;

    Tweets.update({_id: tweetsID}, {$pull: {tweet: {_id: tID}}}).exec()
    .then((doc) => {
        return res.json({ tweet: doc, error: null, success: true });
    })
    .catch((err) => {
        return res.json({error: err, success: false});
    });
});


// accept update tweet with token
router.put('/', passport.authenticate('jwt', {session: false}), async (req, res) => {

    const {tweetsID, tID, editContent} = req.body;

    Tweets.update({_id: tweetsID, 'tweet._id': tID}, {$set: {'tweet.$.content': editContent}}).exec()
    .then((doc) => {
        return res.json({ tweet: doc, error: null, success: true });
    })
    .catch((err) => {
        return res.json({error: err, success: false});
    });
});




module.exports = router;