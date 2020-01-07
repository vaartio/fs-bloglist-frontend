import React, { useState, useEffect } from 'react';

import login from './services/login' 
import blogService from './services/blogs'
import Notification from './components/Notification'
import Blog from './components/Blog'

//import logo from './logo.svg';
//import './App.css';

function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNotification = (message, type = 'info') => {
    setMessage({
      message: message,
      type: type,
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setNotification(`login failed`, 'error')
    }
  }

  const BlogsView = (props) => {
    const userBlogs = props.blogs.filter(blog => blog.user.username === props.user.username)
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {userBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const LoginView = (props) => {
    return (
      <>
      <h2>Log to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </>
    )
  }

  return (
    <div className="App">
      <Notification message={message} />
      <header className="App-header">
      {
        user === null ? <LoginView /> : <BlogsView blogs={blogs} user={user} />
      }
      </header>
    </div>
  );
}

export default App;
