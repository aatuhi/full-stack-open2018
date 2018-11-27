import { mount } from 'enzyme'
import React from 'react'
import App from './App'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import blogService from './services/blogs'
jest.mock('./services/blogs')

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      expect(app.exists('.login-form')).toEqual(true)
      expect(app.exists('.blog-form')).toEqual(false)
      expect(app.exists('.blog-list')).toEqual(false)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja',
      }
      app = mount(<App />)
      app.setState({ user: user })
    })

    it('all notes are rendered', () => {
      app.update()
      const blogs = app.find(Blog)
      expect(blogs.length).toEqual(blogService.blogs.length)
    })
  })
})
