const express = require('express');
const router = express.Router();
const otp_historyService = require('./otp_history.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    otp_historyService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    otp_historyService.getAll()
        .then(nationalitys => res.json(nationalitys))
        .catch(err => next(err));
}


function getById(req, res, next) {
    otp_historyService.getById(req.params.id)
        .then(otp_history => otp_history ? res.json(otp_history) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    otp_historyService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    otp_historyService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}