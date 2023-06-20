import axios from 'axios'

export const getAllResources = async (baseUrl) => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNewResource = async (baseUrl, newObject) => {

    const response = await axios.post(baseUrl, newObject)
    return response.data
}
