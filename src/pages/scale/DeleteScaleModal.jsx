import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const calculateDateDifference = (startDate, endDate) => {
  const [startDay, startMonth, startYear] = startDate.split('-').map(Number)

  const [endDay, endMonth, endYear] = endDate.split('-').map(Number)

  const initialDate = new Date(startYear, startMonth - 1, startDay)

  const finalDate = new Date(endYear, endMonth - 1, endDay)

  const differenceInMilliseconds = finalDate - initialDate

  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)

  return differenceInDays
}

const DeleteScaleModal = (props) => {
  const {
    deleteScaleModalOpen,
    setDeleteScaleModalOpen,
    selectedDate,
    daysOff,
    selectedWorker,
    setScalesList,
    setDaysOff,
    selectedWorkerInfo
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const handleRemoveDayOff = () => {
    let updatedDaysOff = daysOff.filter((dayOff) => dayOff != moment(selectedDate).format("DD-MM-YYYY"))

    if (daysOff.length == 1) {
      setDaysOff(updatedDaysOff)

      setDeleteScaleModalOpen(false)

      return
    }

    let result = {}

    updatedDaysOff.reduce((prevDayOff, currentDayOff) => {
      if (prevDayOff) {
        let dateDifference = calculateDateDifference(prevDayOff, currentDayOff)

        if (dateDifference >= 7) {
          result['hasError'] = true
          result['errorMessage'] = "O dia selecionado ultrapassa os 6 dias permitidos por lei xxx"
        }

      } else {
        let dateDifference = calculateDateDifference(moment(monthFirstDay).format("DD-MM-YYYY"), currentDayOff)

        if (dateDifference >= 7) {
          result['hasError'] = true;
          result['errorMessage'] = "O dia selecionado ultrapassa os 6 dias permitidos por lei xxx"
        }
      }

      return currentDayOff
    }, null)

    if (result.hasError) {
      Swal.fire({
        icon: "error",
        title: "Erro ao selecionar data",
        text: `${result.errorMessage}`
      })

      setDeleteScaleModalOpen(false)

      return
    }

    let formData = {
      "worker_id": selectedWorker.value,
      "worker_turn_id": selectedWorkerInfo.turn_id,
      "worker_function_id": selectedWorkerInfo.function_id,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": moment(monthFirstDay).format("DD-MM-YYYY"),
      "last_day": moment(monthLastDay).format("DD-MM-YYYY"),
      "days_off": `[${updatedDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${updatedDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`
    }

    api
      .post(`/scales`, formData)
      .then((response) => {
        setDeleteScaleModalOpen(false)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => {
            setScalesList(response.data)

            setDaysOff(updatedDaysOff)
          })
      })
      .catch((error) => {
        console.error(error.response.data.detail)

        Swal.fire({
          icon: "error",
          title: "Erro",
          text: `${error.response.data.detail}`
        })
      })
  }

  return (
    <Modal
      show={deleteScaleModalOpen}
      onHide={() => setDeleteScaleModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Remover <b>{moment(selectedDate).format("DD-MM-YYYY")}</b> da escala?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Deseja realmente remover <b>{moment(selectedDate).format("DD-MM-YYYY")}</b> da escala?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setDeleteScaleModalOpen(false)}>
          Fechar
        </Button>

        <Button variant="danger" onClick={() => handleRemoveDayOff()}>
          Remover
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteScaleModal