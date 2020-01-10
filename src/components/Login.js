import React from 'react'

const Login = (props) => {
  return (
      <>
      <h2>Log to application</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          username
          <input
            type="text"
            value={props.username.value}
            name="Username"
            onChange={props.username.onChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password.value}
            name="Password"
            onChange={props.password.onChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
  )
}

export default Login
//export default connect(null, { blogCreate, setNotification })(Login)
