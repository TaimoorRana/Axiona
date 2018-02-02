const express = require('express');
const router = express.Router();
const Casefile = require('../models/Casefile');
const Resource = require('../models/Resource');

/**
 * Get all Cases
 */
router.get('/', (req, res) => {
    Casefile.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a Casefile by ID
 */
router.get('/:id', (req, res) => {
    Casefile.findById(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a Casefile by participant ID
 */
router.get('/participant/:id', (req, res) => {
    Casefile.find({ participant: req.params.id }).populate('contactedResources.resource').then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a contacted resource of a Casefile by resource ID
 */
router.get('/:id/resource/:resId', (req, res) => {
    Casefile.findOne({ _id: req.params.id, 'contactedResources.resource': req.params.resId },
        { 'contactedResources.$': 1 }).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new Casefile
 */
router.post('/', (req, res) => {
    let casefile = new Casefile({
        participant: req.body.participant,
        notes: [req.body.notes],
        status: req.body.status,
        urgency: req.body.urgency,
        contactedResources: req.body.contactedResources,
        selectedResource: req.body.selectedResource,
        date: req.body.date
    });
    casefile.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Add a contacted resource to Casefile
 */
router.post('/:id/resource', (req, res) => {
    Resource.findById(req.body.resourceId).then(resource => {
        if (!resource) return res.send({ err: "Resource ID does not exist." });

        let contResource = {
            resource: req.body.resourceId,
            status: req.body.status,
            dateContacted: req.body.dateContacted,
            note: req.body.note
        };
        Casefile.update({ _id: req.params.id }, { $push: { contactedResources: contResource } }).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    });
});

/**
 * Update status of a contacted resource
 */
router.put('/:id/resource/:resId', (req, res) => {
    Casefile.update({ '_id': req.params.id, 'contactedResources.resource': req.params.resId },
        { '$set': { 'contactedResources.$.status': req.body.status } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Update a contacted resource's details
 */
router.put('/:id/resource/:resId', (req, res) => {
    Resource.update({ _id: req.params.id },
        { $pull: { contactedResources: {resource: req.params.resId} } }).then(contResource => {
        if (!contResource) return res.send({ err: "Contacted Resource does not exist." });

        contResource.status = req.body.status || contResource.status;
        contResource.dateContacted = req.body.dateContacted || contResource.dateContacted;
        contResource.note = req.body.note || contResource.note;

        Casefile.update({ _id: req.params.id }, { $push: { contactedResources: contResource } }).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    });
});

/**
 * Update status of a Casefile
 */
router.put('/:id/status', (req, res) => {
    Casefile.update({ '_id': req.params.id }, { '$set': { status: req.body.status } })
        .then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
});

/**
 * Delete a Casefile with the given ID
 */
router.delete('/:id', (req, res) => {
    Casefile.findByIdAndRemove(req.params.id).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

module.exports = router;