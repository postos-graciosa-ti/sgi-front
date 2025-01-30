import moment from "moment"
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (addSomeWorkersModalOpen == false) {
      setSomeWorkersDaysOff([])

      setSelectedWorkers([])
    }
  }, [addSomeWorkersModalOpen])

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
      let allDaysOff = [...someWorkersDaysOff, moment(date).format("DD-MM-YYYY")]

      allDaysOff.reduce((prevDayOff, currentDayOff) => {
        const currentDay = moment(currentDayOff, "DD-MM-YYYY")

        const previousDay = prevDayOff ? moment(prevDayOff, "DD-MM-YYYY") : moment(monthFirstDay, "DD-MM-YYYY")

        const numberToCompare = prevDayOff ? 8 : 7

        const dateDifference = currentDay.diff(previousDay, "days")

        if (dateDifference >= numberToCompare) {
          handleClose()

          Swal.fire({
            title: "Erro",
            text: "O dia selecionado não pode ter mais de 7 dias de diferença do dia anterior",
            icon: "error"
          })

          return
        }

        return currentDayOff
      }, null)

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
      let allWorkersTurnsIds = [];
      let allWorkersFunctionsIds = [];

      const workerPromises = workers.map((worker) =>
        api.get(`/workers/${worker.value}`).then((response) => {
          let workerData = response.data;
          allWorkersTurnsIds.push(workerData.turn_id);
          allWorkersFunctionsIds.push(workerData.function_id);
        })
      );

      Promise.all(workerPromises).then(() => {
        const hasDuplicateFunctionId = allWorkersFunctionsIds.some(
          (id, index) => allWorkersFunctionsIds.indexOf(id) !== index
        );
        const hasDuplicateTurnId = allWorkersTurnsIds.some(
          (id, index) => allWorkersTurnsIds.indexOf(id) !== index
        );

        if (hasDuplicateFunctionId || hasDuplicateTurnId) {
          Swal.fire({
            title: "Erro",
            text: "Selecione apenas colaboradores de turnos e funções diferentes",
            icon: "error"
          });

          handleClose();
          return;
        }

        setSelectedWorkers(workers);
      });
    } else {
      setSelectedWorkers(workers);
    }
  };

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