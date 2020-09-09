const express = require('express');
const router = express.Router();
const topicsService = require('./topics.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    topicsService.create(req.body)
        .then(topics => topics ? res.json(topics) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    topicsService.getAll()
        .then(nationalitys => res.json(nationalitys))
        .catch(err => next(err));
}


function getById(req, res, next) {
    topicsService.getById(req.params.id)
        .then(topics => topics ? res.json(topics) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    topicsService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    topicsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}