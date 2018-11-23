import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = props => {
  return (
    <div>
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

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
