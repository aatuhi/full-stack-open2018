import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      <h2>Blogs</h2>
      <h3>Click a title!</h3>
      <List as="ul" relaxed>
        {blogs.map(blog => (
          <List.Item as="li" key={blog._id}>
            <List.Content>
              {' '}
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

const mapStateToProps = state => ({
  blogs: state.blogs,
})

const ConnectedBlogList = connect(mapStateToProps)(BlogList)

export default ConnectedBlogList
