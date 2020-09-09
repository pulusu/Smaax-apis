const express = require('express');
const router = express.Router();
const campaignService = require('./campaign.service');
const multer = require('multer');

// File upload settings  
const PATH = './uploads/campaign';

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
router.post('/create',  upload.array('attachments',5), create);
router.get('/', getAll);
router.get('/dropdowns', dropdowns);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    campaignService.create(req.body,req.files)
        .then(campaign => campaign ? res.json({"status": 200, "error": false, "response": campaign}) : res.json({"status": 404, "error": true, "bodypost": req.body}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    campaignService.getAll()
        .then(nationalitys => res.json(nationalitys))
        .catch(err => next(err));
}

function dropdowns(req, res, next) {
    campaignService.dropdowns()
        .then(resp => res.json(resp))
        .catch(err => next(err));
}


function getById(req, res, next) {
    campaignService.getById(req.params.id)
        .then(campaign => campaign ? res.json(campaign) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    campaignService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    campaignService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}