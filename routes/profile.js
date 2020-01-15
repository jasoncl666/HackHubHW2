const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Tweets = require('../models/tweets');
const User = require('../models/users');
const mongoose = require('mongoose');
const passport = require('passport');
const utils = require('../utils');

module.exports = router;