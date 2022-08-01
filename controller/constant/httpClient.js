import axios from "axios";
import { authStore } from "service";

const client = axios.create()
 
client.interceptors.request.use(async (config) => {
  // console.log(`authStore.getAuth?.token`, authStore.getAuth())
  // console.log('process.env.NEXT_PUBLIC_BASE_URL', process.env.NEXT_PUBLIC_BASE_URL)
  config.baseURL = process.env.NEXT_PUBLIC_BASE_URL
  config.headers['Authorization'] = `${authStore.getAuth()?.token ? `Bearer ${authStore.getAuth()?.token}` : ''}`
  // config.headers['Content-Type'] = 'application/json'
  // config.headers['Accept'] = 'application/json'
  // config.mode = 'no-cors'
  // config.crossdomain= true
  // config.credentials= 'same-origin'
  return config
}, (error) => {
  return Promise.reject(error)
})

client.interceptors.response.use(async (response) => {
  if (!response.data) {
    return Promise.reject(response)
  }
  return response
}, async (error) => {
  return Promise.reject(error.response)
})

export default client;