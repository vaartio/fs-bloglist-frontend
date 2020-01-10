import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setNotification } from './reducers/noficationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import { useField } from './hooks/index'
import login from './services/login'
import blogService from './services/blogs'

import Notification from './components/Notification'
import Login from './components/Login'
import UserBlogs from './components/UserBlogs'



function App({ setNotification, initializeBlogs }) {
  useEffect(() => {
    initializeBlogs()
  },[])

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await login({ username: username.value, password: password.value })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      username.reset()
      password.reset()
    }
    catch (exception) {
      setNotification('login failed', 5, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <div className="App">
      <Notification />
      <header className="App-header">
        {
          user === null ?
            <Login
              username={username}
              password={password}
              onSubmit={handleLogin} /> :
            <UserBlogs
              user={user}
              onLogoutClick={handleLogout}
            />
        }
      </header>
    </div>
  )
}

export default connect(null, { setNotification, initializeBlogs })(App)
