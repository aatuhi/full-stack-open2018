import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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

const mapStateToProps = state => ({
  blogs: state.blogs,
})

const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList
