import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
import api from '../../services/api'

const ReactivateWorkerModal = (props) => {
  const {
    reactivateWorkerModalOpen,
    setReactivateWorkerModalOpen,
    selectedWorker,
    setSelectedWorker,
    setWorkersList,
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleClose = () => {
    getWorkersBySubsidiarie(selectedSubsdiarie.value)
      .then((response) => {
        setWorkersList(response.data)
      })

    setSelectedWorker()

    setReactivateWorkerModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .put(`/workers/${selectedWorker.worker_id}/reactivate`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={reactivateWorkerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deseja mesmo readmitir <b>{selectedWorker?.worker_name}</b>?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div><b>{selectedWorker?.worker_name}</b> foi demitida em <b>{selectedWorker?.resignation_date}</b> por <b>{selectedWorker?.resignation_reason_name}</b></div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReactivateWorkerModal
