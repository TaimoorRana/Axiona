const express = require('express');
const router = express.Router();
const Phonelog = require('../models/Phonelog');
const ObjectId = require('mongoose').Types.ObjectId;


/**
 * Get all Phonelog
 */
router.get('/', (req, res) => {
    Phonelog.find().
        populate('user')
        .populate('resolvedBy').then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Get all active phonelogs
 */
router.get('/active', (req, res) => {
    Phonelog.find({ "resolved": { "$in": ["false", false] }, "deleted": { "$in": ["false", false] } })
        .populate('user')
        .populate('resolvedBy')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});


/**
 * Get recently updated phone logs
 */
router.get('/recent', (req, res) => {

    const rangeOfDays = 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - rangeOfDays);

    Phonelog.find({ updatedAt: { $gt: startDate } })
        .populate('user')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Get resolved phone logs
 */
router.get('/resolved', (req, res) => {
    Phonelog.find({ "resolved": { "$in": ["true", true] }, "deleted": { "$in": ["false", false] } })
        .populate('user')
        .populate('resolvedBy')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Get deleted phone logs
 */
router.get('/deleted', (req, res) => {
    Phonelog.find({ "deleted": { "$in": ["true", true] } })
        .populate('user')
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Create a new Phonelog
 */
router.post('/', (req, res) => {
    let phonelog = new Phonelog({
        name: req.body.name,
        pronouns: req.body.pronouns,
        user: req.user._id,
        dateToCallback: req.body.dateToCallback,
        language: req.body.language,
        urgent: req.body.urgent,
        phonenumber: req.body.phonenumber,
        subject: req.body.subject,
        message: req.body.message,
        callertype: req.body.callertype,
    });

    if (req.body.assignedTo) {
        phonelog.assignedTo = req.body.assignedTo;
    }

    phonelog.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Update a phone log
 */
router.put('/:lid', (req, res) => {
    Phonelog.findById(req.params.lid).then(log => {
        log.name = req.body.name || log.name;
        log.pronouns = req.body.pronouns || log.pronouns;
        log.phonenumber = req.body.phonenumber || log.phonenumber;
        log.subject = req.body.subject || log.subject;
        log.urgent = req.body.urgent;
        log.callertype = req.body.callertype || log.callertype;
        log.assignedTo = req.body.assignedTo || log.assignedTo;
        log.dateToCallback = req.body.dateToCallback || log.dateToCallback;
        log.message = req.body.message || log.message;
        log.date = req.body.date || log.date
        log.language = req.body.language || log.language;



        log.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

/**
 * Set phone log to deleted
 */
router.put('/:id/deleted', (req, res) => {
    Phonelog.update({ '_id': req.params.id }, { '$set': { deleted: req.body.deleted } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Set phone log to resolved
 */
router.put('/:id/resolved', (req, res) => {
    Phonelog.update({ '_id': req.params.id }, { '$set': { resolved: req.body.resolved, resolvedBy: req.user._id, dateResolved: Date.now() } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});
module.exports = router;