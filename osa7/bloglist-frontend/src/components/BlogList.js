import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      <h2>Blogs</h2>
      <h3>Click a title!</h3>
      <ul style={{ listStyleType: 'square' }}>
        {blogs.map(blog => (
          <li key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogList
