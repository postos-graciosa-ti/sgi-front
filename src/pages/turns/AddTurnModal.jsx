import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import postTurn from '../../requests/postTurn'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const AddTurnModal = (props) => {
  const { addTurnModalOpen, setAddTurnModalOpen, GetTurns } = props

  const [name, setName] = useState('')

  const [startTime, setStartTime] = useState('')

  const [startIntervalTime, setStartIntervalTime] = useState('')

  const [endIntervalTime, setEndIntervalTime] = useState('')

  const [endTime, setEndTime] = useState('')

  const handleClose = () => {
    setAddTurnModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "start_time": startTime,
      "start_interval_time": startIntervalTime,
      "end_interval_time": endIntervalTime,
      "end_time": endTime
    }

    postTurn(formData)
      .then(() => {
        handleClose()

        GetTurns()
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

      <form onSubmit={handleSubmit}>
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

            <Datetime
              dateFormat={false}
              timeFormat="HH:mm:ss"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              inputProps={{ className: 'form-control', placeholder: 'hh:mm:ss' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="start-interval-time" className="form-label">
              Hora de início do intervalo
            </label>

            <Datetime
              dateFormat={false}
              timeFormat="HH:mm:ss"
              value={startIntervalTime}
              onChange={(e) => setStartIntervalTime(e.target.value)}
              inputProps={{ className: 'form-control', placeholder: 'hh:mm:ss' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="end-interval-time" className="form-label">
              Hora de término do intervalo
            </label>

            <Datetime
              dateFormat={false}
              timeFormat="HH:mm:ss"
              value={endIntervalTime}
              onChange={(e) => setEndIntervalTime(e.target.value)}
              inputProps={{ className: 'form-control', placeholder: 'hh:mm:ss' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="end-time" className="form-label">
              Hora de término do turno
            </label>

            <Datetime 
              dateFormat={false}
              timeFormat="HH:mm:ss"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              inputProps={{ className: 'form-control', placeholder: 'hh:mm:ss' }}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>

          <Button type="submit" variant="success">
            Concluir
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddTurnModal