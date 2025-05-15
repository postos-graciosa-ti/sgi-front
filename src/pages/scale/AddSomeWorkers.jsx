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
  const { addSomeWorkersModalOpen, setAddSomeWorkersModalOpen, setScalesList } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [someWorkersDaysOff, setSomeWorkersDaysOff] = useState([])

  const [localWorkersOptions, setLocalWorkersOptions] = useState([])

  const [selectedWorkers, setSelectedWorkers] = useState([])

  const [turnsOptions, setTurnsOptions] = useState([])

  const [selectedTurn, setSelectedTurn] = useState()

  useEffect(() => {
    if (addSomeWorkersModalOpen == false) {
      setSomeWorkersDaysOff([])

      setSelectedWorkers([])
    }
  }, [addSomeWorkersModalOpen])

  useEffect(() => {
    if (selectedTurn) {
      api
        .get(`/workers/turns/${selectedTurn?.value}/subsidiarie/${selectedSubsdiarie?.value}`)
        .then((response) => {
          let options = response.data.map((option) => ({ value: option.id, label: option.name }))

          setLocalWorkersOptions(options)
        })
    }
  }, [selectedTurn])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setTurnsOptions(options)
      })
  }, [])

  const handleClose = () => {
    setAddSomeWorkersModalOpen(false)

    setSomeWorkersDaysOff([])

    setLocalWorkersOptions([])

    setSelectedWorkers([])

    setSelectedTurn()
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
    const validations = [
      { condition: !selectedTurn, message: "Não é possível salvar sem turno selecionado" },
      { condition: selectedWorkers.length === 0, message: "Não é possível salvar sem colaboradores selecionados" }
    ]

    for (const { condition, message } of validations) {
      if (condition) {
        Swal.fire({
          icon: "warning",
          title: "Aviso",
          text: `_${message}_`,
        })

        throw new Error(`_${message}_`)
      }
    }

    const sortedDaysOff = [...someWorkersDaysOff].sort((a, b) => {
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

      data.getFullYear();

    let count = 0

    let ahuashua = []

    for (let currentDate = new Date(primeiraData); currentDate <= ultimaData; currentDate.setDate(currentDate.getDate() + 1)) {
      count++

      sortedDaysOff.forEach((dayOff) => {
        if (moment(currentDate).format("DD-MM-YYYY") === dayOff) {
          ahuashua.push({ date: dayOff, proportion: `${count - 1}x1` })

          count = 0
        }
      })
    }

    let formData = {
      "worker_ids": `[${selectedWorkers.map(dayOff => `'${dayOff.value}'`).join(',')}]`,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": formatarData(primeiraData),
      "last_day": formatarData(ultimaData),
      "days_off": `[${someWorkersDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${someWorkersDaysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
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
            options={turnsOptions}
            value={selectedTurn}
            onChange={(value) => setSelectedTurn(value)}
            placeholder="Selecione o turno"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="mb-3">
          <Select
            options={localWorkersOptions}
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
  )
}

export default AddSomeWorkersModal