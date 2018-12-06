import React from 'react'

const Notification = props => {
  if (props.message === null) {
    return null
  }
  if (props.error) {
    return <div className="notification-bad"> {props.message} </div>
  }
  return <div className="notification-good"> {props.message} </div>
}

export default Notification
