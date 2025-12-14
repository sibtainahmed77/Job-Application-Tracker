const Application = require('../models/Application')

exports.createApplication = async (req, res, next) => {
  try {
    const application = new Application({
      user: req.user.id,
      company: req.body.company,
      title: req.body.title,
      jobType: req.body.jobType,
      location: req.body.location,
      salary: req.body.salary,
      notes: req.body.notes
    })

    const savedApplication = await application.save()
    res.status(201).json(savedApplication)
  } catch (error) {
    next(error)
  }
}

exports.getApplications = async (req, res, next) => {
  try {
    const { status, company } = req.query
    const filter = { user: req.user.id }

    if (status) filter.status = status
    if (company) filter.company = { $regex: company, $options: 'i' } 

    const list = await Application.find(filter).sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    next(err)
  }
}


exports.updateApplication = async (req, res, next) => {
  try {
    const updated = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

exports.deleteApplication = async (req, res, next) => {
  try {
    const deleted = await Application.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    res.json(deleted)
  } catch (err) {
    next(err)
  }
}
