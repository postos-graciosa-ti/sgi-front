import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import useUserSessionStore from './data/userSession';
import api from './services/api';

const LoginModal = (props) => {
  const { loginModalOpen, setLoginModalOpen } = props

  const navigate = useNavigate()

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const setBearerToken = useUserSessionStore(state => state.setBearerToken)

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const handleClose = () => {
    setEmail()

    setPassword()

    setLoginModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "email": email,
      "password": password
    }

    api
      .post("/users/login", formData)
      .then((response) => {
        setBearerToken(response.data.token)

        setUserSession(response.data.data)

        navigate('/steps', { replace: true })
      })
  }

  return (
    <Modal
      show={loginModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Entrar</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder='E-mail'
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button type="submit" variant="success">Confirmar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default LoginModal
