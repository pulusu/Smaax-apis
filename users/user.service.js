const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Otp_history = db.otp_history;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    checkOtp,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}
async function checkOtp(userParam) {
	const otp_history = await Otp_history.findOne({ mobile_number: userParam.mobile_number,otp: userParam.otp,status: 0 });
	if (otp_history){
		 userParam.status=1;
		 Object.assign(otp_history, userParam);
		return await otp_history.save();
	}else{
		return null;
	}
	  
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ mobile_number: userParam.mobile_number })) {
        throw 'mobile_number "' + userParam.mobile_number + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
	const otp_history = new Otp_history();
    otp_history.mobile_number = userParam.mobile_number;
    otp_history.otp = 12345;

	await user.save();

    // save otp_history
    await otp_history.save();

}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}