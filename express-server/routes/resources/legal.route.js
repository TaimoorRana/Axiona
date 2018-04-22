const express = require('express');
const router = express.Router();
const Resource = require('../../models/Resource');
const Legal = require('../../models/resources/Legal');


/**
 * Get all legal resources
 */
router.get('/', (req, res) => {
    Resource.find({deleted: { $ne: true }}).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Create a new legal resource
 */
router.post('/', (req, res) => {
    let legal = new Legal({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        notes: req.body.notes,
        fee_structure: req.body.fee_structure,
        speciality: req.body.speciality,
        schedule_availability: req.body.schedule_availability,
        language: req.body.language,
        accept_legal_aid: req.body.accept_legal_aid,
        region: req.body.region,
        name_of_firm: req.body.name_of_firm
    });
    legal.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Update given legal resource
 */
router.put('/:id', (req, res) => {
    Resource.findById(req.params.id).then(legal => {
        legal.name = req.body.name || legal.name;
        legal.email = req.body.email || legal.email;
        legal.phone = req.body.phone || legal.phone;
        legal.location = req.body.location || legal.location;
        legal.notes = req.body.notes || legal.notes;
        legal.fee_structure = req.body.fee_structure || legal.fee_structure,
        legal.speciality = req.body.speciality || legal.speciality,
        legal.schedule_availability = req.body.schedule_availability || legal.schedule_availability,
        language = req.body.language || legal.language,
        legal.accept_legal_aid = req.body.accept_legal_aid || legal.accept_legal_aid,
        legal.region = req.body.region || legal.region,
        legal.name_of_firm = req.body.name_of_firm || legal.name_of_firm

        legal.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

module.exports = router;