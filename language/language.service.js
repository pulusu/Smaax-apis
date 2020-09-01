const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Language = db.Language;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Language.find();
}

async function getById(id) {
    return await Language.findById(id);
}

async function create(userParam) {
    // validate
    if (await Language.findOne({ language_name: userParam.language_name })) {
        throw 'Language "' + userParam.language_name + '" is already taken';
    }
    const language = new Language(userParam);

    // save language
    await language.save();
}

async function update(id, userParam) {
    const language = await Language.findById(id);

    // validate
    if (!language) throw 'Country not found';
    if (language.language_name !== userParam.language_name && await Language.findOne({ language_name: userParam.language_name })) {
        throw 'Language "' + userParam.language_name + '" is already taken';
    }

    // copy userParam properties to language
    Object.assign(language, userParam);

    await language.save();
}

async function _delete(id) {
    await Language.findByIdAndRemove(id);
}