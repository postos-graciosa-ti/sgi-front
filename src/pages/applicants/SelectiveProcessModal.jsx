import { useState } from 'react'
import { CaretRightFill } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import RhInterviewModal from './RhInterviewModal'
import CoordinatorInterviewModal from './CoordinatorInterviewModal'

const SelectiveProcessModal = (props) => {
  const { selectiveProcessModalOpen, setSelectiveProcessModalOpen, selectedApplicant, setApplicantsList } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const [rhInterviewModalOpen, setRhInterviewModalOpen] = useState(false)

  const [coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen] = useState(false)

  const handleClose = () => {
    setSelectiveProcessModalOpen(false)
  }

  const handleOpenRhInterviewModal = () => {
    setRhInterviewModalOpen(true)
  }

  const handleOpenCoordinatorInterviewModal = () => {
    setCoordinatorInterviewModalOpen(true)
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
            <div className="mb-2 fw-bold">Recursos humanos</div>

            <button className="btn btn-primary ms-2" onClick={handleOpenRhInterviewModal}>
              <CaretRightFill />
            </button>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body text-center">
            <div className="mb-2 fw-bold">Coordenador/gerente</div>

            <button
              className="btn btn-primary ms-2"
              disabled={userSession?.id == selectedApplicant?.redirect_to ? false : true}
              onClick={handleOpenCoordinatorInterviewModal}
            >
              <CaretRightFill />
            </button>
          </div>
        </div>

        {
          selectedApplicant?.is_aproved == true && (
            <div className="text-center text-success fw-bold">
              <h5>Aprovado</h5>
            </div>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success">Concluir</Button>
      </Modal.Footer>

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