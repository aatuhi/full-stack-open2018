import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = JSON.parse(window.localStorage.getItem('loggedUser'))

const loggedUserReducer = (state = initialState, action) => {
  console.log('Loggeduserreducer action', action)
  switch (action.type) {
    case 'LOG_IN':
      return action.data
    case 'LOG_OUT':
      return null
    default:
      return state
  }
}

export const userLoggingIn = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user,
    })
  }
}

export const userLoggingOut = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOG_OUT',
    })
  }
}

export default loggedUserReducer
