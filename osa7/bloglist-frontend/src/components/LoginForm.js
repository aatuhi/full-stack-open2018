import React from 'react'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { connect } from 'react-redux'

const LoginForm = props => {
  return (
    <div className="login-form">
      <h2>Log in to application</h2>
      <form onSubmit={props.onLogin}>
        <div>
          Username:
          <input
            type="text"
            name="username"
            value={props.username}
            onChange={props.onFieldChange}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={props.onFieldChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
}

const ConnectedLoginForm = connect(
  null,
  mapDispatchToProps,
)(LoginForm)

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
