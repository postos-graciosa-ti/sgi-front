import { useState } from 'react'
import { CaretRightFill } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import CoordinatorInterviewModal from './CoordinatorInterviewModal'
import IdentityModal from './IdentityModal'
import ProcessProgressModal from './ProcessProgressModal'
import RhInterviewModal from './RhInterviewModal'
import SeeApplicantsExamsModal from './SeeApplicantsExamsModal'

const SelectiveProcessModal = (props) => {
  const {
    selectiveProcessModalOpen,
    setSelectiveProcessModalOpen,
    selectedApplicant,
    setApplicantsList,
    setSelectedApplicant,
    applicantToSearch,
  } = props

  const [processProgressModalOpen, setProcessProgressModalOpen] = useState(false)

  const [applicantsExamsModalOpen, setApplicantsExamsModalOpen] = useState(false)

  const [rhInterviewModalOpen, setRhInterviewModalOpen] = useState(false)

  const [coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen] = useState(false)

  const [identityModalOpen, setIdentityModalOpen] = useState(false)

  const handleClose = () => {
    if (applicantToSearch) {
      if (applicantToSearch.value == "todos") {
        api
          .get("/applicants")
          .then((response) => {
            setApplicantsList(response.data)
          })
      } else {
        api
          .get("/applicants")
          .then((response) => {
            const applicantToShow = response.data.filter((applicant) => applicant.id == applicantToSearch.value)

            setApplicantsList(applicantToShow)
          })
      }
    }

    setSelectiveProcessModalOpen(false)
  }

  const handleOpenProcessProgressModal = () => {
    setProcessProgressModalOpen(true)
  }

  const handleOpenSeeApplicantsExamsModal = () => {
    setApplicantsExamsModalOpen(true)
  }

  const handleOpenRhInterviewModal = () => {
    setRhInterviewModalOpen(true)
  }

  const handleOpenCoordinatorInterviewModal = () => {
    setCoordinatorInterviewModalOpen(true)
  }

  const handleOpenIdentityModal = () => {
    setIdentityModalOpen(true)
  }

  return (
    <Modal
      show={selectiveProcessModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Processo seletivo de {selectedApplicant?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Andamento do processo</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenProcessProgressModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Avaliações</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenSeeApplicantsExamsModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Identificação</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenIdentityModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Recursos humanos</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenRhInterviewModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Coordenador/gerente</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenCoordinatorInterviewModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success">Concluir</Button>
      </Modal.Footer>

      <SeeApplicantsExamsModal
        applicantsExamsModalOpen={applicantsExamsModalOpen}
        setApplicantsExamsModalOpen={setApplicantsExamsModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectedApplicant={setSelectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
      />

      <RhInterviewModal
        rhInterviewModalOpen={rhInterviewModalOpen}
        setRhInterviewModalOpen={setRhInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        setApplicantsList={setApplicantsList}
        applicantToSearch={applicantToSearch}
      />

      <CoordinatorInterviewModal
        coordinatorInterviewModalOpen={coordinatorInterviewModalOpen}
        setCoordinatorInterviewModalOpen={setCoordinatorInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        setApplicantsList={setApplicantsList}
        applicantToSearch={applicantToSearch}
      />

      <IdentityModal
        identityModalOpen={identityModalOpen}
        setIdentityModalOpen={setIdentityModalOpen}
        selectedApplicant={selectedApplicant}
      />

      <ProcessProgressModal
        processProgressModalOpen={processProgressModalOpen}
        setProcessProgressModalOpen={setProcessProgressModalOpen}
        selectedApplicant={selectedApplicant}
      />
    </Modal>
  )
}

export default SelectiveProcessModal