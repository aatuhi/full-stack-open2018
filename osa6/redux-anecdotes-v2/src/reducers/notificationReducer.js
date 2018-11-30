const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log(action)
      return action.notification
    default:
      return state
  }
}

export const setNotification = notification => ({
  type: 'SET_NOTIFICATION',
  notification: notification,
})

export default notificationReducer
