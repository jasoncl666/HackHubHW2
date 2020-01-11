const express = require('express');
const index = require('./routes/index');
const bodyParser = require('body-parser');
const path = require('path');
//const tweets = require('tweets');
const mongoose = require('mongoose');

const app = express();

//Set pug as the view engine
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Apply the modules as Application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use(express.static(path.join(__dirname, 'public')));

//Set up mongoDB connection
const mongoDB = 'mongodb+srv://jasoncl666:6306zpLIU@huckhub-9ntpi.azure.mongodb.net/hackhub';
mongoose.connect(mongoDB)
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.log(err));

const db = mongoose.connection;

app.use('/', index);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
