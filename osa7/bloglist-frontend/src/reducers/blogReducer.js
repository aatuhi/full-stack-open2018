import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('Blogreducer action', action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'CREATE_BLOG':
      const newState = [...state, action.data]
      return newState.sort((a, b) => b.likes - a.likes)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog._id !== action.data._id).sort((a, b) => b.likes - a.likes)
    case 'LIKE_BLOG':
      const blogsWithoutLikedBlog = state.filter(blog => blog._id !== action.data._id)
      const blogToLike = state.find(blog => blog._id === action.data._id)
      const updatedBlogs = [
        ...blogsWithoutLikedBlog,
        { ...blogToLike, likes: blogToLike.likes + 1 },
      ]
      return updatedBlogs.sort((a, b) => b.likes - a.likes)
    default:
      return state
  }
}

export const blogInitialization = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const blogCreation = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog,
    })
  }
}

export const blogRemoval = blog => {
  return async dispatch => {
    await blogService.remove(blog._id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    })
  }
}

export const blogLiking = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('likedblog', likedBlog)
    await blogService.update(blog._id, likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: blog,
    })
  }
}

export default blogReducer
