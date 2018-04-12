const express = require('express');
const router = express.Router();
const Phonelog = require('../../models/Phonelog');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Generate report for urgency in phonelogs
 */
router.get('/urgent', (req, res) => {
    Phonelog.count({ "urgent": { "$in": ["true", true] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});

module.exports = router;