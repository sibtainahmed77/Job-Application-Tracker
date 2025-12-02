const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err.message))

const authRoute = require('./routes/authRoutes')
const applicationRoute = require('./routes/applicationRoutes')

app.use('/api', authRoute)
app.use('/api', applicationRoute)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
