const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Nationalities = db.Nationalities;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Nationalities.find();
}

async function getById(id) {
    return await Nationalities.findById(id);
}

async function create(userParam) {
    // validate
    if (await Nationalities.findOne({ nationalities_name: userParam.nationalities_name })) {
        throw 'Nationality	 "' + userParam.nationalities_name + '" is already taken';
    }
    const nationalities = new Nationalities(userParam);

    // save nationalities
    await nationalities.save();
}

async function update(id, userParam) {
    const nationalities = await Nationalities.findById(id);

    // validate
    if (!nationalities) throw 'Nationality not found';
    if (nationalities.nationalities_name !== userParam.nationalities_name && await Nationalities.findOne({ nationalities_name: userParam.nationalities_name })) {
        throw 'Nationality "' + userParam.nationalities_name + '" is already taken';
    }

    // copy userParam properties to Nationalities
    Object.assign(nationalities, userParam);

    await nationalities.save();
}

async function _delete(id) {
    await Nationalities.findByIdAndRemove(id);
}