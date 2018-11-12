const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

describe('/api/blogs/ tests', () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })
  test('blogs are returned in json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned when get-method is used', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a blog can be added with post-method', async () => {
    const newBlog = {
      title: 'POST-metodin testiblogi',
      author: 'Tero Testaaja',
      url: 'www.testari.fi',
      likes: 1,
    }

    const blogsBefore = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)

    const titles = blogsAfter.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('if likes not defined, set the value to 0', async () => {
    const newBlog = {
      title: 'No Likes',
      author: 'Epä Suosittu',
      url: 'www.epäsuosittublogi.tk',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const blogs = await helper.blogsInDb()
    const addedBlog = blogs.find(b => b.title === 'No Likes')

    expect(addedBlog.likes).toBe(0)
  })

  test('missing title and url properties causes error status 400', async () => {
    const newBlog = {
      author: 'Noourlandtitle',
      likes: 90,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('a blog can be deleted', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToBeRemoved = blogsBefore[1]

    await api.delete(`/api/blogs/${blogToBeRemoved.id}`).expect(204)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
  })
})

describe('/api/users/ tests', () => {
  beforeAll(async () => {
    await User.remove({})

    const userObjects = helper.initialUsers.map(u => new User(u))
    await Promise.all(userObjects.map(u => u.save()))
  })

  test('an user can be created with valid credentials', async () => {
    const newUser = {
      username: 'kimbembe100',
      name: 'Kimmo Käyttäjä',
      adult: false,
      password: 'salasana',
    }

    const usersBefore = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter.length).toBe(usersBefore.length + 1)
  })

  test('if adult status not definded set it to true', async () => {
    const newUser = {
      username: 'ville2432',
      name: 'Ville Viikari',
      password: 'salasana',
    }

    const usersBefore = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length + 1)

    const addedUser = await User.find({ username: newUser.username })
    expect(addedUser[0].adult).toBe(true)
  })

  test('if username is not unique throw error 400', async () => {
    const newUser = {
      username: 'kayttajatunnus',
      name: 'Tunnus',
      adult: true,
      password: 'salasana123',
    }

    const usersBefore = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.lenght).toBe(usersBefore.lenght)
  })

  test('if username is under 3 characters throw error 400', async () => {
    const newUser = {
      username: 'ka',
      name: 'Tunnus',
      adult: true,
      password: 'salasana123',
    }

    const usersBefore = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.lenght).toBe(usersBefore.lenght)
  })
})

afterAll(() => server.close())
