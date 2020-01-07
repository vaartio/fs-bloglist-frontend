import React from 'react'

const getStyle = type => {
  if (type === 'error') {
    return {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
  }
  else {
    return {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
  }
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = getStyle(message.type)

  return (
    <div style={style}>
      {message.message}
    </div>
  )
}

export default Notification
