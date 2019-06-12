import axios from 'axios'

const service = axios.create({
    //baseURL: '/api',
  })

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

service.interceptors.request.use( config => {
    // if (store.getters.token) {
    //     config.headers['Authorization'] = getToken()
    //   }
      return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
      })

      service.interceptors.response.use( response => response,
        error => {
          console.log('err' + error) 
          return Promise.reject(error)
        }
      )

export default service