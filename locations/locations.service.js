const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Locations = db.Locations;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Locations.find();
}

async function getById(id) {
    return await Locations.findById(id);
}

async function create(userParam) {
    // validate
    if (await Locations.findOne({ location_name: userParam.location_name })) {
        throw 'Location "' + userParam.location_name + '" is already taken';
    }
    const location = new Locations(userParam);

    // save location
    await location.save();
}

async function update(id, userParam) {
    const location = await Locations.findById(id);

    // validate
    if (!location) throw 'Location not found';
    if (location.location_name !== userParam.location_name && await Locations.findOne({ location_name: userParam.location_name })) {
        throw 'Location "' + userParam.location_name + '" is already taken';
    }

    // copy userParam properties to location
    Object.assign(location, userParam);

    await location.save();
}

async function _delete(id) {
    await Locations.findByIdAndRemove(id);
}