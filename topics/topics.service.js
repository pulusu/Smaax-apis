const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Topics = db.Topics;


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
    return await Topics.find();
}

async function getById(id) {
    return await Topics.findById(id);
}

async function create(userParam) {
    // validate
    if (await Topics.findOne({ topic_name: userParam.topic_name })) {
        throw 'topic	 "' + userParam.topic_name + '" is already taken';
    }
    const topic = new Topics(userParam);

    // save topic
    return await topic.save();
}

async function update(id, userParam) {
    const topic = await Topics.findById(id);

    // validate
    if (!topic) throw 'topic_name not found';
    if (topic.topic_name !== userParam.topic_name && await Topics.findOne({ topic_name: userParam.topic_name })) {
        throw 'Topic "' + userParam.topic_name + '" is already taken';
    }

    // copy userParam properties to Nationalities
    Object.assign(topic, userParam);

    await topic.save();
}

async function _delete(id) {
    await Topics.findByIdAndRemove(id);
}