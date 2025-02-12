import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import putTurn from '../../requests/putTurn'
import api from '../../services/api'
import moment from 'moment'
import useUserSessionStore from '../../data/userSession'

const EditTurnModal = (props) => {
  const { editTurnModalOpen, setEditTurnModalOpen, GetTurns, turnToEdit, setTurnToEdit } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setName] = useState('')

  const [startTime, setStartTime] = useState('')

  const [startIntervalTime, setStartIntervalTime] = useState('')

  const [endIntervalTime, setEndIntervalTime] = useState('')

  const [endTime, setEndTime] = useState('')

  const handleClose = () => {
    GetTurns()

    setTurnToEdit({})

    setName('')

    setStartTime('')

    setStartIntervalTime('')

    setEndIntervalTime('')

    setEndTime('')

    setEditTurnModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "name": name || turnToEdit.name,
      "start_time": startTime || turnToEdit.start_time.replace(/:\d{2}$/, ''),
      "start_interval_time": startIntervalTime || turnToEdit.start_interval_time.replace(/:\d{2}$/, ''),
      "end_interval_time": endIntervalTime || turnToEdit.end_interval_time.replace(/:\d{2}$/, ''),
      "end_time": endTime || turnToEdit.end_time.replace(/:\d{2}$/, '')
    }

    putTurn(turnToEdit.id, formData)
      .then((response) => {
        let logFormData = {
          "happened_at": moment(new Date()).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date()).format("HH:mm"),
          "http_method": 2,
          "subsidiarie_id": selectedSubsidiarie.value,
          "user_id": userSession.id,
          "turn_id": response.data.id
        }

        api
          .post(`/logs/turns`, logFormData)
          .then(() => {
            handleClose()
          })
          .catch((error) => console.error(error))
      })
  }

  return (
    <Modal
      show={editTurnModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Turno</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            defaultValue={turnToEdit && turnToEdit.name}
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
            defaultValue={turnToEdit && turnToEdit.start_time}
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
            defaultValue={turnToEdit && turnToEdit.start_interval_time}
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
            defaultValue={turnToEdit && turnToEdit.end_interval_time}
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
            defaultValue={turnToEdit && turnToEdit.end_time}
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

export default EditTurnModal