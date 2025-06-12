import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import api from '../../services/api'

const ApplicantAppointmentModal = (props) => {
  const { applicantAppointmentModalOpen, setApplicantAppointmentModalOpen } = props

  const { register, handleSubmit, reset } = useForm()

  const handleClose = () => {
    reset()

    setApplicantAppointmentModalOpen(false)
  }

  const onSubmit = (data) => {
    api
      .post("/applicants/appointments", data)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={applicantAppointmentModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Agendar horário de entrevista</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label fw-bold">Nome</label>

            <input
              type="text"
              className="form-control"
              {...register("name")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Data e hora</label>

            <input
              type="datetime-local"
              className="form-control"
              {...register("date")}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button variant="success" type="submit">Confirmar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ApplicantAppointmentModal
