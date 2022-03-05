import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'

const port = 3000

// Set up the express app
const app = express()

const upload = multer()

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// for parsing multipart/form-data
app.use(upload.array())
app.use(express.static('public'))

// Set up CORS
app.use(cors())

app.use(function (req, res) {
  res.send(404)
})

app.listen(port, () => {
  console.log(`Email app listening at http://localhost:${port}`)
})
