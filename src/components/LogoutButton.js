import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../reducers/userReducer'

const LogoutButton = ({ logout }) => {
  
  const logoutClick = (event) => {
    event.preventDefault()
    logout()
  }

  return (
    <button type="button" onClick={logoutClick}>logout</button>
  )
}

export default connect(null, { logout })(LogoutButton)
