import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  console.log('Commentreduced action', action)
  switch (action.type) {
    case 'INIT_COMMENTS':
      return action.data
    case 'CREATE_COMMENT':
      return [...state, action.data]
    default:
      return state
  }
}

export const commentInitialization = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    })
  }
}

export const commentCreation = (blog, content) => {
  return async dispatch => {
    const comment = await commentService.create(blog, content)
    dispatch({
      type: 'CREATE_COMMENT',
      data: comment,
    })
  }
}

export default commentReducer
