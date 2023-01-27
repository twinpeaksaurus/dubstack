import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

const LoginForm = (props) => {
  return (
    <div className='container'>
      <br/>
      <Form onSubmit={props.handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label> <input id='username' type="text"
            value={props.username}
            name="Username" onChange={({ target }) =>
              props.setUsername(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label> <input id='password'
            type="password" value={props.password}
            name="Password" onChange={({ target }) =>
              props.setPassword(target.value)} />
        </Form.Group>
        <br />
        <button id='login-button' type="submit">Log In</button>
      </Form>
      <button id='register-button'>Register [Coming Soon]</button>
      <br/>
      <button id='register-button'>Forgot Password [Coming Soon]</button>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
