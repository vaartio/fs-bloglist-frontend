import React from 'react'

import LogoutButton from './LogoutButton'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'

const UserBlogs = (props) => {
    const userBlogs = props.blogs.filter(blog => blog.user.username === props.user.username)
    return (
      <div>
        <h2>blogs</h2>
        <p>{props.user.name} logged in {<LogoutButton onClick={props.onLogoutClick} />}</p>
        <h2>create new</h2>
        <AddBlogForm 
          newBlogTitle={props.newBlogTitle} setNewBlogTitle={props.setNewBlogTitle}
          newBlogAuthor={props.newBlogAuthor} setNewBlogAuthor={props.setNewBlogAuthor}
          newBlogUrl={props.newBlogUrl} setNewBlogUrl={props.setNewBlogUrl}
          onSubmit={props.onCreateBlogClick} />
        <h2>user blogs</h2>
        {userBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default UserBlogs
