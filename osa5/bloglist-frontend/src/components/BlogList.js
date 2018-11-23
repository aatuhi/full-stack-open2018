import React from 'react'
import Blog from './Blog'

const BlogList = props => {
  return (
    <div>
      <h2>Blogs</h2>
      <h3>Click a title!</h3>
      <ul style={{ listStyleType: 'square' }}>
        {props.blogs.map(blog => (
          <Blog
            key={blog._id}
            blog={blog}
            onBlogLike={props.onBlogLike}
            onDeleteBlog={props.onDeleteBlog}
          />
        ))}
      </ul>
    </div>
  )
}

export default BlogList
