import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const SpecialNotationModal = (props) => {
  const { specialNotatioModalOpen, setSpecialNotatioModalOpen, selectedApplicant, setSelectedApplicant, setApplicantsList } = props

  const [specialNotation, setSpecialNotation] = useState()

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setSelectedApplicant()

    setSpecialNotatioModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      special_notation: specialNotation
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={specialNotatioModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Anotação especial</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <textarea
          className="form-control"
          rows={3}
          onChange={(e) => setSpecialNotation(e.target.value)}
          defaultValue={selectedApplicant?.special_notation}
          disabled={selectedApplicant?.special_notation && true}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SpecialNotationModal