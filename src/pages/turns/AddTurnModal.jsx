import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'react-datetime/css/react-datetime.css'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AddTurnModal = (props) => {
  const {
    addTurnModalOpen,
    setAddTurnModalOpen,
    setTurnsList
  } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setName] = useState('')

  const [week, setWeek] = useState()

  const [startTime, setStartTime] = useState('')

  const [startIntervalTime, setStartIntervalTime] = useState('')

  const [endIntervalTime, setEndIntervalTime] = useState('')

  const [endTime, setEndTime] = useState('')

  const handleClose = () => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/turns`)
      .then((response) => setTurnsList(response.data))

    setName('')

    setWeek()

    setStartTime('')

    setStartIntervalTime('')

    setEndIntervalTime('')

    setEndTime('')

    setAddTurnModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "name": name,
      "week": week,
      "start_time": startTime,
      "start_interval_time": startIntervalTime,
      "end_interval_time": endIntervalTime,
      "end_time": endTime,
      "subsidiarie_id": selectedSubsidiarie.value
    }

    api
      .post('/turns', formData)
      .then(() => handleClose())
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
          <label><b>Nome</b></label>

          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label><b>Semana</b></label>

          <input
            type="text"
            className="form-control"
            placeholder="Semana"
            onChange={(e) => setWeek(e.target.value)}
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
