import React from 'react'

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
            onChange={props.onLoginFieldChange}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            name="password"
            value={props.password}
            onChange={props.onLoginFieldChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
