import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RecoveryPasswordModal = (props) => {
  const { recoveryPasswordModalOpen, setRecoveryPasswordModalOpen } = props

  const [name, setName] = useState()

  const [email, setEmail] = useState()

  const handleClose = () => {
    setRecoveryPasswordModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      name: name, 
      email: email
    }
  }

  return (
    <Modal
      show={recoveryPasswordModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Recuperar senha</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nome completo
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            E-mail
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <span className="text-muted">Se seu e-mail e senha estiverem cadastrados em nosso banco de dados, enviaremos mais instruções em sua caixa de entrada</span>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success">Enviar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecoveryPasswordModal