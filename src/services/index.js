import ApiClient from './apiClient'
const {
  REACT_APP_API_URL,
} = process.env

const graphApi = new ApiClient(`${REACT_APP_API_URL}`, false)

export { graphApi }
