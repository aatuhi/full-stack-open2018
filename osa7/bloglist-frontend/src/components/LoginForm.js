import React from 'react'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button, Input } from 'semantic-ui-react'

const LoginForm = props => {
  return (
    <div className="login-form">
      <h2>Log in to application</h2>
      <Form onSubmit={props.onLogin}>
        <Form.Field>
          <label>username</label>
          <Input
            type="text"
            name="username"
            value={props.username}
            onChange={props.onFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <Input
            type="password"
            name="password"
            value={props.password}
            onChange={props.onFieldChange}
          />
        </Form.Field>
        <Button primary type="submit">
          Log in
        </Button>
      </Form>
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
