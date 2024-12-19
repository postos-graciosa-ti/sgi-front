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
    setWorkersList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleClose = () => {
    setDeleteWorkerModalOpen(false)
  }

  const handleDeleteWorker = () => {
    api
      .put(`/workers/deactivate/${selectedWorker.worker_id}`)
      .then(() => {
        handleClose()

        getWorkersBySubsidiarie(selectedSubsdiarie.value)
          .then((response) => setWorkersList(response.data))
      })
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
        Deseja realmente desativar o funcionário {selectedWorker?.name}?
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
