const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetsSchema = new Schema({

	_id: Schema.Types.ObjectId,
    tweet: [{
		content: {type: String, required: true, maxlength: 500},
		createdAt: {type: Date, required: true, default: Date.now}
	}],
	user: {type: Schema.Types.ObjectId, ref: 'User' }
});

TweetsSchema.plugin(passportLocalMongoose);

const Tweets = mongoose.model('Tweets', TweetsSchema);

module.exports = Tweets;