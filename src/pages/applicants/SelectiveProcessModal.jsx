import { useState } from 'react'
import { CaretRightFill, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import CoordinatorInterviewModal from './CoordinatorInterviewModal'
import RhInterviewModal from './RhInterviewModal'
import SeeApplicantsExamsModal from './SeeApplicantsExamsModal'

const SelectiveProcessModal = (props) => {
  const { selectiveProcessModalOpen, setSelectiveProcessModalOpen, selectedApplicant, setApplicantsList, setSelectedApplicant } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantsExamsModalOpen, setApplicantsExamsModalOpen] = useState(false)

  const [rhInterviewModalOpen, setRhInterviewModalOpen] = useState(false)

  const [coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen] = useState(false)

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setSelectiveProcessModalOpen(false)
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

  const handleInactivateApplicant = () => {
    let requestBody = {
      is_active: false
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
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
            <div className="mb-2 fw-bold">Avaliações</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenSeeApplicantsExamsModal}>
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

        <div className="mb-3">
          <button
            className="btn btn-danger w-100"
            onClick={handleInactivateApplicant}
            disabled={userSession?.id != selectedApplicant?.created_by && true}
          >
            <Trash /> Apagar processo seletivo
          </button>
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
      />

      <CoordinatorInterviewModal
        coordinatorInterviewModalOpen={coordinatorInterviewModalOpen}
        setCoordinatorInterviewModalOpen={setCoordinatorInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectiveProcessModalOpen={setSelectiveProcessModalOpen}
        setApplicantsList={setApplicantsList}
      />
    </Modal>
  )
}

export default SelectiveProcessModal