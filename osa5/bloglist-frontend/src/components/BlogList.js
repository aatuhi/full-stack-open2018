import React from 'react'
import Blog from './Blog'

const BlogList = props => {
  return (
    <div>
      <h2>Blogs</h2>
      {props.blogs.map(blog => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
