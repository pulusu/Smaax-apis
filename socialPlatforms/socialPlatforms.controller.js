const express = require('express');
const router = express.Router();
const socialPlatformsService = require('./socialPlatforms.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    socialPlatformsService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    socialPlatformsService.getAll()
        .then(nationalitys => res.json(nationalitys))
        .catch(err => next(err));
}


function getById(req, res, next) {
    socialPlatformsService.getById(req.params.id)
        .then(socialPlatform => socialPlatform ? res.json(socialPlatform) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    socialPlatformsService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    socialPlatformsService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}