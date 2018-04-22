const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Resource = require('../../models/Resource');

const legalSchema = new Schema({
    fee_structure: { type: String},
    speciality: { type: String},
    schedule_availability: { type: String},
    language: { type: String},
    accept_legal_aid: {type: String},
    region: {type: String},
    name_of_firm: {type: String}
  }, { discriminatorKey: 'kind', timestamps: true });

const Legal = Resource.discriminator('Legal', legalSchema);

module.exports = Legal;