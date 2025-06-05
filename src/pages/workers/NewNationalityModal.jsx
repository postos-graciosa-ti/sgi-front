import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const NewNationalityModal = (props) => {
  const { newNationalityModalOpen, setNewNationalityModalOpen } = props

  const [name, setName] = useState()

  const handleClose = () => {
    setNewNationalityModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      name: name
    }

    api
      .post("/nationalities", requestBody)
      .then((response) => {
        handleClose()
      })
  }

  return (
    <Modal
      show={newNationalityModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nova nacionalidade</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nome
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewNationalityModal