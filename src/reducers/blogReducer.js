import blogService from '../services/blogs'

export const ACTION_NEW_BLOG = 'NEW_BLOG'
export const ACTION_LIKE_BLOG = 'LIKE_BLOG'
export const ACTION_INIT_BLOG = 'INIT_BLOG'
export const ACTION_REMOVE_BLOG = 'REMOVE_BLOG'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_INIT_BLOG:
      return action.data
    case ACTION_NEW_BLOG:
      return [...state, action.data]
    case ACTION_LIKE_BLOG:
      return state.map(b =>
        b.id !== action.data.id ? b : action.data
      )
    case ACTION_REMOVE_BLOG:
        return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: ACTION_INIT_BLOG,
      data: blogs,
    })
  }
}

export const blogLike = object => {
  return async dispatch => {
    const blog = {...object, likes: object.likes + 1 }
    await blogService.update(blog.id, blog)
    dispatch({
      type: ACTION_LIKE_BLOG,
      data: blog,
    })
  }
}

export const blogCreate = content => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch({
      type: ACTION_NEW_BLOG,
      data: blog,
    })
  }
}

export const blogRemove = blog => {
    return async dispatch => {
      await blogService.remove(blog.id)
      dispatch({
        type: ACTION_REMOVE_BLOG,
        data: blog,
      })
    }
  }

export default blogReducer
