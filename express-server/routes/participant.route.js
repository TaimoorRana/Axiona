const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Participant = require('../models/Participant');
const Document = require('../models/Document');
const Note = require('../models/Note');
const User = require('../models/User');

/**
 * Get all participants
 */
router.get('/', (req, res) => {
    Participant.find().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get a participant by ID
 */
router.get('/id/:pid', (req, res) => {
    Participant.findById(req.params.pid).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Get all participants of a social worker
 * Returns only participants who were not flagged as deleted
 */
router.get('/worker', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).send({ err: "No user ID provided. User must be logged in." })
    }
    Participant.find({ deleted: false, socialworkers: new ObjectId(req.user._id) }).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Search for an existing attribute and value pair
 * Query example: /participant/search/name=Sandy
 */
router.get('/search/:values', (req, res) => {
    let pair = (req.params.values).replace('=', '":"');
    let query = JSON.parse('{"' + pair + '"}');
    Participant.find(query).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

/**
 * Create a new participant
 */
router.post('/', (req, res) => {
    let participant = new Participant({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        pronouns: req.body.pronouns,
        telephone: req.body.telephone,
        address: req.body.address,
        socialmedia: {
            service: req.body.service,
            username: req.body.username
        },
        socialworkers: [req.user._id] // add creator's ID by default
    });
    participant.save().then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});

/**
 * Delete a participant by ID
 * 
 * If the user making this request is an administrator, the participant's record will be 
 * permanently deleted. Otherwise, it will only be flagged as deleted.
 */
router.delete('/:pid', (req, res) => {
    if (req.user.role === "admin") {
        Participant.findByIdAndRemove(req.params.pid).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    } else {
        Participant.findByIdAndUpdate(req.params.pid, {deleted: true}).then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }
});

/**
 * Add a social worker to participant
 */
router.post('/:pid/worker', (req, res) => {
    User.findById(req.body.workerID).then(user => {
        if (!user) return res.send({ err: "User (social worker) does not exist." });

        Participant.update({ _id: req.params.pid }, { $push: { socialworkers: req.body.workerID } })
            .then(data => {
                res.send(data);
            }, err => {
                res.send(err);
            })
    }, err => {
        res.send(err);
    });
});

/**
 * Add a document to participant
 */
router.post('/:pid/doc', (req, res) => {
    let document = new Document({
        type: req.body.type,
        date: req.body.date,
        attachment: req.body.attachment
    });
    Participant.findById(req.params.pid).then(participant => {
        if (!participant.documents) {
            participant.documents = [];
        }
        participant.documents.push(document);

        participant.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

/**
 * Delete a participant's document by the document ID
 */
router.delete('/:pid/doc/:docId', (req, res) => {
    Participant.update({ _id: req.params.pid },
        { $pull: { documents: { _id: req.params.docId } } }
    ).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

/**
 * Add a note to participant
 */
router.post('/:pid/note', (req, res) => {
    let note = new Note({
        text: req.body.text,
        date: req.body.date,
        attachment: req.body.attachment
    });
    Participant.findById(req.params.pid).then(participant => {
        if (!participant.notes) {
            participant.notes = [];
        }
        participant.notes.push(note);

        participant.save().then(data => {
            res.send(data);
        }, err => {
            res.send(err);
        })
    }, err => {
        res.send(err);
    })
});

/**
 * Delete a participant's note by the note ID
 */
router.delete('/:pid/note/:noteId', (req, res) => {
    Participant.update({ _id: req.params.pid },
        { $pull: { notes: { _id: req.params.noteId } } }
    ).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
})

module.exports = router;