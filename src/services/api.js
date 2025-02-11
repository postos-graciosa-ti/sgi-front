import axios from "axios"
import useUserSessionStore from '../data/userSession'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})

api.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json"
    
    const token = useUserSessionStore.getState().bearerToken
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    } else {
      console.warn('Token não encontrado no zustand')
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

export default api
