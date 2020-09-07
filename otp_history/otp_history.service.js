const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Otp_history = db.otp_history;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Otp_history.find();
}

async function getById(id) {
    return await Otp_history.findById(id);
}

async function create(userParam) {
    // validate
   
    const otp_history = new Otp_history(userParam);

    // save otp_history
    await otp_history.save();
}

async function update(id, userParam) {
    const otp_history = await Otp_history.findById(id);

    // validate
    if (!otp_history) throw 'otp not found';
  
    // copy userParam properties to otp_history
    Object.assign(otp_history, userParam);

    await otp_history.save();
}

async function _delete(id) {
    await Otp_history.findByIdAndRemove(id);
}