const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    console.log("Get req received!")

    res.render('index', {message: 'Welcome'});

    //res.render('index', {message: 'Welcome '+ username});
});

module.exports = router;