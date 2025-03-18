import moment from 'moment'
import { ArrowBarRight, ArrowRightShort } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FirstReviewModal from './FirstReviewModal'
import { useState } from 'react'

const ExperienceTimeModal = (props) => {
  const {
    experienceTimeModalOpen,
    setExperienceTimeModalOpen,
    selectedWorker
  } = props

  const [firstReviewModalOpen, setFirstReviewModalOpen] = useState(false)

  let canOpenFirstReview = moment().format("YYYY-MM-DD") >= selectedWorker?.first_review_date

  let canOpenSecondReview = moment().format("YYYY-MM-DD") >= selectedWorker?.second_review_date

  const handleClose = () => {
    setExperienceTimeModalOpen(false)
  }

  const handleOpenFirstReviewModal = () => {
    setFirstReviewModalOpen(true)
  }

  return (
    <>
      <Modal
        show={experienceTimeModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Avaliações de tempo de experiência</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="card p-3 mb-3">
            <span><b>Colaborador</b>: {selectedWorker?.worker_name}</span>

            <span><b>Data de admissão</b>: {moment(selectedWorker?.admission_date).format("DD-MM-YYYY")}</span>
          </div>

          <div className="card p-3 mb-3">
            <div className="d-inline-flex justify-content-between align-items-center">
              <span><b>Primeira avaliação (30 dias)</b>: {moment(selectedWorker?.first_review_date).format("DD-MM-YYYY")}</span>

              <button className="btn btn-primary" onClick={handleOpenFirstReviewModal} disabled={canOpenFirstReview && false}>
                Ir <ArrowRightShort />
              </button>
            </div>
          </div>

          <div className="card p-3 mb-3">
            <div className="d-inline-flex justify-content-between align-items-center">
              <span><b>Segunda avaliação (60 dias)</b>: {moment(selectedWorker?.second_review_date).format("DD-MM-YYYY")}</span>

              <button className="btn btn-primary" disabled={canOpenSecondReview && false}>
                Ir <ArrowRightShort />
              </button>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button variant="success">Confirmar</Button>
        </Modal.Footer>
      </Modal>

      <FirstReviewModal
        firstReviewModalOpen={firstReviewModalOpen}
        setFirstReviewModalOpen={setFirstReviewModalOpen}
        selectedWorker={selectedWorker}
      />
    </>
  )
}

export default ExperienceTimeModal