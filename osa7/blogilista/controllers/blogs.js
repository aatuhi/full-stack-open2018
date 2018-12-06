const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const formatBlog = blog => ({
  _id: blog._id,
  title: blog.title,
  url: blog.url,
  author: blog.author,
  likes: blog.likes,
  user: blog.user,
})

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(formatBlog))
  } catch (expection) {
    console.log(expection)
  }
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid ' })
    }

    if (body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'title and url missing ' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(formatBlog(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)

    if (blog.user !== undefined) {
      console.log('id does match: ', decodedToken.id.toString() === blog.user.toString())

      if (decodedToken.id.toString() !== blog.user.toString()) {
        return response.status(403).json({ error: 'id does not match' })
      }
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      console.log('id does not match')
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const { body } = request
    console.log(body)

    const blog = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log('updated')
    response.json(formatBlog(blog))
  } catch (expection) {
    console.log(expection)
    response.status(400).send({ error: 'malformatted id ' })
  }
})

module.exports = blogsRouter
