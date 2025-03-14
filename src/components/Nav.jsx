import { useState } from "react"
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import useUserSessionStore from "../data/userSession"
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

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)

  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary">
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
                <Link className="nav-link" to="/applicants">Candidatos</Link>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link" to="/subsidiarie-status">Status</Link>
              </li> */}

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

                  <li><Link className="dropdown-item" to="/cost-center">Centros de custos</Link></li>

                  <li><Link className="dropdown-item" to="/departments">Setores</Link></li>

                  {userSession.role_id === 1 && <li><Link className="dropdown-item" to="/subsidiaries">Filiais</Link></li>}

                  {userSession.role_id === 1 && <li><Link className="dropdown-item" to="/users">Usuários</Link></li>}

                  {userSession.role_id === 1 && <li><Link className="dropdown-item" to="/functions">Funções</Link></li>}

                  <li><Link className="dropdown-item" to="/neighborhoods">Bairros</Link></li>
                </ul>
              </li>

              {
                userSession.role_id === 1 && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Logs
                    </a>

                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/workers-logs">Colaboradores</Link></li>

                      <li><Link className="dropdown-item" to="/turns-logs">Turnos</Link></li>

                      <li><Link className="dropdown-item" to="/cost-center-logs">Centros de custos</Link></li>

                      <li><Link className="dropdown-item" to="/department-logs">Setores</Link></li>

                      <li><Link className="dropdown-item" to="/subsidiaries-logs">Filiais</Link></li>

                      <li><Link className="dropdown-item" to="/users-logs">Usuários</Link></li>

                      <li><Link className="dropdown-item" to="/functions-logs">Funções</Link></li>
                    </ul>
                  </li>
                )
              }

              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setUserSession({})}>Sair</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="userInfo" className="user-info-container">
        <span id="subsidiarie" className="user-info">Filial: {selectedSubsidiarie.label}</span>

        <span className="separator"> | </span>

        <Link id="changeSubsidiarie" to="/steps" className="user-info">Alterar filial</Link>

        <span className="separator"> | </span>

        <span className="user-info">Usuário: {userSession.name}</span>

        <span className="separator"> | </span>

        <button
          id="changePassword"
          onClick={(e) => { e.stopPropagation(); setChangePasswordModalOpen(true); }}
          className="user-info"
        >
          Alterar minha senha
        </button>

        <span className="separator"> | </span>

        <span id="support" className="user-info">Suporte: postosgraciosati@gmail.com</span>
      </div>

      <ChangePasswordModal
        changePasswordModalOpen={changePasswordModalOpen}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
      />

      <style>
        {
          `
            .user-info-container {
              margin: 1rem;
              text-align: end;
            }

            .user-info {
              font-size: 1rem;
              color: #007bff;  /* Ou cor personalizada */
              text-decoration: none;
              padding: 0;
              margin: 0;
              cursor: pointer;  /* Todos os itens interativos agora têm cursor pointer */
            }

            .user-info:hover {
              text-decoration: underline; /* Hover effect */
            }

            .separator {
              color: #6c757d;  /* Cor mais suave para a separação */
            }

            button.user-info {
              background: none;
              border: none;
              padding: 0;
              cursor: pointer;  /* Garante que o botão também tenha cursor pointer */
            }

            button.user-info:hover {
              text-decoration: underline; /* Hover effect */
            }
          `
        }
      </style>
    </>
  )
}

export default Nav
