import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import putTurn from '../../requests/putTurn'

const EditTurnModal = (props) => {
  const { editTurnModalOpen, setEditTurnModalOpen, GetTurns, turnToEdit, setTurnToEdit } = props

  const [name, setName] = useState('')
  
  const [startTime, setStartTime] = useState('')
  
  const [startIntervalTime, setStartIntervalTime] = useState('')
  
  const [endIntervalTime, setEndIntervalTime] = useState('')
  
  const [endTime, setEndTime] = useState('')

  const handleClose = () => {
    setTurnToEdit({});

    setEditTurnModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    let formData = {
      "name": name || turnToEdit.name,
      "start_time": startTime || turnToEdit.start_time.replace(/:\d{2}$/, ''),
      "start_interval_time": startIntervalTime || turnToEdit.start_interval_time.replace(/:\d{2}$/, ''),
      "end_interval_time": endIntervalTime || turnToEdit.end_interval_time.replace(/:\d{2}$/, ''),
      "end_time": endTime || turnToEdit.end_time.replace(/:\d{2}$/, '')
    }
  
    putTurn(turnToEdit.id, formData)
      .then((response) => {
        console.log(response)
  
        GetTurns()
  
        handleClose()
  
        // Limpa o estado após a submissão
        setTurnToEdit({});
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

      <form onSubmit={handleSubmit}>
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

          <Button type="submit" variant="success">
            Concluir
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditTurnModal