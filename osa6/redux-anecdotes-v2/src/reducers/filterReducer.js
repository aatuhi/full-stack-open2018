const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      console.log(action)
      return action.filter
    default:
      return state
  }
}

export const changeFilter = filter => ({
  type: 'CHANGE_FILTER',
  filter: filter,
})

export default filterReducer
