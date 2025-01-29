import moment from "moment"
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Calendar from "react-calendar"
import Select from "react-select"
import Swal from "sweetalert2"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"

const AddSomeWorkersModal = (props) => {
  const {
    addSomeWorkersModalOpen,
    setAddSomeWorkersModalOpen,
    workersOptions,
    selectedWorker,
    selectedWorkerInfo,
    setScalesList,
    scalesList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const [someWorkersDaysOff, setSomeWorkersDaysOff] = useState([])

  const [selectedWorkers, setSelectedWorkers] = useState([])

  const handleClose = () => {
    setAddSomeWorkersModalOpen(false)

    setSomeWorkersDaysOff([])

    setSelectedWorkers([])
  }

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = moment(date).format("DD-MM-YYYY")
      
      const isDayOff = someWorkersDaysOff.some(
        (dayOff) => dayOff === dateStr
      )
      
      return isDayOff ? 'bg-danger text-white' : null;
    }

    return null
  }

  const handleDayClick = (date) => {
    let alreadyInDaysOffList = someWorkersDaysOff.some((dayOff) => dayOff == moment(date).format("DD-MM-YYYY"))

    if (alreadyInDaysOffList) {
      let updatedDaysOff = someWorkersDaysOff.filter((dayOff) => dayOff != moment(date).format("DD-MM-YYYY"))

      setSomeWorkersDaysOff(updatedDaysOff)

    } else {
      setSomeWorkersDaysOff((prev) => {
        if (prev) {
          return [...prev, moment(date).format("DD-MM-YYYY")]
        } else {
          return [moment(date).format("DD-MM-YYYY")]
        }
      })
    }
  }

  const handleSubmit = () => {
    let formData = {
      "worker_ids": `[${selectedWorkers.map(dayOff => `'${dayOff.value}'`).join(',')}]`,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": moment(monthFirstDay).format("DD-MM-YYYY"),
      "last_day": moment(monthLastDay).format("DD-MM-YYYY"),
      "days_off": `[${someWorkersDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${someWorkersDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      // "worker_turn_id": 1,
      // "worker_function_id": 1
    }

    api
      .post(`/scales/some-workers`, formData)
      .then(() => {
        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => setScalesList(response.data))

        handleClose()
      })
  }

  const handleOnChangeWorker = (workers) => {
    if (workers.length > 1) {
      workers && workers.reduce((prev, curr) => {
        api
          .get(`/workers/${prev.value}`)
          .then((prevWorker) => {
            api
              .get(`/workers/${curr.value}`)
              .then((currWorker) => {
                let condition = prevWorker.data.function_id != currWorker.data.function_id && prevWorker.data.turn_id != currWorker.data.turn_id
                
                if (condition) {
                  Swal.fire({
                    title: "Erro",
                    text: "Selecione apenas colaboradores do mesmo turno e função",
                    icon: "error"
                  })

                  handleClose()

                  return

                } else {
                  setSelectedWorkers(workers)
                }
              })
          })
        return curr
      })
    }
    
    setSelectedWorkers(workers)
  }

  return (
    <Modal
      show={addSomeWorkersModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Escala Coletiva</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <Select
            options={workersOptions}
            isMulti
            value={selectedWorkers}
            onChange={handleOnChangeWorker}
            placeholder="Selecione os colaboradores"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div>
          <Calendar
            className="calendar-container w-100 rounded"
            tileClassName={tileClassName}
            onClickDay={handleDayClick}
            locale="pt-BR"
            formatDay={(_, date) => moment(date).format("D")}
            showNeighboringMonth={false}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSomeWorkersModal;