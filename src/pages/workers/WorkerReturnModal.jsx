import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'

const WorkerReturnModal = (props) => {
  const { workerReturnModalOpen, setWorkerReturnModalOpen, selectedWorker, setSelectedWorker, setWorkersList } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleClose = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
      .then((response) => {
        setWorkersList(response.data)
      })

    setSelectedWorker()

    setWorkerReturnModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .put(`/subsidiaries/${selectedSubsidiarie?.value}/workers/${selectedWorker?.worker_id}/away-return`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={workerReturnModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Retorno de funcionário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Deseja mesmo confirmar o retorno de {selectedWorker?.worker_name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkerReturnModal