const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const SocialPlatforms = db.SocialPlatforms;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await SocialPlatforms.find();
}

async function getById(id) {
    return await SocialPlatforms.findById(id);
}

async function create(userParam) {
    // validate
    if (await SocialPlatforms.findOne({ socialPlatform_name: userParam.socialPlatform_name })) {
        throw 'SocialPlatform	 "' + userParam.socialPlatform_name + '" is already taken';
    }
    const socialPlatform = new SocialPlatforms(userParam);

    // save socialPlatform
    await socialPlatform.save();
}

async function update(id, userParam) {
    const socialPlatform = await SocialPlatforms.findById(id);

    // validate
    if (!socialPlatform) throw 'socialPlatform not found';
    if (socialPlatform.socialPlatform_name !== userParam.socialPlatform_name && await SocialPlatforms.findOne({ socialPlatform_name: userParam.socialPlatform_name })) {
        throw 'socialPlatform "' + userParam.socialPlatform_name + '" is already taken';
    }

    // copy userParam properties to SocialPlatforms
    Object.assign(socialPlatform, userParam);

    await socialPlatform.save();
}

async function _delete(id) {
    await SocialPlatforms.findByIdAndRemove(id);
}