const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Document = require('../models/Document').schema;
const Note = require('../models/Note').schema;
const Casefile = require('./Casefile');
const NULL_PARTICIPANT = require('../config/null-objects').NULL_PARTICIPANT;

const participantSchema = new Schema({
  _id: { type: String, required: true },
  name: String,
  pronouns: String,
  email: { type: String, sparse: true },
  telephone: String,
  address: String,
  socialmedia: {
    service: String,
    username: String
  },
  documents: [Document],
  notes: [Note],
  socialworkers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  deleted: { type: Boolean, default: false }
}, { _id: false, timestamps: true });

participantSchema.pre('remove', function (next) {
  Casefile.update({ participant: this._id },
  { participant: NULL_PARTICIPANT }, next);
});

const Participant = mongoose.model('Participant', participantSchema, 'participants');

module.exports = Participant;