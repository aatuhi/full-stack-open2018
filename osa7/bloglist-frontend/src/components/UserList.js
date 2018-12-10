import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

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

const mapStateToProps = (state, ownProps) => {
  console.log('userlist ownprops', ownProps)
  return { users: state.users }
}

const ConnectedUserList = connect(mapStateToProps)(UserList)

export default ConnectedUserList
