const notificationReducer = (state = null, action) => {
  console.log('Notification action', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, duration) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification,
    })
    console.log('timeout')
    setTimeout(
      () =>
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: null,
        }),
      duration * 1000,
    )
  }
}

export default notificationReducer
