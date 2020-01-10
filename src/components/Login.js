import React from 'react'
import { connect } from 'react-redux'

import { login } from '../reducers/userReducer'

const Login = (props) => {
  const loginClick = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    props.login(username, password)
  }

  return (
      <>
      <h2>Log to application</h2>
      <form onSubmit={loginClick}>
        <div>
          username
          <input type="text" name="username" />
        </div>
        <div>
          password
          <input type="password" name="password" />
        </div>
        <button type="submit">login</button>
      </form>
      </>
  )
}

export default connect(null, { login })(Login)
