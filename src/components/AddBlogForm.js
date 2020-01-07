import React from 'react'

const AddBlogForm = (props) => {
    return (
      <form onSubmit={(event) => props.onSubmit(event, { title: props.newBlogTitle, author: props.newBlogAuthor, url: props.newBlogUrl })}>
        <div>
          title: <input value={props.newBlogTitle} onChange={(event) => props.setNewBlogTitle(event.target.value)} />
        </div>
        <div>
          author: <input value={props.newBlogAuthor} onChange={(event) => props.setNewBlogAuthor(event.target.value)} />
        </div>
        <div>
          url: <input value={props.newBlogUrl} onChange={(event) => props.setNewBlogUrl(event.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    )
}

export default AddBlogForm
