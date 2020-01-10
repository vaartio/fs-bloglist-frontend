import React from 'react'
import { connect } from 'react-redux'
import { blogLike, blogRemove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/noficationReducer'

import LogoutButton from './LogoutButton'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'

const UserBlogs = (props) => {
  const toggleRef = React.createRef()
  const likeClicked = async (blog) => {
    props.blogLike(blog)
    props.setNotification(`you liked a blog "${blog.title}"!`)
  }
  const removeClicked = async (blog) => {
    if (window.confirm(`remove blog "${blog.title}" by ${blog.author}?`)) {
      props.blogRemove(blog)
      setNotification(`you removed blog "${blog.title}" by ${blog.author}`)
    }
  }
console.log(props.blogs)
  const userBlogs = props.blogs.filter(blog => blog.user.username === props.user.username)
  const otherBlogs = props.blogs.filter(blog => blog.user.username !== props.user.username)

  return (
    <div>
      <h2>blogs</h2>
      <p>{props.user.name} logged in {<LogoutButton />}</p>
      <Togglable label="new blog" ref={toggleRef}>
        <h2>create new</h2>
        <AddBlogForm toggle={toggleRef} />
      </Togglable>
      <h2>user blogs</h2>
      {userBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLikeClicked={() => likeClicked(blog)} onRemoveClicked={() => removeClicked(blog)} removeVisible={true} />
      )}
      <h2>blogs of other users</h2>
      {otherBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLikeClicked={() => likeClicked(blog)} onRemoveClicked={() => removeClicked(blog)} removeVisible={false} />
      )}
    </div>
  )
}

const sortBlogs = (blogs) => blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

const mapStateToProps = (state) => {
  return {
      blogs: sortBlogs(state.blogs),
      user: state.user,
  }
}

const mapDispatchToProps = {
  blogLike,
  blogRemove,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBlogs)
