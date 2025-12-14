const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController')

router.post('/applications', auth, createApplication)
router.get('/applications', auth, getApplications)
router.put('/applications/:id', auth, updateApplication)
router.delete('/applications/:id', auth, deleteApplication)

module.exports = router
