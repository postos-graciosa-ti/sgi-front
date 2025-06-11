import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const ProcessProgressModal = (props) => {
  const { processProgressModalOpen, setProcessProgressModalOpen, selectedApplicant } = props

  const [hasExam, setHasExam] = useState(false)

  useEffect(() => {
    api
      .get(`/applicants/${selectedApplicant?.id}/exams`)
      .then((response) => {
        if (response.data) {
          setHasExam(true)
        } else {
          setHasExam(false)
        }
      })
  }, [processProgressModalOpen])

  const handleClose = () => {
    setProcessProgressModalOpen(false)
  }

  return (
    <Modal
      show={processProgressModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Andamento de processo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            value={"Avaliações"}
            className={hasExam == true && "form-control is-valid" || "form-control is-invalid"}
            disabled={true}
          />
        </div>

        <div className="mb-3">
          <input
            value={"Identificação"}
            className={selectedApplicant?.identity_complete ? "form-control is-valid" : "form-control is-invalid"}
            disabled={true}
          />
        </div>

        <div className="mb-3">
          <input
            value={"Entrevista com Recursos Humanos"}
            className={selectedApplicant?.rh_interview_complete ? "form-control is-valid" : "form-control is-invalid"}
            disabled={true}
          />
        </div>

        <div className="mb-3">
          <input
            value={"Entrevista com coordenador/gerente"}
            className={selectedApplicant?.coordinator_interview_complete ? "form-control is-valid" : "form-control is-invalid"}
            disabled={true}
          />
        </div>

        <div className="row">
          <div className="col">
            <input
              value={"Retorno e-mail"}
              className={selectedApplicant?.email_feedback ? "form-control is-valid" : "form-control is-invalid"}
              disabled={true}
            />
          </div>

          <div className="col">
            <input
              value={"Retorno WhatsApp"}
              className={selectedApplicant?.whatsapp_feedback ? "form-control is-valid" : "form-control is-invalid"}
              disabled={true}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProcessProgressModal