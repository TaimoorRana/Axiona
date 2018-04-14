const express = require('express');
const router = express.Router();
const Phonelog = require('../../models/Phonelog');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Generate report for urgency in phonelogs
 */
router.get('/urgentall', (req, res) => {
    Phonelog.aggregate(
        [
            {
                $group: {
                    _id: { "field": '$urgent' },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 2, count: 2
                }
            }
        ]
    )
        .then(c => {
            result = new Map();
            //This is because it is a boolean, otherwise refer to the other routes
            // such as /callerall which map beautifully and automatically...
            result["YES"] = (c[0]["_id"]["field"] ? c[0]["count"] : c[1]["count"]);
            result["NO"] = (c[0]["_id"]["field"] ? c[1]["count"] : c[0]["count"]);
            res.send(result);
        }, err => {
            res.send(err);
        })
});
router.get('/callerall', (req, res) => {
    Phonelog.aggregate(
        [
            {
                $group: {
                    _id: { "field": '$callertype' },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 4, count: 4
                }
            }
        ]
    )
        .then(c => {
            result = new Map();
            c.forEach(function (e) {
                result[e["_id"]["field"]] = e["count"];
            });
            res.send(result);
        }, err => {
            res.send(err);
        })
});
router.get('/pronounall', (req, res) => {
    Phonelog.aggregate(
        [
            {
                $group: {
                    _id: { "field": '$pronouns' },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 4, count: 4
                }
            }
        ]
    )
        .then(c => {
            result = new Map();
            c.forEach(function (e) {
                result[e["_id"]["field"]] = e["count"];
            });
            res.send(result);
        }, err => {
            res.send(err);
        })
});

module.exports = router;