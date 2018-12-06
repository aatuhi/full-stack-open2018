const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = user => ({
  _id: user._id,
  username: user.username,
  name: user.name,
  adult: user.adult,
  blogs: user.blogs,
})

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })

    response.json(users.map(formatUser))
  } catch (exception) {
    console.log(exception)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    console.log('body', body)

    const existing = await User.find({ username: body.username })
    if (existing.length > 0) {
      console.log('username failed')
      return response.status(400).json({ error: 'username already in use' })
    }

    console.log(body.username)
    if (body.username.length < 3) {
      console.log('username failed')
      return response.status(400).json({ error: 'username must be at least 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(formatUser(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter
