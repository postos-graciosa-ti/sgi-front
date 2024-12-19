import { Link } from "react-router-dom"
import useUserSessionStore from "../data/userSession"

const Nav = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SGI</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Início</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/candidates">Processos Seletivos</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/scale">Escalas</Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cadastros
                </a>

                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/workers">Colaboradores</Link></li>

                  <li><Link className="dropdown-item" to="/turns">Turnos</Link></li>

                  {userSession.role_id == 1 && <li><Link className="dropdown-item" to="/subsidiaries">Filiais</Link></li>}

                  {userSession.role_id == 1 && <li><Link className="dropdown-item" to="/users">Usuários</Link></li>}

                  {userSession.role_id == 1 && <li><Link className="dropdown-item" to="/functions">Funções</Link></li>}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setUserSession({})}>Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="m-3 text-end">
        <Link id="subsidiarie" to="/steps">
          Você está visualizando dados de: {selectedSubsidiarie.label}
        </Link>
      </div>
    </>
  )
}

export default Nav
