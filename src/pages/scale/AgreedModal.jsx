import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AgreedModal = (props) => {
  const {
    selectedScale,
    selectedWorker,
    selectedDate,
    setSelectedDate,
    agreedModalOpen,
    setAgreedModalOpen,
    workers,
    setWorkers
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const [securityPassword, setSecurityPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    api
      .post("/login", {
        "email": email,
        "password": password,
      })
      .then((response) => {
        if (response.status == 200) {
          api
            .post(`/scales/${selectedScale.id}`)
            .then((response) => {
              setSelectedDate(selectedDate)
            })
        }
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <Modal
        show={agreedModalOpen}
        onHide={() => setAgreedModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar assinatura</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
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

            {/* <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Senha de segurança de colaborador"
                onChange={(e) => setSecurityPassword(e.target.value)}
              />
            </div> */}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={() => setAgreedModalOpen(false)}>
              Fechar
            </Button>

            <Button type="submit" variant="success">
              Confirmar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AgreedModal