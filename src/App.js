import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import { getLocalUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import Notification from './components/Notification'
import Login from './components/Login'
import UserBlogs from './components/UserBlogs'
import Users from './components/Users'


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
        <Router>
        <Route exact path="/" render={() =>
            <>
            {
            user === null || user.error ?
              <Login /> :
              <UserBlogs />
            }
            </>
          } />
        <Route exact path="/users" render={() =>
             <Users />
        } />
        </Router>
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
