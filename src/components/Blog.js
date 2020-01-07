import React, { useState } from 'react'

const Blog = ({ blog, onLikeClicked, onRemoveClicked, removeVisible }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    setExpanded(!expanded)
  }

  const CollapsedView = ({blog}) => (
    <div>
      {blog.title}, {blog.author}
    </div>
  )

  const ExpandedView = ({blog}) => (
    <div>
      <p>
        {blog.title}, {blog.author}<br/>
        {blog.url}<br/>
        {blog.likes} likes <button onClick={(event) => onLikeClicked(event, blog) }>like</button><br/>
        added by {blog.user.name}
        {removeVisible ?
          <>
          <br/>
          <button onClick={(event) => onRemoveClicked(event, blog) }>remove</button>
          </> : <></>
        }
      </p>
    </div>
  )

  return (
    <div style={blogStyle} onClick={toggle}>
    {
      expanded === false ?
      <CollapsedView blog={blog} />
      :
      <ExpandedView blog={blog} />
    }
    </div>
  )
}

export default Blog