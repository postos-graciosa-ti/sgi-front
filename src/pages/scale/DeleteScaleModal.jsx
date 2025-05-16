import moment from 'moment'
import { useEffect, useState } from 'react'
import { Dash, Plus } from 'react-bootstrap-icons'
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

  const [dateEventsList, setDateEventsList] = useState()

  const [newDateEvent, setNewDateEvent] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/dates/${moment(selectedDate).format("YYYY-MM-DD")}/dates-events`)
      .then((response) => setDateEventsList(response.data))
  }, [deleteScaleModalOpen])

  const handleRemoveDayOff = () => {
    let updatedDaysOff = daysOff.filter((dayOff) => dayOff != moment(selectedDate).format("DD-MM-YYYY"))

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

    api
      .post("/delete-scale", formData)
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
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: `${error.response.data.detail}`
        })
      })
  }

  const handleAddDateEvent = () => {
    let formData = {
      event_name: newDateEvent,
      date: moment(selectedDate).format("YYYY-MM-DD")
    }

    api
      .post(`/subsidiaries/${selectedSubsdiarie?.value}/dates-events`, formData)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsdiarie?.value}/dates/${moment(selectedDate).format("YYYY-MM-DD")}/dates-events`)
          .then((response) => setDateEventsList(response.data))
      })
  }

  const handleDeleteDateEvent = (event) => {
    api
      .delete(`/subsidiaries/${selectedSubsdiarie?.value}/dates-events/${event.id}`)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsdiarie?.value}/dates/${moment(selectedDate).format("YYYY-MM-DD")}/dates-events`)
          .then((response) => setDateEventsList(response.data))
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
        <Modal.Title>Remover {moment(selectedDate).format("DD-MM-YYYY")} da escala?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          dateEventsList && dateEventsList.map((event) => (
            <div key={event.id} className="row mb-3">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  value={event.event_name}
                  disabled
                />
              </div>

              <div className="col-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteDateEvent(event)}
                >
                  <Dash />
                </button>
              </div>
            </div>
          ))
        }

        <div className="row">
          <div className="col-10">
            <input
              type="text"
              placeholder="Deseja adicionar um evento? (opcional)"
              className="form-control"
              onChange={(e) => setNewDateEvent(e.target.value)}
            />
          </div>

          <div className="col-2">
            <button
              className="btn btn-warning"
              onClick={handleAddDateEvent}
            >
              <Plus />
            </button>
          </div>
        </div>
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