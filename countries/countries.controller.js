const express = require('express');
const router = express.Router();
const countryService = require('./countries.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    countryService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    countryService.getAll()
        .then(nationalitys => res.json(nationalitys))
        .catch(err => next(err));
}


function getById(req, res, next) {
    countryService.getById(req.params.id)
        .then(country => country ? res.json(country) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    countryService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    countryService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}