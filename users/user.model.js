const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    mobile_number: { type: String, unique: true, required: true },
    hash: { type: String,required: true },
    email: { type: String, unique: true },
    name: { type: String },
    hash: { type: String},
    gender: { type: String },
    user_role: [
    { type: mongoose.Schema.ObjectId, ref: 'userroles' }  ],
    user_profile_pic: { type: String },
    facebook_username: { type: String },
    instagram_username: { type: String },
    twitter_username: { type: String },
    mobile_verified: { type: Number, default: 0 },
    lastUpdateDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('users', schema);