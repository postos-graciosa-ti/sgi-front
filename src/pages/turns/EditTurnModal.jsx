import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const EditTurnModal = (props) => {
  const {
    editTurnModalOpen,
    setEditTurnModalOpen,
    turnToEdit,
    setTurnToEdit,
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

    setTurnToEdit({})

    setName('')

    setWeek()

    setStartTime('')

    setStartIntervalTime('')

    setEndIntervalTime('')

    setEndTime('')

    setEditTurnModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "name": name || turnToEdit.name,
      "week": week || turnToEdit.week,
      "start_time": startTime || turnToEdit.start_time.replace(/:\d{2}$/, ''),
      "start_interval_time": startIntervalTime || turnToEdit.start_interval_time.replace(/:\d{2}$/, ''),
      "end_interval_time": endIntervalTime || turnToEdit.end_interval_time.replace(/:\d{2}$/, ''),
      "end_time": endTime || turnToEdit.end_time.replace(/:\d{2}$/, '')
    }

    api
      .put(`/turns/${turnToEdit.id}`, formData)
      .then(() => handleClose())
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
          <label className='fw-bold mb-2'>Nome</label>

          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            defaultValue={turnToEdit && turnToEdit.name}
          />
        </div>

        <div className="mb-3">
          <label><b>Semana</b></label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setWeek(e.target.value)}
            defaultValue={turnToEdit?.week}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="start-time" className="form-label fw-bold mb-2">
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
          <label htmlFor="start-interval-time" className="form-label fw-bold mb-2">
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
          <label htmlFor="end-interval-time" className="form-label fw-bold mb-2">
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
          <label htmlFor="end-time" className="form-label fw-bold mb-2">
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