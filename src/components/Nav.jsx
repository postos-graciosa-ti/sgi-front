import { Link } from "react-router-dom"
import useUserSessionStore from "../data/userSession"

const Nav = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">SGI</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link className="nav-link" to="/home">Início</Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link" to="/scale">Escalas</Link>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cadastros
                </a>

                <ul class="dropdown-menu">
                  <li><Link className="dropdown-item" to="/workers">Colaboradores</Link></li>

                  <li><Link className="dropdown-item" to="/candidates">Candidatos</Link></li>

                  <li><Link className="dropdown-item" to="/turns">Turnos</Link></li>

                  {userSession.role_id == 1 && <li><Link className="dropdown-item" to="/subsidiaries">Filiais</Link></li>}

                  {userSession.role_id == 1 && <li><Link className="dropdown-item" to="/users">Usuários</Link></li>}
                </ul>
              </li>

              <li class="nav-item">
                <Link className="nav-link" to="/" onClick={() => setUserSession({})}>Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="m-3 text-end">
        <Link to="/steps">
          Você está visualizando dados de: {selectedSubsidiarie.label}
        </Link>
      </div>
    </>
  )
}

export default Nav
