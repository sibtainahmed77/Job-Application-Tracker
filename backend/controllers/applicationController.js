const Application = require('../models/Application')

exports.createApplication = async (req, res) => {
  try {
    const { company, title, jobType, location, salary, notes } = req.body

    if (!company || !title || !jobType || !location) {
      return res.status(400).json({ message: 'Company, title, job type, and location are required' })
    }

    const existingApplication = await Application.findOne({
      user: req.user.id,
      company: { $regex: new RegExp(`^${company}$`, 'i') },
      title: { $regex: new RegExp(`^${title}$`, 'i') }
    })

    if (existingApplication) {
      return res.status(400).json({ message: `You have already applied for the ${title} position at ${company}` })
    }

    const application = new Application({
      user: req.user.id,
      company,
      title,
      jobType,
      location,
      salary,
      notes
    })

    const savedApplication = await application.save()
    res.status(201).json(savedApplication)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.getApplications = async (req, res) => {
  try {
    const { status, company } = req.query
    const filter = { user: req.user.id }

    if (status) filter.status = status
    if (company) filter.company = { $regex: company, $options: 'i' }

    const list = await Application.find(filter).sort({ createdAt: -1 })
    res.json(list)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const application = await Application.findById(id)

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this application' })
    }

    Object.assign(application, updates)
    const updatedApplication = await application.save()
    res.json(updatedApplication)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params
    const application = await Application.findById(id)

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    if (application.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this application' })
    }

    await application.deleteOne()
    res.json({ message: 'Application removed successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}