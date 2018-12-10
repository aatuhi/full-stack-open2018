import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all/comments`)
  return response.data
}

const create = async (blog, content) => {
  const response = await axios.post(`${baseUrl}/${blog._id}/comments`, content)
  console.log(response)
  return response.data
}

const removeAll = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog._id}/comments`)
  return response.status
}

export default { getAll, create, removeAll }
