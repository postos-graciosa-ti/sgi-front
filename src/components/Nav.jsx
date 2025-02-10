import { useState } from "react"
import { Button, Modal } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import useUserSessionStore from "../data/userSession"
import api from "../services/api"

export const ChangePasswordModal = (props) => {
  const { changePasswordModalOpen, setChangePasswordModalOpen } = props;

  const navigate = useNavigate()

  const [email, setEmail] = useState()

  const [currentPassword, setCurrentPassword] = useState()

  const [currentPasswordConfirm, setCurrentPasswordConfirm] = useState()

  const [newPassword, setNewPassword] = useState()

  const [newPasswordConfirm, setNewPasswordConfirm] = useState()

  const handleClose = () => {
    setChangePasswordModalOpen(false);
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
  );
}

const Nav = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)

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
                <Link className="nav-link" to="/subsidiarie-status">Status</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/candidates">Processos Seletivos</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/scale">Escalas</Link>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link" to="/scale-two">Escalas II</Link>
              </li> */}

              {
                userSession.role_id === 1 && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Logs
                    </a>

                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/scales-logs">Escalas</Link></li>

                      <li><Link className="dropdown-item" to="/workers-logs">Funcionários</Link></li>
                    </ul>

                    {/* <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/workers">Colaboradores</Link></li>

                      <li><Link className="dropdown-item" to="/turns">Turnos</Link></li>

                      {userSession.role_id === 1 && <li><Link className="dropdown-item" to="/subsidiaries">Filiais</Link></li>}

                      {userSession.role_id === 1 && <li><Link className="dropdown-item" to="/users">Usuários</Link></li>}

                      {userSession.role_id === 1 && <li><Link className="dropdown-item" to="/functions">Funções</Link></li>}
                    </ul> */}
                  </li>
                )
              }

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
        <span id="subsidiarie" className="btn btn-link m-0 p-0">{selectedSubsidiarie.label}</span> - <Link id="changeSubsidiarie" to="/steps" className="btn btn-link  m-0 p-0">Alterar filial</Link> - <button id="changePassword" onClick={(e) => { e.stopPropagation(); setChangePasswordModalOpen(true) }} className="btn btn-link m-0 p-0">Alterar minha senha</button>
      </div>

      <ChangePasswordModal
        changePasswordModalOpen={changePasswordModalOpen}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
      />
    </>
  )
}

export default Nav;
