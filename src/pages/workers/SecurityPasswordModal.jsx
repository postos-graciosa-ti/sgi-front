import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import putWorkerSecurityPassword from '../../requests/putWorkerSecurityPassword'
import { useState } from 'react'

const SecurityPasswordModal = (props) => {
  const {
    selectedWorker,
    securityPasswordModalOpen,
    setSecurityPasswordModalOpen,
  } = props

  const [securityPassword, setSecurityPassword] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()

    putWorkerSecurityPassword(selectedWorker.id, {
      "security_password": securityPassword
    })
      .then((response) => console.log(response))
  }

  return (
    <>
      <Modal
        show={securityPasswordModalOpen}
        onHide={() => setSecurityPasswordModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar senha de segurança</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Senha de segurança"
                onChange={(e) => setSecurityPassword(e.target.value)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={() => setSecurityPasswordModalOpen(false)}>
              Fechar
            </Button>

            <Button type="submit" variant="primary">Adicionar</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default SecurityPasswordModal