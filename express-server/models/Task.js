const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    description: { type: String, required: true},
    deadline: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    participant: { type: Schema.Types.ObjectId, ref: 'Participant'}
  }, { discriminatorKey: 'kind', timestamps: true });

const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;