import { Link } from "react-router-dom"
import useUserSessionStore from "../data/userSession"

const Nav = () => {
  // const resetState = useUserSessionStore(state => state.resetState)

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
                <Link className="nav-link active" aria-current="page" to="/home">Início</Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ações
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/">
                      Sair
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/users">
                      Usuários
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item disabled" to="/users">
                      Quadro de funcionários
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/candidates">
                      Processos seletivos
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="m-3 text-end">
        <a href="#">
          Você está em: {selectedSubsidiarie.label}
        </a>
      </div>
    </>
  )
}

export default Nav