import dayjs from 'dayjs'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const AddWorkersCoursesModal = (props) => {
  const { addWorkersCoursesModalOpen, setAddWorkersCoursesModalOpen, selectedWorker } = props

  const [file, setFile] = useState()

  const handleClose = () => {
    setAddWorkersCoursesModalOpen(false)
  }

  const handleSubmit = () => {
    const requestBody = new FormData()

    requestBody.append("worker_id", selectedWorker?.worker_id)

    requestBody.append("file", file)

    requestBody.append("date_file", dayjs().format("YYYY-MM-DD"))

    requestBody.append("is_payed", "false")

    api
      .post(`/workers-courses`, requestBody)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Erro ao enviar:", error.response?.data || error.message)
      })
  }

  return (
    <Modal
      show={addWorkersCoursesModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar cursos para colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="fw-bold form-label">
            Certificado
          </label>

          <input
            type="file"
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