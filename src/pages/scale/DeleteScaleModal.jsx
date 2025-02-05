import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

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

  const handleRemoveDayOff = () => {
    let updatedDaysOff = daysOff.filter((dayOff) => dayOff != moment(selectedDate).format("DD-MM-YYYY"))

    console.log(updatedDaysOff)
    debugger

    if (daysOff.length == 1) {
      setDaysOff(updatedDaysOff)

      setDeleteScaleModalOpen(false)

      return
    }

    const sortedDaysOff = [...updatedDaysOff].sort((a, b) => {
      const dataA = new Date(a.split("-").reverse().join("-"))

      const dataB = new Date(b.split("-").reverse().join("-"))

      return dataA - dataB
    })

    const primeiraData = new Date(sortedDaysOff[0].split("-").reverse().join("-"))

    const ultimaData = new Date(sortedDaysOff[sortedDaysOff.length - 1].split("-").reverse().join("-"))

    primeiraData.setDate(1)

    ultimaData.setMonth(ultimaData.getMonth() + 1)

    ultimaData.setDate(0)

    const formatarData = (data) =>
      String(data.getDate()).padStart(2, "0") + "-" +

      String(data.getMonth() + 1).padStart(2, "0") + "-" +

      data.getFullYear()

    let formData = {
      "worker_id": selectedWorker.value,
      "worker_turn_id": selectedWorkerInfo.turn_id,
      "worker_function_id": selectedWorkerInfo.function_id,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": formatarData(primeiraData),
      "last_day": formatarData(ultimaData),
      "days_off": `[${updatedDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${updatedDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`
    }

    console.log(formData)
    debugger

    api
      .post("/delete-scale", formData)
      .then((response) => {
        console.log(response)
        debugger

        setDeleteScaleModalOpen(false)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => {
            setScalesList(response.data)

            setDaysOff(updatedDaysOff)
          })
      })
      .catch((error) => {
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