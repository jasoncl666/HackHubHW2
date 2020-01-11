const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({
    "content": {type: String, required: true},
	"author": {
		"name": {type: String, required: true},
		"username": {type: String, required: true},
		"location": String,
		"avatarUrl": String,
		"Bio": String
	},
	"createdAt": {type: Date, required: true, default: Date.now}
});

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.exports = Tweets;