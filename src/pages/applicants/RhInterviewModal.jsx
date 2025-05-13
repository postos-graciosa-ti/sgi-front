import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const RhInterviewModal = (props) => {
  const { rhInterviewModalOpen, setRhInterviewModalOpen, selectedApplicant, setSelectiveProcessModalOpen, setApplicantsList } = props

  const [usersOptions, setUsersOptions] = useState()

  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.user_id, label: option.user_name }))

        setUsersOptions(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setRhInterviewModalOpen(false)

    setSelectiveProcessModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      redirect_to: selectedUser.value
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={rhInterviewModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Entrevista com recursos humanos de {selectedApplicant?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="form-label fw-bold">
          Direcionar para:
        </label>

        <ReactSelect
          placeholder={""}
          options={usersOptions}
          onChange={(value) => setSelectedUser(value)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RhInterviewModal