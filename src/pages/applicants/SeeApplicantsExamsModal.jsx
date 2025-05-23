import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const SeeApplicantsExamsModal = (props) => {
  const { applicantsExamsModalOpen, setApplicantsExamsModalOpen, selectedApplicant, setSelectedApplicant, setSelectiveProcessModalOpen } = props

  const [applicantExamsList, setApplicantExamsList] = useState()

  useEffect(() => {
    if (applicantsExamsModalOpen)
      api
        .get(`/applicants/${selectedApplicant?.id}/exams`)
        .then((response) => setApplicantExamsList(response.data))
  }, [applicantsExamsModalOpen])

  const handleClose = () => {
    setApplicantExamsList()

    setSelectiveProcessModalOpen(false)

    setApplicantsExamsModalOpen(false)
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
          applicantExamsList && applicantExamsList.map((exam, index) => {
            const responses = JSON.parse(exam.responses)
            const correctAnswers = Array.isArray(responses)
              ? responses.filter((r) => r.isCorrect).length
              : 0
            const totalQuestions = Array.isArray(responses) ? responses.length : 0

            return (
              <div key={index} className="mb-3">
                <div className="alert alert-danger fw-bold text-center" role="alert">
                  <div>{exam.exam_label}</div>
                  <div>{`Pontuação: ${correctAnswers}/${totalQuestions}`}</div>
                </div>

                {
                  Array.isArray(responses) &&
                  responses.map((field, fieldIndex) => (
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
            )
          })
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SeeApplicantsExamsModal
