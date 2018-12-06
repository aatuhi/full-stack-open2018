import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  // error: validate dom nesting
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
          {users.map(user => (
            <tr key={user._id}>
              <Link to={`/users/${user._id}`}>
                <td>{user.username}</td>
              </Link>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
