const express = require('express');
const router = express.Router();
const postTypesService = require('./postTypes.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    postTypesService.create(req.body)
        .then(postTypes => postTypes ? res.json(postTypes) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    postTypesService.getAll()
        .then(nationalitys => res.json(nationalitys))
        .catch(err => next(err));
}


function getById(req, res, next) {
    postTypesService.getById(req.params.id)
        .then(postTypes => postTypes ? res.json(postTypes) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    postTypesService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    postTypesService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}