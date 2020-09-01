const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Countries = db.Countries;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Countries.find();
}

async function getById(id) {
    return await Countries.findById(id);
}

async function create(userParam) {
    // validate
    if (await Countries.findOne({ country_name: userParam.country_name })) {
        throw 'Country "' + userParam.country_name + '" is already taken';
    }
    const countries = new Countries(userParam);

    // save countries
    await countries.save();
}

async function update(id, userParam) {
    const countries = await Countries.findById(id);

    // validate
    if (!countries) throw 'Country not found';
    if (countries.country_name !== userParam.country_name && await Countries.findOne({ country_name: userParam.country_name })) {
        throw 'Nationality "' + userParam.country_name + '" is already taken';
    }

    // copy userParam properties to countries
    Object.assign(countries, userParam);

    await countries.save();
}

async function _delete(id) {
    await Countries.findByIdAndRemove(id);
}