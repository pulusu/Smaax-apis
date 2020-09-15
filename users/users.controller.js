const express = require('express');
const router = express.Router();
const userService = require('./user.service');	
const multer = require('multer');

// File upload settings  
const PATH = './uploads/users';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
	let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
	
  }
});

let upload = multer({
  storage: storage
});

// routes
router.post('/authenticate', authenticate);
router.post('/checkOtp', checkOtp);
router.post('/register',  upload.single('user_profile_pic'), register);
router.get('/', getAll);
router.get('roles/', roles);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/update-profile/:id',  upload.single('user_profile_pic') , update);
router.delete('delete/:id', _delete);

module.exports = router;
 
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
function checkOtp(req, res, next) {
    userService.checkOtp(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Enter Valid OTP' }))
        .catch(err => next(err));
} 

function register(req, res, next) {
    userService.create(req.body,req.file)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'OTP not sent' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
function roles(req, res, next) {
    userService.roles()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body,req.file)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'not updated' }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(user => user ? res.json({ message: 'Delete successfully', error:false,response:user}) : res.status(400).json({ message: 'not delete' }))
        .catch(err => next(err));
}