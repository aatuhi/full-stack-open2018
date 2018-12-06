import React from 'react'

const Blog = ({ blog }) => {
  console.log('blog', blog)
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>{blog.likes}</div>
      <div>added by {blog.author}</div>
    </div>
  )
}

export default Blog
