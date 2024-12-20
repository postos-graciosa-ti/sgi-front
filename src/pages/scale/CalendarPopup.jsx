import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'
import useDaysOffStore from '../../data/daysOffStore'

const CalendarPopup = (props) => {
  const { calendarPopupOpen, setCalendarPopupOpen, selectedDate } = props

  const setDaysOff = useDaysOffStore(state => state.setDaysOff)

  const handleClose = () => {
    setCalendarPopupOpen(false)
  }

  const handleSave = () => {
    setDaysOff(moment(selectedDate).format("DD-MM-YYYY"))

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
        
        <Button variant="success" onClick={handleSave}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CalendarPopup