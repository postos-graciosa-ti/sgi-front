import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const ConfirmApplicantDeleteModal = (props) => {
  const { confirmApplicantDeleteModalOpen, setConfirmApplicantDeleteModalOpen, selectedApplicant, setApplicantsList } = props

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

    setConfirmApplicantDeleteModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .delete(`/applicants/${selectedApplicant?.id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={confirmApplicantDeleteModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Excluir {selectedApplicant?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Confirmar essa ação?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmApplicantDeleteModal