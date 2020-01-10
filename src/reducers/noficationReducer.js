const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      default:
        return state
    }
  }
    
  
  export const setNotification = (text, seconds = 5) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: text,
      })
      await new Promise(resolve => setTimeout(resolve, seconds * 1000));
      dispatch({
        type: 'SET_NOTIFICATION',
        data: null,
      })
    }
  }
    
  export default notificationReducer
  