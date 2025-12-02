const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  jobType: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['Applied','Interview','Rejected','Offer'], default: 'Applied' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
})

const Application = mongoose.model('Application', applicationSchema)
module.exports = Application
