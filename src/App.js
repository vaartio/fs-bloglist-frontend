import React, { useState, useEffect } from 'react';

import login from './services/login' 
import blogService from './services/blogs'

import Notification from './components/Notification'
import Login from './components/Login'
import UserBlogs from './components/UserBlogs'

function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const toggleRef = React.createRef()

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

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleCreateBlog = async (event, newBlog) => {
    event.preventDefault()
    await blogService.create(newBlog)
    const initialBlogs = await blogService.getAll()
    setBlogs(initialBlogs)
    setNotification(`a new blog "${newBlog.title}" added!`)
    toggleRef.current.toggleVisibility()
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(updatedBlog.id, updatedBlog)
    const initialBlogs = await blogService.getAll()
    setBlogs(initialBlogs)
    setNotification(`you liked a blog "${updatedBlog.title}"!`)
  }

  const handleRemove = async (event, blog) => {
    event.preventDefault()
    if (window.confirm(`remove blog "${blog.title}" by ${blog.author}?`)) { 
      await blogService.remove(blog.id)
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
      setNotification(`you removed blog "${blog.title}" by ${blog.author}`)
    }
  }

  return (
    <div className="App">
      <Notification message={message} />
      <header className="App-header">
      {
        user === null ?
        <Login
          username={username}
          password={password}
          onUsernameChange={onUsernameChange}
          onPasswordChange={onPasswordChange}
          onSubmit={handleLogin} /> :
        <UserBlogs
          blogs={blogs}
          user={user}
          onLogoutClick={handleLogout}
          newBlogTitle={newBlogTitle} setNewBlogTitle={setNewBlogTitle}
          newBlogAuthor={newBlogAuthor} setNewBlogAuthor={setNewBlogAuthor}
          newBlogUrl={newBlogUrl} setNewBlogUrl={setNewBlogUrl}
          onCreateBlogClick={handleCreateBlog}
          toggleRef={toggleRef}
          onLike={handleLike}
          onRemove={handleRemove} />
      }
      </header>
    </div>
  );
}

export default App;
