require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const applicationRoutes = require('./routes/applicationRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.log(err))