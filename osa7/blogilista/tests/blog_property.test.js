const listHelper = require('../utils/list_helper.js')
const helper = require('./test_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe.skip('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs equals the total likes of those', () => {
    const result = listHelper.totalLikes(helper.listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})

describe.skip('favorite blog', () => {
  test('equals the blog with most likes', () => {
    const result = listHelper.favoriteBlog(helper.listWithMultipleBlogs)
    expect(result).toEqual(helper.listWithMultipleBlogs[2])
  })
})

test.skip('equals the author with most blogs', () => {
  const authorWithMostBlogs = { author: 'Robert C. Martin', blogs: 3 }

  const result = listHelper.mostBlogs(helper.listWithMultipleBlogs)
  expect(result).toEqual(authorWithMostBlogs)
})
