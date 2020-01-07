import React from 'react'

const AddBlogForm = (props) => {
  return (
    <form onSubmit={(event) => props.onSubmit(event, { title: props.newBlogTitle.value, author: props.newBlogAuthor.value, url: props.newBlogUrl.value })}>
      <div>
          title: <input value={props.newBlogTitle.value} onChange={props.newBlogTitle.onChange} />
      </div>
      <div>
          author: <input value={props.newBlogAuthor.value} onChange={props.newBlogAuthor.onChange} />
      </div>
      <div>
          url: <input value={props.newBlogUrl.value} onChange={props.newBlogUrl.onChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AddBlogForm
