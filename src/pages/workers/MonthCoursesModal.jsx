import dayjs from "dayjs"
import { useEffect, useState } from 'react'
import { Trash } from "react-bootstrap-icons"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from "../../services/api"

const MonthCoursesModal = (props) => {
  const { monthCoursesModalOpen, setMonthCoursesModalOpen } = props

  const [monthCourses, setMonthCourses] = useState()

  useEffect(() => {
    api
      .get(`/workerscourses/current-month`)
      .then((response) => {
        setMonthCourses(response.data)
      })
  }, [monthCoursesModalOpen])

  const handleClose = () => {
    setMonthCoursesModalOpen(false)
  }

  return (
    <Modal
      show={monthCoursesModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cursos Mensais</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          {
            monthCourses && monthCourses.map((course) => (
              <div className="mt-4 mb-5" key={course.id}>
                <div className="row align-items-center mb-3">
                  <div className="col">
                    <span className="fs-5">{course.worker_name} ({dayjs(course.date_file).format("DD-MM-YYYY")})</span>
                  </div>

                  <div className="col-auto">
                    <button className="btn btn-danger">
                      <Trash />
                    </button>
                  </div>
                </div>

                <iframe
                  src={`${import.meta.env.VITE_API_URL}/workers-courses/file/${course.id}`}
                  width="100%"
                  height="500px"
                  style={{ border: "1px solid #ccc" }}
                  title={`Curso ${course.id}`}
                />
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

export default MonthCoursesModal