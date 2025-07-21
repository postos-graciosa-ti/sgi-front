import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useUserSessionStore from '../data/userSession';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json"

    config.headers["ngrok-skip-browser-warning"] = "true"

    const token = useUserSessionStore.getState().bearerToken

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const navigate = useNavigate()

      navigate('/')
    }

    return Promise.reject(error)
  }
)

export default api
