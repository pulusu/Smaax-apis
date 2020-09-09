const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Attachments = db.Attachments;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Attachments.find();
}

async function getById(id) {
    return await Attachments.findById(id);
}

async function create(userParam) {
    // validate
   
    const attachment = new Attachments(userParam);

    // save attachments
    await attachment.save();
}

async function update(id, userParam) {
    const attachments = await Attachments.findById(id);

    // validate
    if (!attachments) throw 'attachments not found';
    if (attachments.attachment_name !== userParam.attachment_name && await Attachments.findOne({ attachment_name: userParam.attachment_name })) {
        throw 'attachments "' + userParam.attachment_name + '" is already taken';
    }

    // copy userParam properties to Attachments
    Object.assign(attachments, userParam);

    await attachments.save();
}

async function _delete(id) {
    await Attachments.findByIdAndRemove(id);
}