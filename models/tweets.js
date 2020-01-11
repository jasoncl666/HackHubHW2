const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({

    tweet: [{
		content: {type: String, required: true, maxlength: 500},
		createdAt: {type: Date, required: true, default: Date.now}
	}],
	user: {type: Schema.Types.ObjectId, ref: 'User' }
	
});

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.exports = Tweets;