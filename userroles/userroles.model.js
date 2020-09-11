const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userrole_name: { type: String, unique: true, required: true },
    level: { type: String },
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

module.exports = mongoose.model('userroles', schema);