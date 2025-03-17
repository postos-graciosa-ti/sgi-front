import { useState } from "react"
import { Arrow90degUp, ArrowRight, ArrowUpRightSquare } from "react-bootstrap-icons"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const InterviewModal = (props) => {
  const { interviewModalOpen, setInterviewModalOpen } = props

  const handleClose = () => {
    setInterviewModalOpen(false)
  }

  return (
    <Modal
      show={interviewModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Etapas do processo seletivo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="card p-3 mb-3">
          <div className="row d-flex align-items-center">
            <div className="col-10">
              <span>Entrevista com recursos humanos</span>
            </div>

            <div className="col-2 d-flex justify-content-end">
              <button className="btn btn-primary d-flex align-items-center gap-2">
                Ir <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="card p-3">
          Entrevista com coordenador/gerente
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="primary">Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InterviewModal