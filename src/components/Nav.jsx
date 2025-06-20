import { useEffect, useState } from "react"
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import useUserSessionStore from "../data/userSession"
import useWorkersExperienceTimeStore from "../data/workersExperienceTime"
import api from "../services/api"

export const ChangePasswordModal = (props) => {
  const { changePasswordModalOpen, setChangePasswordModalOpen } = props

  const navigate = useNavigate()

  const [email, setEmail] = useState()

  const [currentPassword, setCurrentPassword] = useState()

  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState()

  const [newPassword, setNewPassword] = useState()

  const [newPasswordConfirm, setNewPasswordConfirm] = useState()

  const handleClose = () => {
    setChangePasswordModalOpen(false)
  }

  const handleSubmit = () => {
    if (currentPassword !== currentPasswordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "A senha atual não confere",
      })

      return
    }

    if (newPassword !== newPasswordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "A senha nova não confere",
      })

      return
    }

    let formData = {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword
    }

    api
      .post("/users/change-password", formData)
      .then(() => {
        navigate("/")
      })
  }

  return (
    <Modal
      show={changePasswordModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Alterar minha senha de usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Senha atual" onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>

        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Confirmar senha atual" onChange={(e) => setCurrentPasswordConfirm(e.target.value)} />
        </div>

        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Nova senha" onChange={(e) => setNewPassword(e.target.value)} />
        </div>

        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Confirmar nova senha" onChange={(e) => setNewPasswordConfirm(e.target.value)} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

const Nav = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const workersFirstReview = useWorkersExperienceTimeStore(state => state.workersFirstReview)

  const setWorkersFirstReview = useWorkersExperienceTimeStore(state => state.setWorkersFirstReview)

  const workersSecondReview = useWorkersExperienceTimeStore(state => state.workersSecondReview)

  const setWorkersSecondReview = useWorkersExperienceTimeStore(state => state.setWorkersSecondReview)

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)

  const [subsidiarieData, setSubsidiarieData] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-first-review`)
      .then((response) => setWorkersFirstReview(response?.data))

    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-second-review`)
      .then((response) => setWorkersSecondReview(response?.data))

    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}`)
      .then((response) => setSubsidiarieData(response.data))
  }, [])

  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">{selectedSubsidiarie?.label} {subsidiarieData?.cnpj}</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Início</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/positions-table">
                  Quadro de vagas
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/applicants">
                  Processos seletivos
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Chamados
                </a>

                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/requesting">Abertos por mim</Link></li>

                  <li><Link className="dropdown-item" to="/responsible">Atribuídos a mim</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Escalas
                </a>

                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/scale">Mensal</Link></li>

                  <li><Link className="dropdown-item" to="/hollidays-scale">Feriados</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Cadastros
                </a>

                <ul className="dropdown-menu">
                  {
                    userSession.role_id === 1 && (
                      <li><Link className="dropdown-item" to="/system-log">Histórico de alterações</Link></li>
                    )
                  }

                  <li><Link className="dropdown-item" to="/workers">Colaboradores</Link></li>

                  <li><Link className="dropdown-item" to="/turns">Turnos</Link></li>

                  <li><Link className="dropdown-item" to="/cost-center">Centros de custos</Link></li>

                  <li><Link className="dropdown-item" to="/departments">Setores</Link></li>

                  <li><Link className="dropdown-item" to="/subsidiaries">Filiais</Link></li>

                  <li><Link className="dropdown-item" to="/users">Usuários</Link></li>

                  <li><Link className="dropdown-item" to="/functions">Funções</Link></li>

                  <li><Link className="dropdown-item" to="/nationalities">Nacionalidades</Link></li>

                  <li><Link className="dropdown-item" to="/states">Estados</Link></li>

                  <li><Link className="dropdown-item" to="/cities">Cidades</Link></li>

                  <li><Link className="dropdown-item" to="/neighborhoods">Bairros</Link></li>
                </ul>
              </li>

              {/* {
                userSession.role_id === 1 && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Histórico de alterações
                    </a>

                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/system-log">Todos</Link></li>

                      <li><Link className="dropdown-item" to="/turns-logs">Turnos</Link></li>

                      <li><Link className="dropdown-item" to="/cost-center-logs">Centros de custos</Link></li>

                      <li><Link className="dropdown-item" to="/department-logs">Setores</Link></li>

                      <li><Link className="dropdown-item" to="/functions-logs">Funções</Link></li>
                    </ul>
                  </li>
                )
              } */}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mais
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link id="changeSubsidiarie" to="/steps" className="dropdown-item">
                      Alterar filial
                    </Link>
                  </li>

                  <li>
                    <button
                      id="changePassword"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChangePasswordModalOpen(true);
                      }}
                    >
                      Alterar minha senha
                    </button>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setUserSession({})}>Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ChangePasswordModal
        changePasswordModalOpen={changePasswordModalOpen}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
      />
    </>
  )
}

export default Nav
