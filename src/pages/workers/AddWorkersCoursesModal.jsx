import axios from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from "../../services/api"

const AddWorkersCoursesModal = (props) => {
  const { addWorkersCoursesModalOpen, setAddWorkersCoursesModalOpen, selectedWorker } = props

  const [workersCoursesList, setWorkersCoursesList] = useState()

  const [file, setFile] = useState()

  useEffect(() => {
    api
      .get(`/workers-courses/${selectedWorker?.worker_id}`)
      .then((response) => {
        setWorkersCoursesList(response.data)
      })
  }, [addWorkersCoursesModalOpen])

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
      .then(() => {
        api
          .get(`/workers-courses/${selectedWorker?.worker_id}`)
          .then((response) => {
            setWorkersCoursesList(response.data)
          })
      })
  }

  return (
    <Modal
      show={addWorkersCoursesModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cursos de {selectedWorker?.worker_name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-2">
          <span className="fw-bold">Certificado</span>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="file"
              accept="application/pdf"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="col-auto">
            <button className="btn btn-warning" onClick={handleSubmit}>
              <Plus />
            </button>
          </div>
        </div>

        <div className="mt-5 mb-3">
          {
            workersCoursesList && workersCoursesList.map((course) => (
              <div
                key={course.id}
                className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm bg-white"
              >
                <a
                  href={`${import.meta.env.VITE_API_URL}/workers-courses/file/${course.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title='Abrir certificado'
                >
                  {dayjs(course.date_file).format("DD-MM-YYYY")}
                </a>

                {
                  course.is_payed && (
                    <span className="badge bg-success">PAGO</span>
                  ) || (
                    <span className="badge bg-danger">NÃO PAGO</span>
                  )
                }
              </div>
            ))
          }
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddWorkersCoursesModal
