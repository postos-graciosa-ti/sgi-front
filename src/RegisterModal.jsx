import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from './services/api'
import useUserSessionStore from './data/userSession'
import { useNavigate } from 'react-router-dom'

const RegisterModal = (props) => {
  const { registerModalOpen, setRegisterModalOpen } = props

  const navigate = useNavigate()

  const setUserSession = useUserSessionStore(state => state.setUserSession)

  const setBearerToken = useUserSessionStore(state => state.setBearerToken)

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const [confirmPassword, setConfirmPassword] = useState()

  const handleClose = () => {
    setRegisterModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password != confirmPassword) {
      throw new Error("A senha não coincide")
    }

    let formData = {
      email: email,
      password: password,
    }

    api
      .post("/users/create-password", formData)
      .then((response) => {
        setBearerToken(response.data.token)

        setUserSession(response.data.data)

        navigate('/steps', { replace: true })
      })
  }

  return (
    <Modal
      show={registerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cadastrar</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar senha"
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

export default RegisterModal