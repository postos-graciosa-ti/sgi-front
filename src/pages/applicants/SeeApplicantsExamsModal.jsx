import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const SeeApplicantsExamsModal = (props) => {
  const { applicantsExamsModalOpen, setApplicantsExamsModalOpen, selectedApplicant, setSelectedApplicant } = props

  const [applicantExamsList, setApplicantExamsList] = useState()

  useEffect(() => {
    if (applicantsExamsModalOpen)
      api
        .get(`/applicants/${selectedApplicant?.id}/exams`)
        .then((response) => setApplicantExamsList(response.data))
  }, [applicantsExamsModalOpen])

  const handleClose = () => {
    setApplicantsExamsModalOpen(false)

    setApplicantExamsList()
  }

  return (
    <Modal
      show={applicantsExamsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Avaliações de candidato</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          applicantExamsList && applicantExamsList.map((exam, index) => (
            <div key={index} className="mb-3">
              <div className="alert alert-danger fw-bold text-center" role="alert">
                {exam.exam_label}
              </div>

              {
                exam?.responses &&
                Array.isArray(JSON.parse(exam.responses)) &&
                JSON.parse(exam.responses).map((field, fieldIndex) => (
                  <div className="mb-2" key={fieldIndex}>
                    <label className="form-label fw-bold">
                      {field.question}
                    </label>

                    <input
                      className={`form-control ${field.isCorrect ? 'is-valid' : 'is-invalid'}`}
                      disabled={true}
                      value={field.response}
                    />
                  </div>
                ))
              }
            </div>
          ))
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SeeApplicantsExamsModal