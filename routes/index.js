const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    console.log("Get req received!")

    res.render('index', {message: 'Welcome'});
});

module.exports = router;