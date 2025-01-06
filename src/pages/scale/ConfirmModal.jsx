import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useDaysOffStore from '../../data/daysOffStore'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const ConfirmModal = (props) => {
  const {
    confirmModalOpen,
    setConfirmModalOpen,
    getScalesBySubsidiarie,
    resetDaysOff,
    setExistentWorkerDaysOff,
    selectedWorkerId,
    selectedSubsdiarie,
    allDaysOff,
    firstDay,
    lastDay
  } = props

  const handleClose = () => {
    setConfirmModalOpen(false)
  }

  const handleDeny = () => {
    getScalesBySubsidiarie()

    resetDaysOff()

    handleClose()
  }

  const handleConfirm = () => {
    let formData = {
      "worker_id": selectedWorkerId,
      "subsidiarie_id": selectedSubsdiarie.value,
      "days_off": `[${allDaysOff.map(dia => `'${dia}'`).join(',')}]`,
      "first_day": moment(firstDay).format("DD-MM-YYYY"),
      "last_day": moment(lastDay).format("DD-MM-YYYY")
    }

    api
      .post("/scales", formData)
      .then((response) => {
        getScalesBySubsidiarie()

        resetDaysOff()

        setExistentWorkerDaysOff(response.data)

        handleClose()
      })
      .catch((error) => console.error(error))
  }

  return (
    <Modal
      show={confirmModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Alerta</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        A escala atual não está de acordo com a política da empresa, quer mesmo continuar?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleDeny}>Cancelar</Button>

        <Button variant="danger" onClick={handleConfirm}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
