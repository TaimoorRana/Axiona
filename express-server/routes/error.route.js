const express = require('express');
const router = express.Router();
const LoggedError = require('../models/LoggedError');

/**
 * Get all errors
 */
router.get('/', (req, res) => {

    LoggedError.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a newly logged error
 */
router.post('/', (req, res) => {
    let loggedError = new LoggedError({
        name: req.body.name,
        user: req.user.id,
        refID: req.body.refID,
        location: req.body.location,
        url: req.body.url,
        status: req.body.status,
        message: req.body.message
    });
    loggedError.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

module.exports = router;