const express = require('express');
const router = express.Router();
const locationService = require('./locations.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    locationService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    locationService.getAll()
        .then(locations => res.json(locations))
        .catch(err => next(err));
}


function getById(req, res, next) {
    locationService.getById(req.params.id)
        .then(country => country ? res.json(country) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    locationService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    locationService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}