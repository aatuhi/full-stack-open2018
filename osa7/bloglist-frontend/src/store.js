import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer,
  blogs: blogReducer,
  user: loggedUserReducer,
  comments: commentReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
