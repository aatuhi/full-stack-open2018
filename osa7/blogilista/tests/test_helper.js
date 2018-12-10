const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

const initialBlogs = [
  {
    title: 'testi-blogi-1',
    author: 'marustiina jarustiina',
    url: 'www.marsu.fi',
    likes: 123,
  },
  {
    title: 'testi-blogi-2',
    author: 'niko bloggari',
    url: 'www.bloginiko.fi',
    likes: 600,
  },
]

const initialUsers = [
  {
    username: 'kayttajatunnus',
    name: 'Tunnus',
    adult: true,
    password: 'salasana123',
  },
  {
    username: 'kayttaja1',
    name: 'Kayttaja',
    adult: false,
    password: 'salasana123',
  },
]

const initialComments = [
  {
    content: 'comment 1',
    likes: 1,
  },
  {
    content: 'comment 2',
    likes: 20,
  },
  {
    content: 'comment 3',
    likes: 3,
  },
  {
    content: 'comment 4',
    likes: 400,
  },
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]
const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const formatBlog = blog => ({
  id: blog._id,
  title: blog.title,
  url: blog.url,
  author: blog.author,
  likes: blog.likes,
})

const formatUser = user => ({
  _id: user._id,
  username: user.username,
  name: user.name,
  adult: user.adult,
})

const formatComment = comment => ({
  _id: comment._id,
  content: comment.content,
  likes: comment.likes,
})

const commentsInDb = async () => {
  const comments = await Comment.find({})
  return comments.map(formatComment)
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(formatBlog)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(formatUser)
}

module.exports = {
  initialBlogs,
  formatBlog,
  blogsInDb,
  usersInDb,
  formatUser,
  initialUsers,
  listWithMultipleBlogs,
  listWithOneBlog,
  initialComments,
}
