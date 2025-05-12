import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'
import ExamsCorrectionModal from './ExamsCorrectionModal'

const RhInterviewModal = (props) => {
  const { rhInterviewModalOpen, setRhInterviewModalOpen, selectedApplicant, setApplicantsList, setSelectedApplicant } = props

  const [examsCorrectionModalOpen, setExamsCorrectionModalOpen] = useState(false)

  const [usersList, setUsersList] = useState()

  const [nature, setNature] = useState()

  const [howLong, setHowLong] = useState()

  const [experienceFunction, setExperienceFunction] = useState()

  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.user_id, label: option.user_name }))

        setUsersList(options)
      })
  }, [rhInterviewModalOpen])

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setSelectedApplicant()

    setNature()

    setHowLong()

    setExperienceFunction()

    setSelectedUser()

    setRhInterviewModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      nature: nature,
      how_long: howLong,
      experience_function: experienceFunction,
      redirect_to: selectedUser?.value,
    }

    api
      .patch(`/applicants/${selectedApplicant?.Applicants?.id}`, requestBody)
      .then(() => handleClose())
  }

  const handleOpenExamsCorrectionModal = () => {
    setExamsCorrectionModalOpen(true)
  }

  return (
    <Modal
      show={rhInterviewModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Entrevista com RH</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <button className="btn btn-primary mb-3" onClick={handleOpenExamsCorrectionModal}>
          Corrigir provas
        </button>

        <div className="mb-3">
          <span><b>{moment().format("DD-MM-YYYY")}</b>: <b>{selectedApplicant?.Applicants?.name}</b> concorrendo a vaga para <b>{selectedApplicant?.Function?.name}</b></span>
        </div>

        <div className="mb-3">
          <label><b>Natural</b></label>

          <input
            className="form-control"
            onChange={(e) => setNature(e.target.value)}
            defaultValue={selectedApplicant?.Applicants?.nature && selectedApplicant?.Applicants?.nature || null}
            disabled={selectedApplicant?.Applicants?.nature && true || false}
          />
        </div>

        <div className="mb-3">
          <label><b>Quanto tempo?</b></label>

          <input
            className="form-control"
            onChange={(e) => setHowLong(e.target.value)}
            defaultValue={selectedApplicant?.Applicants?.how_long && selectedApplicant?.Applicants?.how_long || null}
            disabled={selectedApplicant?.Applicants?.how_long && true || false}
          />
        </div>

        <div className="mb-3">
          <label><b>Possui experiência na função?</b></label>

          <input
            className="form-control"
            onChange={(e) => setExperienceFunction(e.target.value)}
            defaultValue={selectedApplicant?.Applicants?.experience_function && selectedApplicant?.Applicants?.experience_function || null}
            disabled={selectedApplicant?.Applicants?.experience_function && true || false}
          />
        </div>

        <div className="mb-3">
          <label><b>Encaminhar para</b></label>

          <ReactSelect
            options={usersList}
            placeholder={""}
            onChange={(value) => setSelectedUser(value)}
            defaultValue={selectedApplicant?.Applicants?.redirect_to && usersList?.find((user) => user.value == selectedApplicant?.Applicants?.redirect_to)}
            isDisabled={selectedApplicant?.Applicants?.redirect_to && true || false}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="light"
          onClick={handleClose}
        >
          Fechar
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit}
        >
          Concluir
        </Button>
      </Modal.Footer>

      <ExamsCorrectionModal
        examsCorrectionModalOpen={examsCorrectionModalOpen}
        setExamsCorrectionModalOpen={setExamsCorrectionModalOpen}
      />
    </Modal>
  )
}

export default RhInterviewModal