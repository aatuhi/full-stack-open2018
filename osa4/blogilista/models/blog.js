const mongoose = require('mongoose')

const url = 'mongodb://arthur:sensei1@ds133353.mlab.com:33353/blogilista'
mongoose.connect(url)

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number,
})

module.exports = Blog
