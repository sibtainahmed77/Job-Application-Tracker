const Application = require('../models/Application');

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const { company, title, jobType, location, salary, notes, status } = req.body;
    const newApp = new Application({
      user: req.user.id,
      company,
      title,
      jobType,
      location,
      salary,
      notes,
      status: status || 'Applied'
    });
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(400).json({ message: 'Validation Error', error: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    let app = await Application.findById(req.params.id);
    if (!app || app.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Not authorized or not found' });
    }
    app = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app || app.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Not authorized or not found' });
    }
    await app.deleteOne();
    res.json({ message: 'Application removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};