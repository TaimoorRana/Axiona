const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const loggedErrorSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: String,
    refID: String,
    name: String,
    url: String,
    status: String,
    message: String
  }, { timestamps: true });

const LoggedError = mongoose.model('LoggedError', loggedErrorSchema, 'loggederrors');

module.exports = LoggedError;