import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
  it('renders blog properties', () => {
    const simpleBlog = {
      title: 'Title',
      author: 'Author',
      likes: 5,
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const wrapperDiv = simpleBlogComponent.find('.wrapper')

    expect(wrapperDiv.text()).toContain(simpleBlog.title && simpleBlog.author && simpleBlog.likes)
  })

  it('if button is clicked twice the event is called twice', () => {
    const simpleBlog = {
      title: 'Title',
      author: 'Author',
      likes: 5,
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={mockHandler} />)
    console.log(simpleBlogComponent.debug())

    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
