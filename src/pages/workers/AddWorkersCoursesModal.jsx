import axios from 'axios'
import dayjs from 'dayjs'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const AddWorkersCoursesModal = (props) => {
  const { addWorkersCoursesModalOpen, setAddWorkersCoursesModalOpen, selectedWorker } = props

  const [file, setFile] = useState()

  const handleClose = () => {
    setFile(null)

    setAddWorkersCoursesModalOpen(false)
  }

  const handleSubmit = () => {
    const requestBody = new FormData()

    requestBody.append("worker_id", selectedWorker.worker_id)

    requestBody.append("file", file)

    requestBody.append("date_file", dayjs().format("YYYY-MM-DD"))

    requestBody.append("is_payed", "false")

    axios
      .post(`${import.meta.env.VITE_API_URL}/workers-courses`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addWorkersCoursesModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar curso para colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="fw-bold form-label">Certificado (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddWorkersCoursesModal
