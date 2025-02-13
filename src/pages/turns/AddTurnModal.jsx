import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'react-datetime/css/react-datetime.css'
import postTurn from '../../requests/postTurn'
import api from "../../services/api"
import useUserSessionStore from '../../data/userSession'
import moment from 'moment'

const AddTurnModal = (props) => {
  const { addTurnModalOpen, setAddTurnModalOpen, GetTurns } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setName] = useState('')

  const [startTime, setStartTime] = useState('')

  const [startIntervalTime, setStartIntervalTime] = useState('')

  const [endIntervalTime, setEndIntervalTime] = useState('')

  const [endTime, setEndTime] = useState('')

  const handleClose = () => {
    GetTurns()

    setName('')

    setStartTime('')

    setStartIntervalTime('')

    setEndIntervalTime('')

    setEndTime('')

    setAddTurnModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "name": name,
      "start_time": startTime,
      "start_interval_time": startIntervalTime,
      "end_interval_time": endIntervalTime,
      "end_time": endTime
    }

    postTurn(formData)
      .then((response) => {
        console.log(response)
        debugger

        let logStr = `
        ${userSession.name} adicionou ${response.data.name} (
        nome=${response.data.name}, 
        horário de inicio de turno=${response.data.start_time},
        horário de inicio de intervalo=${response.data.start_interval_time}
        horário de fim de intervalo=${response.data.end_interval_time}
        horário de fim de turn=${response.data.end_time}
        )`

        let logFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date()).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date()).format("HH:mm"),
          "subsidiarie_id": selectedSubsidiarie.value,
          "user_id": userSession.id
        }

        api
          .post(`/subsidiaries/${selectedSubsidiarie.value}/logs/turns`, logFormData)
          .then(() => handleClose())
      })
  }

  return (
    <Modal
      show={addTurnModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Turno</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="start-time" className="form-label">
            Hora de início do turno
          </label>

          <input
            type="time"
            className="form-control"
            placeholder="Hora de início do turno"
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="start-interval-time" className="form-label">
            Hora de início do intervalo
          </label>

          <input
            type="time"
            className="form-control"
            placeholder="Hora de início do intervalo"
            onChange={(e) => setStartIntervalTime(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="end-interval-time" className="form-label">
            Hora de término do intervalo
          </label>

          <input
            type="time"
            className="form-control"
            placeholder="Hora de término do intervalo"
            onChange={(e) => setEndIntervalTime(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="end-time" className="form-label">
            Hora de término do turno
          </label>

          <input
            type="time"
            className="form-control"
            placeholder="Hora de término do turno"
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Concluir
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTurnModal
