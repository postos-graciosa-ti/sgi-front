import moment from 'moment'
import { useState } from 'react'
import { ArrowRightShort } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FirstReviewModal from './FirstReviewModal'
import PeriodicReviewsModal from './PeriodicReviewsModal'
import SecondReviewModal from "./SecondReviewModal"

const ExperienceTimeModal = (props) => {
  const {
    experienceTimeModalOpen,
    setExperienceTimeModalOpen,
    selectedWorker,
    setSelectedWorker
  } = props

  const [firstReviewModalOpen, setFirstReviewModalOpen] = useState(false)

  const [secondReviewModalOpen, setSecondReviewModalOpen] = useState(false)

  const [periodicReviewsModalOpen, setPeriodicReviewsModalOpen] = useState(false)

  let today = moment()

  let oneWeekBeforeFirstReview = moment(selectedWorker?.first_review_date).subtract(7, 'days')

  let oneWeekBeforeSecondReview = moment(selectedWorker?.second_review_date).subtract(7, 'days')

  let disableFirstReviewModal = today < oneWeekBeforeFirstReview

  let disableSecondReviewModal = today < oneWeekBeforeSecondReview


  const handleClose = () => {
    setExperienceTimeModalOpen(false)
  }

  const handleOpenFirstReviewModal = () => {
    setFirstReviewModalOpen(true)
  }

  const handleOpenSecondReviewModal = () => {
    setSecondReviewModalOpen(true)
  }

  const handleOpenSecondReview = () => {
    setPeriodicReviewsModalOpen(true)
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

              <button
                className="btn btn-primary"
                onClick={handleOpenFirstReviewModal}
                disabled={disableFirstReviewModal}
              >
                Ir <ArrowRightShort />
              </button>
            </div>
          </div>

          <div className="card p-3 mb-3">
            <div className="d-inline-flex justify-content-between align-items-center">
              <span><b>Segunda avaliação (60 dias)</b>: {moment(selectedWorker?.second_review_date).format("DD-MM-YYYY")}</span>

              <button
                className="btn btn-primary"
                onClick={handleOpenSecondReviewModal}
                disabled={disableSecondReviewModal}
              >
                Ir <ArrowRightShort />
              </button>
            </div>
          </div>

          <div className="card p-3 mb-3">
            <div className="d-inline-flex justify-content-between align-items-center">
              <span><b>Avaliações periódicas</b></span>

              <button
                className="btn btn-primary"
                onClick={handleOpenSecondReview}
                disabled={disableSecondReviewModal}
              >
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
        setSelectedWorker={setSelectedWorker}
        setExperienceTimeModalOpen={setExperienceTimeModalOpen}
      />

      <SecondReviewModal
        secondReviewModalOpen={secondReviewModalOpen}
        setSecondReviewModalOpen={setSecondReviewModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        setExperienceTimeModalOpen={setExperienceTimeModalOpen}
      />

      <PeriodicReviewsModal
        periodicReviewsModalOpen={periodicReviewsModalOpen}
        setPeriodicReviewsModalOpen={setPeriodicReviewsModalOpen}
        selectedWorker={selectedWorker}
      />
    </>
  )
}

export default ExperienceTimeModal