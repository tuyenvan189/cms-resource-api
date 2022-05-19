const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
dotenv.config()
app.use(cors())
//routes
const usersRoute = require('./routes/user')
const photosRoute = require('./routes/photo')
const productsRoute = require('./routes/product')
// const authRoute = require('./routes/auth')
// const filmRoute = require('./routes/film')
// env
const PORT = process.env.PORT || 8000

mongoose.connect(process.env.DB_CONNECT,{})
.then(x => {
  console.log(
    `Connected to Mongo! success`
  )
})
.catch(err => {
  console.error("Error connecting to mongo", err)
})


app.get('/', (req, res) => {
  res.send('API running successful')
})

app.use(express.json({ extended: false }))
app.use('/api/user', usersRoute)
app.use('/api/photo', photosRoute)
app.use('./api/product', productsRoute)
// app.use('/api/auth', authRoute)
// app.use('/api/film', filmRoute)

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})