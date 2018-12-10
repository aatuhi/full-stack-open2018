import userService from '../services/users'

const userReducer = (state = [], action) => {
  console.log('Users action', action)
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'CREATE_USER':
      return [...state, action.data]
    default:
      return state
  }
}

export const userInitialization = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default userReducer
