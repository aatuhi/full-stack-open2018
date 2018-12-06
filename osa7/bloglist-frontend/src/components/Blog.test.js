import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.skip('<Blog />', () => {
  const blog = {
    _id: '123456',
    title: 'Testi Blogi',
    url: 'www.testiblogi.fi',
    author: 'Tero Testimies',
    likes: 100,
    user: {
      _id: '321321',
      username: 'Tintti5',
      name: 'Kalle Kayttaja',
    },
  }

  let blogComponent

  beforeEach(() => {
    blogComponent = shallow(<Blog blog={blog} currentUser={blog.user.username} />)
  })

  it('only title and author are visible by default', () => {
    // wrapper div jää testin ulkopuolelle
    const titleDiv = blogComponent.find('.title')
    console.log(titleDiv.debug())

    expect(titleDiv.text()).toEqual(`${blog.title} ${blog.author}`)
  })

  it('when title is clicked blog details are revealed', () => {
    const titleDiv = blogComponent.find('.blog-unselected')
    titleDiv.simulate('click')
    const contentDiv = blogComponent.find('.blog-selected')
    expect(contentDiv.text()).toContain(
      blog.title && blog.author && blog.url && blog.likes && blog.user.name,
    )
  })
})
