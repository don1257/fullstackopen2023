import axios from 'axios'
const baseUrl = '/api/persons'

const getAllNotes = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const updateNotes = (newObject) => {
    const request = axios.post(`${baseUrl}`, newObject)
    return request.then(response => response.data)
}

const deleteNotes = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {updateNotes, getAllNotes, deleteNotes}
