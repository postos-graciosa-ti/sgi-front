import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'

const NewApplicantModal = (props) => {
  const { newApplicantModalOpen, setNewApplicantModalOpen, setApplicantsList } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantName, setApplicantName] = useState()

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setNewApplicantModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      name: applicantName,
      created_by: userSession.id
    }

    api
      .post("/applicants", requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={newApplicantModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Novo candidato</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nome
          </label>

          <input
            className="form-control"
            onChange={(e) => setApplicantName(e.target.value)}
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

export default NewApplicantModal