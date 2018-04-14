const express = require('express');
const router = express.Router();
const Phonelog = require('../../models/Phonelog');
const ObjectId = require('mongoose').Types.ObjectId;

/** 
 * GET urgency count 
 */
router.get('/urgency', (req, res) => {
    
    Phonelog.aggregate([{
        $group: {
            _id: { "field": '$urgent' },
            count: { $sum: 1 }
        }    
    }]).then(data => {
        res.send(data);
    }, err => {
        res.send(err);
    })
});


/**
 * Generate report for urgency in phonelogs
 */
router.get('/urgentyes', (req, res) => {
    Phonelog.count({ "urgent": { "$in": ["true", true] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/urgentno', (req, res) => {
    Phonelog.count({ "urgent": { "$in": ["false", false] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callertrans', (req, res) => {
    Phonelog.count({ "callertype": { "$in": ["Trans person", "Trans person"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callerorganization', (req, res) => {
    Phonelog.count({ "callertype": { "$in": ["Organization", "Organization"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callersocialworker', (req, res) => {
    Phonelog.count({ "callertype": { "$in": ["Social worker", "Social worker"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callerother', (req, res) => {
    Phonelog.count({ "callertype": { "$in": ["Other person", "Other person"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callerpronounundisclosed', (req, res) => {
    Phonelog.count({ "pronouns": { "$in": ["undisclosed", "undisclosed"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callerpronounshe', (req, res) => {
    Phonelog.count({ "pronouns": { "$in": ["she/her", "she/her"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callerpronounthey', (req, res) => {
    Phonelog.count({ "pronouns": { "$in": ["they/them", "they/them"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});
router.get('/callerpronounhim', (req, res) => {
    Phonelog.count({ "pronouns": { "$in": ["he/him", "he/him"] }})
        .then(count => {
            res.send({"count": count});
        }, err => {
            res.send(err);
        })
});



module.exports = router;