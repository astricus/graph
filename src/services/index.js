import ApiClient from './apiClient'
const {
  REACT_APP_API_ENDPOINT,
} = process.env

const graphApi = new ApiClient(`${REACT_APP_API_ENDPOINT}/api`, false)

export { graphApi }
