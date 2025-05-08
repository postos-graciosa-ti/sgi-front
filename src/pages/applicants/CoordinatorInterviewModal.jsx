import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const CoordinatorInterviewModal = (props) => {
  const { coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen, selectedApplicant, setSelectedApplicant, setApplicantsList } = props

  const [coordinatorObservations, setCoordinatorObservations] = useState()

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setCoordinatorObservations()

    setSelectedApplicant()

    setCoordinatorInterviewModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      coordinator_observation: coordinatorObservations,
    }

    api
      .patch(`/applicants/${selectedApplicant?.Applicants?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={coordinatorInterviewModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Entrevista com superior imediato</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <h4>Informações do RH</h4>
        </div>

        <div className="mb-3">
          <label><b>Nome</b></label>

          <input className="form-control" value={selectedApplicant?.Applicants?.name} disabled={true} />
        </div>

        <div className="mb-3">
          <label><b>Natural</b></label>

          <input className="form-control" value={selectedApplicant?.Applicants?.nature} disabled={true} />
        </div>

        <div className="mb-3">
          <label><b>Quanto tempo?</b></label>

          <input className="form-control" value={selectedApplicant?.Applicants?.how_long} disabled={true} />
        </div>

        <div className="mb-3">
          <label><b>Possui experiência na função?</b></label>

          <input className="form-control" value={selectedApplicant?.Applicants?.experience_function} disabled={true} />
        </div>

        <div className="mb-3">
          <h4>Parecer do coordenador</h4>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setCoordinatorObservations(e.target.value)}
            defaultValue={selectedApplicant?.Applicants?.coordinator_observation}
            disabled={selectedApplicant?.Applicants?.coordinator_observation && true || false}
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

export default CoordinatorInterviewModal