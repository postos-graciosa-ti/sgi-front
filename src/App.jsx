import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserSessionStore from './data/userSession'
import login from './requests/login'
import { useTranslation } from 'react-i18next'

function App() {
  const navigate = useNavigate()

  const { i18n } = useTranslation()

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const setBearerToken = useUserSessionStore(state => state.setBearerToken)

  useEffect(() => {
    document.documentElement.lang = i18n.language

  }, [i18n.language])

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
        <h2>Sistema de gestão integrado (SGI) Postos Graciosa</h2>

        <form onSubmit={(e) => handleLogin(e)}>
          <div className="mb-3 mt-3">
            <h3>Entrar</h3>
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
    </>
  )
}

export default App