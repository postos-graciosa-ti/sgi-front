import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from "../../services/api"

const DeleteDepartmentModal = (props) => {
  const { deleteDepartmentModalOpen, setDeleteDepartmentModalOpen, selectedDepartment, setDepartmentsList, setSelectedDepartment } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const userSession = useUserSessionStore(state => state.userSession)

  const handleClose = () => {
    api
      .get("/departments")
      .then((response) => setDepartmentsList(response.data))

    setSelectedDepartment()

    setDeleteDepartmentModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .delete(`/departments/${selectedDepartment.id}`)
      .then(() => handleClose())
  }

  return (
    <>
      <Modal
        show={deleteDepartmentModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletar setor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Deseja realmente apagar {selectedDepartment?.name}?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button variant="danger" onClick={handleSubmit}>Apagar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteDepartmentModal
