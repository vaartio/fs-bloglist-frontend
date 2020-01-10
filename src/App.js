import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getLocalUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import Notification from './components/Notification'
import Login from './components/Login'
import UserBlogs from './components/UserBlogs'



function App({ user, getLocalUser, initializeBlogs }) {
  useEffect(() => {
    initializeBlogs()
  }, [])
  useEffect(() => {
    getLocalUser()
  }, [])

  return (
    <div className="App">
      <Notification />
      <header className="App-header">
        {
          user === null || user.error ?
            <Login /> :
            <UserBlogs />
        }
      </header>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}

export default connect(mapStateToProps, { getLocalUser, initializeBlogs })(App)
