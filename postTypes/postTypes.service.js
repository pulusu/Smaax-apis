const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const PostTypes = db.PostTypes;


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await PostTypes.find();
}

async function getById(id) {
    return await PostTypes.findById(id);
}

async function create(userParam) {
    // validate
    if (await PostTypes.findOne({ postType_name: userParam.postType_name })) {
        throw 'postType	 "' + userParam.postType_name + '" is already taken';
    }
    const postType = new PostTypes(userParam);

    // save postType
    return await postType.save();
}

async function update(id, userParam) {
    const postType = await PostTypes.findById(id);

    // validate
    if (!postType) throw 'postType_name not found';
    if (postType.postType_name !== userParam.postType_name && await PostTypes.findOne({ postType_name: userParam.postType_name })) {
        throw 'PostTypes "' + userParam.postType_name + '" is already taken';
    }

    // copy userParam properties to Nationalities
    Object.assign(postType, userParam);

    await postType.save();
}

async function _delete(id) {
    await PostTypes.findByIdAndRemove(id);
}