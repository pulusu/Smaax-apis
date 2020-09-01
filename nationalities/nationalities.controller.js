const express = require('express');
const router = express.Router();
const nationalityService = require('./nationalities.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    nationalityService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    nationalityService.getAll()
        .then(nationalitys => res.json(nationalitys))
        .catch(err => next(err));
}


function getById(req, res, next) {
    nationalityService.getById(req.params.id)
        .then(nationality => nationality ? res.json(nationality) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    nationalityService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    nationalityService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}