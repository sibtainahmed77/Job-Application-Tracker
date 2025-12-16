const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    company: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Remote'],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    salary: {
      type: String
    },
    notes: {
      type: String
    },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied'
    }
  },
  { timestamps: true } 
)

const Application = mongoose.model('Application', applicationSchema)

module.exports = Application
