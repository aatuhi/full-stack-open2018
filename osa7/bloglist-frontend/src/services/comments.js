import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all/comments`)
  return response.data
}

const create = async (blog, content) => {
  const response = await axios.post(`${baseUrl}/${blog._id}/comments`, content)
  return response.data
}

export default { getAll, create }
