import loginService from '../services/login'
import blogService from '../services/blogs'

export const ACTION_SET_LOCAL_USER = 'SET_LOCAL_USER'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_LOCAL_USER:
      return action.data
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    let loggedInUser
    try {
        loggedInUser = await loginService.login({ username: username, password: password })
        window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    }
    catch (exception) {
        console.warn('login failed', exception)
        loggedInUser = {
          error: 'login failed'
        }
    }
    dispatch({
      type: ACTION_SET_LOCAL_USER,
      data: loggedInUser,
  })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch({
      type: ACTION_SET_LOCAL_USER,
      data: null,
    })
  }
}

export const getLocalUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch({
      type: ACTION_SET_LOCAL_USER,
      data: user,
    })
  }
}

export default userReducer
