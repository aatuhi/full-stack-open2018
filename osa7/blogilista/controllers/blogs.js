const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

const formatBlog = blog => ({
  _id: blog._id,
  title: blog.title,
  url: blog.url,
  author: blog.author,
  likes: blog.likes,
  user: blog.user,
})

const formatComment = comment => ({
  _id: comment._id,
  content: comment.content,
  likes: comment.likes,
  blog: comment.blog,
})

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return response.json(blogs.map(formatBlog))
  } catch (exception) {
    console.log(exception)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    return response.json(formatBlog(blog))
  } catch (exception) {
    console.log(exception)
  }
})

blogsRouter.get('/all/comments', async (request, response) => {
  try {
    const comments = await Comment.find({}).populate('blog', {
      title: 1,
    })
    return response.json(comments)
  } catch (exception) {
    console.log(exception)
  }
})

blogsRouter.get('/:id/comments', async (request, response) => {
  try {
    const comments = await Comment.find({ blog: request.params.id }).populate('blog', {
      title: 1,
    })
    return response.json(comments.map(formatComment))
  } catch (exception) {
    console.log(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request
  try {
    if (body.content.length < 1 || body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    const comment = new Comment({
      content: body.content,
      likes: body.likes === undefined ? 0 : body.likes,
      blog: request.params.id,
    })

    const savedComment = await comment.save()
    return response.status(201).json(savedComment)
  } catch (exception) {
    console.log(exception)
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

    return response.status(201).json(formatBlog(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: exception.message })
    }
    return response.status(500).json({ error: 'something went wrong...' })
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
      return response.status(401).json({ error: exception.message })
    }
    console.log(exception)
    return response.status(500).json({ error: 'something went wrong...' })
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
    return response.json(formatBlog(blog))
  } catch (expection) {
    console.log(expection)
    return response.status(400).send({ error: 'malformatted id ' })
  }
})

module.exports = blogsRouter
