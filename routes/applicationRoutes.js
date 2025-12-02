const express = require('express')
const router = express.Router()
const Application = require('../models/Application')
const auth = require('../middleware/authMiddleware')

router.post('/applications', auth, async (req, res) => {
  try {
    const app = new Application({ ...req.body, user: req.user.id })
    const saved = await app.save()
    res.json(saved)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/applications', auth, async (req, res) => {
  try {
    const list = await Application.find({ user: req.user.id })
    res.json(list)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.put('/applications/:id', auth, async (req, res) => {
  try {
    const updated = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/applications/:id', auth, async (req, res) => {
  try {
    const deleted = await Application.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    res.json(deleted)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
