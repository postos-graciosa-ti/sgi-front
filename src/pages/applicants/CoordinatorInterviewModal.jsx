import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const CoordinatorInterviewModal = (props) => {
  const {
    coordinatorInterviewModalOpen,
    setCoordinatorInterviewModalOpen,
    selectedApplicant,
    setSelectiveProcessModalOpen,
    setApplicantsList
  } = props

  const [coordinatorObservation, setCoordinatorObservation] = useState()

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setSelectiveProcessModalOpen(false)

    setCoordinatorInterviewModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      coordinator_observations: coordinatorObservation,
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={coordinatorInterviewModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Entrevista com coordenador de {selectedApplicant?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Observações de coordenador
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setCoordinatorObservation(e.target.value)}
            defaultValue={selectedApplicant?.coordinator_observations}
            disabled={selectedApplicant?.coordinator_observations && true}
          />
        </div>

        {/* <div className="mb-3">
          <label className="form-label fw-bold">
            Parecer do coordenador:
          </label>

          <ReactSelect
            placeholder={""}
            options={[
              { value: true, label: "Aprovado" },
              { value: false, label: "Reprovado" },
            ]}
            onChange={(option) => setIsAproved(option.value)}
          />
        </div> */}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CoordinatorInterviewModal