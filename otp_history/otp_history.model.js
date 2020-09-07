const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    mobile_number: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: String, default: 0 },
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

module.exports = mongoose.model('otp_history', schema);