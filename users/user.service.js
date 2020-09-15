const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Otp_history = db.otp_history;
const Userroles = db.Userroles;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    roles,
    checkOtp,
    update,
    delete: _delete
};

async function authenticate({ mobile_number, password }) {
	var obj = {};  
    const user = await User.findOne({ mobile_number: mobile_number,mobile_verified:1 });
	if(user){
		if (user && bcrypt.compareSync(password, user.hash)) {
			const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
			return {
				...user.toJSON(),
				token
			};
		}else{
			obj['message']='Please enter valid password';
			obj['error']=true;
		}
	}else{
			obj['message']='Please enter valid Mobile';
			obj['error']=true;
	
	}
	return obj;
}

async function getAll() {
    return await User.find();
}
async function checkOtp(userParam) {
	var obj = {}; 
	const otp_history = await Otp_history.findOne({ mobile_number: userParam.mobile_number,otp: userParam.otp,status: 0 });
	if (otp_history){
		let mobile = userParam.mobile_number;
		 userParam.status=1;
		 Object.assign(otp_history, userParam);
		 await otp_history.save();
		 await User.updateOne(
			   { mobile_number:mobile },
			   {
				 $set: { mobile_verified: 1 },
				 $currentDate: { lastModified: true }
			   }
			)
		const user = await User.findOne({ mobile_number:mobile });
					
		if (user) {
			const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
			obj['error']=false;
			obj['message']="OTP verified";
			obj['response']= {
				...user.toJSON(),
				token
			}; 
		}
	}else{
		obj['error']=true;
		obj['message']="Enter Valid OTP";
	}
	return obj;
	  
}
async function roles() {
    // validate
	return await Userroles.find({ $or: [ { userrole_name: 'Influencer' }, { userrole_name: 'Brand Advertiser' } ] });
//    return await Userroles.find({ userrole_name: { $in: [ 'Influencer', '' ] } }); 
}
async function getById(id) {
    return await User.findById(id);
}

async function create(userParam,user_profile_pic) {

	var obj = {};  
    // validate
    if(await User.findOne({ mobile_number: userParam.mobile_number })) {
		let userdetails = await User.findOne({ mobile_number: userParam.mobile_number });
		obj['message']='Mobile number already registered';
		obj['error']=true;
		obj['userdetails']= userdetails;
    }else if(await User.findOne({ email: userParam.email })) {
		let userdetails = await User.findOne({ email: userParam.email });
		obj['message']='Email already registered';
		obj['error']=true;
		obj['userdetails']= userdetails;
    }else{
		const user = new User(userParam);
		if (userParam.password) {
			user.hash = bcrypt.hashSync(userParam.password, 10);
		}
		if (user_profile_pic) {
			user.user_profile_pic = user_profile_pic.path;
		}

		let userdetails = await user.save();
		obj['error']=false;
		obj['userdetails']= userdetails;
		const otp_history = new Otp_history();
		otp_history.mobile_number = userParam.mobile_number;
		otp_history.otp = 12345;
		var otp_details = await otp_history.save();
		obj['otp_details'] = otp_details;
		obj['message']='OTP sent';

	}
    // save user
	return obj;

}

async function update(id, userParam,user_profile_pic) {
  	var obj = {};  
	const user = await User.findById(id);

    // validate
    if (!user){
		obj['message']='No users availble with this '+id;
		obj['error']=true;
		obj['user']=user;
		
	}else if (user.mobile_number !== userParam.mobile_number && await User.findOne({ mobile_number: userParam.mobile_number })) {
		obj['message']='Mobile number "' + userParam.mobile_number + '" is already taken';
		obj['error']=true;
		obj['userdetails']= await User.findOne({ mobile_number: userParam.mobile_number });

	}else if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
		obj['message']='Email "' + userParam.email + '" is already taken';
		obj['error']=true;
		obj['userdetails']= await User.findOne({ email: userParam.email });
    }else{

		// hash password if it was entered
		if (user_profile_pic) {
			userParam.user_profile_pic = user_profile_pic.path;
		}
		if (userParam.password) {
			user.hash = bcrypt.hashSync(userParam.password, 10);
		}

		// copy userParam properties to user
		Object.assign(user, userParam);
		await user.save();
		obj['message']='Succesfully updated';
		obj['error']=false;
		obj['userdetails']= await User.findById(id);
		
	}
    return obj;
}

async function _delete(id) {
	return id; 
    return await User.findByIdAndRemove(id);
}