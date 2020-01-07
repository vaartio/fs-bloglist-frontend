import React from 'react'
import PropTypes from 'prop-types'

import LogoutButton from './LogoutButton'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

const UserBlogs = (props) => {
  const userBlogs = props.blogs.filter(blog => blog.user.username === props.user.username)
  const otherBlogs = props.blogs.filter(blog => blog.user.username !== props.user.username)
  return (
    <div>
      <h2>blogs</h2>
      <p>{props.user.name} logged in {<LogoutButton onClick={props.onLogoutClick} />}</p>
      <Togglable label="new blog" ref={props.toggleRef}>
        <h2>create new</h2>
        <AddBlogForm
          newBlogTitle={props.newBlogTitle} setNewBlogTitle={props.setNewBlogTitle}
          newBlogAuthor={props.newBlogAuthor} setNewBlogAuthor={props.setNewBlogAuthor}
          newBlogUrl={props.newBlogUrl} setNewBlogUrl={props.setNewBlogUrl}
          onSubmit={props.onCreateBlogClick} />
      </Togglable>
      <h2>user blogs</h2>
      {userBlogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <Blog key={blog.id} blog={blog} onLikeClicked={props.onLike} onRemoveClicked={props.onRemove} removeVisible={true} />
      )}
      <h2>blogs of other users</h2>
      {otherBlogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <Blog key={blog.id} blog={blog} onLikeClicked={props.onLike} onRemoveClicked={props.onRemove} removeVisible={false} />
      )}
    </div>
  )
}

UserBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  onCreateBlogClick: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default UserBlogs
