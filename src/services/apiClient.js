import axios from 'axios'
// import { tokenInterceptor, unauthorizedInterceptor } from './authorization'

export default class ApiClient {
  constructor (baseURL, auth = true, token) {
    this.baseURL = baseURL
    this.httpClient = axios.create({ baseURL })
    // if (auth) {
    //   this.httpClient.interceptors.request.use(config => tokenInterceptor(config, token))
    // }
    // this.httpClient.interceptors.response.use(null, unauthorizedInterceptor)
  }

  delete ({ endpoint, params = {}, options = {} }) {
    return this.httpClient.delete(endpoint, {
      params,
      ...options,
    })
  }

  get ({ endpoint, params = {}, options = {} }) {
    return this.httpClient.get(endpoint, {
      params,
      ...options,
    })
  }

  patch ({ endpoint, data, options = {} }) {
    return this.httpClient.patch(endpoint, data, options)
  }

  post ({ endpoint, params, data, options = {} }) {
    return this.httpClient.post(endpoint, data, { params })
  }

  put ({ endpoint, data, options = {} }) {
    return this.httpClient.put(endpoint, data, options)
  }

  postUrlencoded ({ endpoint, data, options }) {
    options = options || {}

    return this.httpClient.post(endpoint, data, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  upload ({ endpoint, data, options }) {
    options = options || {}

    return this.httpClient.post(endpoint, data, {
      ...options,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...options.headers,
      },
    })
  }

  uploadPut ({ endpoint, data, options }) {
    options = options || {}

    return this.httpClient.put(endpoint, data, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  download ({ endpoint, params = {}, options = {} }) {
    return this.httpClient({
      url: endpoint,
      method: 'GET',
      responseType: 'blob',
      params,
    })
  }

  postDownload ({ endpoint, data, options }) {
    return this.httpClient({
      url: endpoint,
      method: 'POST',
      data,
      responseType: 'blob',
      options,
    })
  }
}
