const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Userroles = db.Userroles;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
	return await Userroles.find({ $or: [ { userrole_name: 'Influencer' }, { userrole_name: 'Brand Advertiser' } ] });
//    return await Userroles.find();
}

async function getById(id) {
    return await Userroles.findById(id);
}

async function create(userParam) {
    // validate
    if (await Userroles.findOne({ userrole_name: userParam.userrole_name })) {
        throw 'Userroles	 "' + userParam.userrole_name + '" is already taken';
    }
    const userrole = new Userroles(userParam);

    // save userrole
    await userrole.save();
}

async function update(id, userParam) {
    const userrole = await Userroles.findById(id);

    // validate
    if (!userrole) throw 'userrole not found';
    if (userrole.userrole_name !== userParam.userrole_name && await Userroles.findOne({ userrole_name: userParam.userrole_name })) {
        throw 'userrole "' + userParam.userrole_name + '" is already taken';
    }

    // copy userParam properties to Userroles
    Object.assign(userrole, userParam);

    await userrole.save();
}

async function _delete(id) {
    await Userroles.findByIdAndRemove(id);
}