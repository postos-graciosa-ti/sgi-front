import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUserSessionStore from './data/userSession'
import login from './requests/login'

function App() {
  const navigate = useNavigate()

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const userSession = useUserSessionStore(state => state.userSession)

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const handleLogin = (e) => {
    e.preventDefault()

    let formData = {
      "email": email,
      "password": password
    }

    login(formData)
      .then((response) => {
        setUserSession(response.data)

        navigate('/steps', { replace: true })
      })
      .catch((error) => console.error(error))
  }

  return (
    <>

      <div className="d-grid w-100" style={{ height: '100vh', placeItems: 'center' }}>
        <form onSubmit={(e) => handleLogin(e)}>
          <h1 className="mb-4">Entrar</h1>

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