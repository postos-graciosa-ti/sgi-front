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
    setScalesList,
    allDaysOff,
    handleSaveDaysOff,
    setIlegalDates
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const setDaysOff = useDaysOffStore(state => state.setDaysOff)

  const handleClose = () => {
    setCalendarPopupOpen(false)

    setIlegalDates([])
  }

  const handleSave = () => {
    setDaysOff(moment(selectedDate).format("DD-MM-YYYY"))

    setCalendarPopupOpen(false)
  }

  const handleDelete = () => {
    const formattedDate = moment(selectedDate).format("DD-MM-YYYY")

    const updatedDaysOff = allDaysOff.filter(dayOff => dayOff !== formattedDate)

    allDaysOff.length = 0
    
    allDaysOff.push(...updatedDaysOff)

    handleSaveDaysOff() 
    
    setCalendarPopupOpen(false)
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