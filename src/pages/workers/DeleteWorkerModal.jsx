import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
import api from '../../services/api'

const DeleteWorkerModal = (props) => {
  const {
    deleteWorkerModalOpen,
    setDeleteWorkerModalOpen,
    selectedWorker,
    setSelectedWorker,
    setWorkersList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [dateResignation, setDateResignation] = useState('')

  const handleClose = () => {
    getWorkersBySubsidiarie(selectedSubsdiarie.value)
      .then((response) => {
        setWorkersList(response.data)
      })

    setSelectedWorker({})

    setDeleteWorkerModalOpen(false)
  }

  const handleDeleteWorker = () => {
    const formData = {
      is_active: false,
      resignation_date: dateResignation
    }

    api
      .put(`/workers/${selectedWorker?.worker_id}/deactivate`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteWorkerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmar desativação</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='mb-3'>
          Deseja realmente desativar o funcionário {selectedWorker?.worker_name}?
        </div>

        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Data de demissão"
            value={dateResignation}
            onChange={(e) => setDateResignation(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="danger" onClick={handleDeleteWorker}>
          Desativar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteWorkerModal
