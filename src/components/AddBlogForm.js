import React from 'react'
import { connect } from 'react-redux'

import { blogCreate } from '../reducers/blogReducer'
import { setNotification } from '../reducers/noficationReducer'

const AddBlogForm = (props) => {

  const createBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    props.toggle.current.toggleVisibility()
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    props.blogCreate({ title, author, url })
    props.setNotification(`a new blog "${title}" added!`)
  }

  return (
    <form onSubmit={createBlog}>
      <div>
          title: <input name="title" />
      </div>
      <div>
          author: <input name="author" />
      </div>
      <div>
          url: <input name="url" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default connect(null, { blogCreate, setNotification })(AddBlogForm)
