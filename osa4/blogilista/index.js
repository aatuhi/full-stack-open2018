console.log('hello world')

const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs')

const getData = request => {
  JSON.stringify(request.body)
}

morgan.token('data', getData)

app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

app.get('/', (request, response) => {
  response.send('<h2>Blogilista<h2>')
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
