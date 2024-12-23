import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useDaysOffStore from '../../data/daysOffStore'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const CalendarPopup = (props) => {
  const {
    calendarPopupOpen,
    setCalendarPopupOpen,
    selectedDate,
    existentWorkerDaysOff,
    setExistentWorkerDaysOff,
    selectedWorkerId,
    getScalesBySubsidiarie,
    setScalesList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const setDaysOff = useDaysOffStore(state => state.setDaysOff)

  const handleClose = () => {
    setCalendarPopupOpen(false)
  }

  const handleSave = () => {
    setDaysOff(moment(selectedDate).format("DD-MM-YYYY"))

    setCalendarPopupOpen(false)
  }

  const handleDelete = () => {
    const daysOffToRemove = existentWorkerDaysOff.filter(day => day !== moment(selectedDate).format("DD-MM-YYYY"))

    setExistentWorkerDaysOff(daysOffToRemove)

    api
      .post(`/scales/workers/${selectedWorkerId}`, {
        date: moment(selectedDate).format("DD-MM-YYYY")
      })
      .then((response) => {
        console.log(response)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => {
            setScalesList(response.data)

            setCalendarPopupOpen(false)
          })
      })
  }

  return (
    <Modal
      show={calendarPopupOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar dia {moment(selectedDate).format("DD-MM-YYYY")} como folga?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Você deseja adicionar o dia {moment(selectedDate).format("DD-MM-YYYY")} como folga?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="danger" onClick={handleDelete}>
          Remover
        </Button>

        <Button variant="success" onClick={handleSave}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CalendarPopup