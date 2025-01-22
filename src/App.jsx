import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserSessionStore from './data/userSession'
import login from './requests/login'
import api from './services/api'

function App() {
  const navigate = useNavigate()

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const setBearerToken = useUserSessionStore(state => state.setBearerToken)

  const handleLogin = (e) => {
    e.preventDefault()

    let formData = {
      "email": email,
      "password": password
    }

    login(formData)
      .then((response) => {
        setBearerToken(response.data.token)

        setUserSession(response.data.data)

        navigate('/steps', { replace: true })
      })
  }

  return (
    <>

      <div className="container mt-3">
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="mb-3 mt-3">
            <h1>Entrar</h1>

            <span>
              Seja bem vindo ao SGI (Sistema de Gestão integrado) da rede de postos Graciosa
            </span>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control w-100"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 text-end">
            <Link to="/first-access" className="btn btn-primary">
              Primeiro acesso
            </Link>

            <button type="submit" className="btn btn-success ms-2">
              Entrar
            </button>
          </div>
        </form>
      </div>


      {/* <div className="container mt-4">
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

            <Link to="/first-access" className="mt-2">
              Seu primeiro acesso?
            </Link>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              Entrar
            </button>
          </div>
        </form>
      </div> */}
    </>
  )
}

export default App