import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';
import useUserSessionStore from '../../data/userSession';

const DefinitellyDeleteWorkerModal = (props) => {
  const { definitellyWorkerModalOpen, setDefinitellyWorkerModalOpen, selectedWorker, setSelectedWorker, setWorkersList } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleClose = () => {
    setSelectedWorker()

    setDefinitellyWorkerModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
      .then((response) => {
        let allWorkers = response.data

        let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

        let sortStatusWorkers = statusWorkers.sort()

        setWorkersList(sortStatusWorkers)
      })

    api
      .delete(`/workers/${selectedWorker?.worker_id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={definitellyWorkerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Excluir colaborador definitivamente</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Deseja excluir definitivamente o colaborador {selectedWorker?.worker_name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Excluir definitivamente</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DefinitellyDeleteWorkerModal