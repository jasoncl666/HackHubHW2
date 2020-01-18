const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

    username: {type: String, required: true},
    password: String,
    profile: {
        email: String,
        age: Number,
        photoURI: String
    },
    tweets: {type: mongoose.Schema.Types.ObjectId, ref: 'Tweets'}
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;