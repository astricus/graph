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
    // middleware for graph manipulation
    if (typeof data === 'object') {
      data.in_format = 'json';
      data.out_format = 'expo';
      data.width = Math.round(0.75 * window.innerWidth);
      data.height = Math.round(0.75 * window.innerHeight);
    }
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
    // middleware for file or url upload
    if (data instanceof FormData) {
      data.append('in_format', 'json');
      data.append('out_format', 'expo');
      data.append('width', Math.round(0.75 * window.innerWidth));
      data.append('height', Math.round(0.75 * window.innerHeight));
    }
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
