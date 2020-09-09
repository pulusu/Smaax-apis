const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    attachment_name: { type: String, required: true },
    post_type: { type: String, required: true},
    post_id: [
    { type: mongoose.Schema.ObjectId, ref: 'Campaign' }  ],
	status: { type: String, default: 1 },
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

module.exports = mongoose.model('attachments', schema);