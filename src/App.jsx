import { useState } from 'react'
import Login from './requests/auth/login'
import axios from 'axios'
import useUserSessionStore from './data/userSession'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()
  
  const userSession = useUserSessionStore(state => state.userSession)

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const handleLogin = (e) => {
    e.preventDefault()

    axios
      .post("http://localhost:8000/login", {
        "email": email,
        "password": password
      })
      .then((response) => {
        setUserSession(response.data)

        navigate('/steps', { replace: true })
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <div className="container mt-4">
        <form onSubmit={(e) => handleLogin(e)}>
          <h1 className="mb-4">Entrar</h1>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="E-mail"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App