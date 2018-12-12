import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const NavigationBar = ({ user, handleLogout }) => {
  const navigationBarStyle = {
    color: '#D7B7B7',
    background: '#900C3F',
  }

  return (
    <React.Fragment>
      <Menu inverted style={navigationBarStyle}>
        <Link to="/">
          <Menu.Item link>Home</Menu.Item>
        </Link>
        <Link to="/blogs">
          <Menu.Item link>Blogs</Menu.Item>
        </Link>
        <Link to="/users">
          <Menu.Item link>Users</Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <Menu.Item>{user.name} logged in</Menu.Item>
          <Menu.Item link>
            <div onClick={handleLogout}>Log out</div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </React.Fragment>
  )
}

NavigationBar.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default NavigationBar
