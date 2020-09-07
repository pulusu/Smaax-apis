const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    mobile_number: { type: String, unique: true, required: true },
    mobile_verified: { type: Number, default: 0 },
    email: { type: String, unique: true },
    username: { type: String },
    hash: { type: String},
    firstName: { type: String },
    lastName: { type: String },
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

module.exports = mongoose.model('User', schema);