import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addOne = (details) => {
  const config = {
    headers: { Authorization: token }
  }


  const request = axios.post(baseUrl, details, config)
  return request.then(response => response.data)
}

const upLike = (details) => {

  const urlResource = `${baseUrl}/${details.id}`

  const updatedDetails = {
    ...details,
    likes: details.likes != null ? details.likes + 1 : 1
  };

  const request = axios.put(urlResource, updatedDetails)

  return request.then(res => res.data)
}

const deleteBlog = (details) => {

  const urlResource = `${baseUrl}/${details.id}`
  const request = axios.delete(urlResource)

  return request.then(res => res.data)

}

const addComment = (details) => {

  const urlResource = `${baseUrl}/${details.id}/comments`
  const request = axios.post(urlResource, details)

  return request.then(res => res.data)

}

export default { getAll, addOne, setToken, upLike, deleteBlog, addComment }
