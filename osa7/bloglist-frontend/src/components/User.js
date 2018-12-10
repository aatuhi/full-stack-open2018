import React from 'react'
import { connect } from 'react-redux'

const User = ({ user }) => {
  console.log('user', user)
  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <div>also known as {user.username}</div>
          <h3>Added blogs:</h3>
          <ul>
            {user.blogs.length > 0 && user.blogs.map(blog => <li key={blog._id}>{blog.title}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('user ownProps', ownProps)
  return { user: ownProps.user }
}

const ConnectedUser = connect(mapStateToProps)(User)

export default ConnectedUser
