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
      .then(() => handleClose())
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

        {/* <div className="mb-3">
          <label className="fw-bold form-label">Certificado (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div> */}

        {
          workersCoursesList && workersCoursesList.map((course) => (
            <div key={course.id} style={{ marginBottom: "2rem", marginTop: "2rem" }}>
              <h5>{dayjs(course.date_file).format("DD-MM-YYYY")}</h5>

              {
                course.is_payed && (
                  <div className="card mt-3 mb-3 p-3 rounded shadow text-center text-success fw-bold">
                    PAGO
                  </div>
                ) || (
                  <div className="card mt-3 mb-3 p-3 rounded shadow text-center text-danger fw-bold">
                    NÃO PAGO
                  </div>
                )
              }

              <iframe
                src={`${import.meta.env.VITE_API_URL}/workers-courses/file/${course.id}`}
                width="100%"
                height="600px"
                title={`Curso ${course}`}
                style={{ border: "1px solid #ccc", borderRadius: "8px" }}
              />
            </div>
          ))
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
        {/* <Button variant="success" onClick={handleSubmit}>Confirmar</Button> */}
      </Modal.Footer>
    </Modal>
  )
}

export default AddWorkersCoursesModal
