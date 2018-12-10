import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const UserList = ({ users }) => {
  // error: validate dom nesting
  const headerStyle = {
    color: 'white',
    background: '#900C3F',
  }

  const listStyle = {
    color: '#900C3F',
    background: '#F7F7F7  ',
  }

  return (
    <div>
      <h2>Users</h2>
      <Table singleLine inverted>
        <Table.Header style={headerStyle}>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={listStyle}>
          {users.map(user => (
            <Table.Row key={user._id}>
              <Table.Cell>
                <Link to={`/users/${user._id}`}>{user.username}</Link>
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('userlist ownprops', ownProps)
  return { users: state.users }
}

const ConnectedUserList = connect(mapStateToProps)(UserList)

export default ConnectedUserList
