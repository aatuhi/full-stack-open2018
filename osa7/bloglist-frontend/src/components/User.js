import React from 'react'

const User = ({ user }) => {
  console.log('user', user)
  return (
    <div>
      <h2>{user.name}</h2>
      <div>also known as {user.username}</div>
      <h3>Added blogs:</h3>
      <ul>{user.blogs.length > 0 && user.blogs.map(blog => <li>{blog.title}</li>)}</ul>
    </div>
  )
}

export default User
