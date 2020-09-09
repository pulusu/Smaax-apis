const express = require('express');
const router = express.Router();
const attachmentsService = require('./attachments.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    attachmentsService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    attachmentsService.getAll()
        .then(language => res.json(language))
        .catch(err => next(err));
}


function getById(req, res, next) {
    attachmentsService.getById(req.params.id)
        .then(country => country ? res.json(country) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    attachmentsService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    attachmentsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}