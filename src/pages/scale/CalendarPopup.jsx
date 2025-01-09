import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';

const CalendarPopup = (props) => {
  const { calendarPopupOpen, setCalendarPopupOpen, handleOnclickDay, selectedDate, daysOff, selectedWorker, setScalesList, setDaysOff } = props

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleDelete = () => {
    let newDaysOff = daysOff.filter(dayOff => dayOff != moment(selectedDate).format("DD-MM-YYYY"))

    let formData = {
      "worker_id": selectedWorker.value,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": moment(monthFirstDay).format("DD-MM-YYYY"),
      "last_day": moment(monthLastDay).format("DD-MM-YYYY"),
      "days_off": `[${newDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${newDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`
    }

    api
      .post(`/scales`, formData)
      .then((response) => {
        setCalendarPopupOpen(false)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => setScalesList(response.data))

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${selectedWorker.value}`)
          .then((response) => {
            console.log(response)

            let scales = response.data

            let options = []

            scales.days_off?.map((scale) => {
              options.push(scale.date)
            })

            setDaysOff(options)
          })
      })
      .catch((error) => console.error(error))

  }

  return (
    <Modal
      show={calendarPopupOpen}
      onHide={() => setCalendarPopupOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar {moment(selectedDate).format("DD-MM-YYYY")} como folga?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Adicionar {moment(selectedDate).format("DD-MM-YYYY")} como folga?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setCalendarPopupOpen(false)}>
          Fechar
        </Button>

        <Button variant="danger" onClick={() => handleDelete(selectedDate)}>
          Remover
        </Button>

        <Button variant="success" onClick={() => handleOnclickDay(selectedDate)}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CalendarPopup
