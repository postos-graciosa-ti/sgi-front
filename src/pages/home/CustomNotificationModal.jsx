import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const CustomNotificationModal = (props) => {
  const { customNotificationModalOpen, setCustomNotificationModalOpen } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const [date, setDate] = useState()

  const [title, setTitle] = useState()

  const [description, setDescription] = useState()

  const handleClose = () => {
    setCustomNotificationModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      "user_id": userSession?.id,
      "date": date,
      "title": title,
      "description": description
    }

    api.post("/custom-notification", requestBody)
  }

  return (
    <Modal
      show={customNotificationModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Notificação Personalizada</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="fw-bold form-label">
            Data
          </label>

          <input
            type="date"
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold form-label">
            Título
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold form-label">
            Descrição
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomNotificationModal