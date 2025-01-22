import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from "../../services/api"

const DeleteDepartmentModal = (props) => {
  const { deleteDepartmentModalOpen, setDeleteDepartmentModalOpen, selectedDepartment, setDepartmentsList } = props

  const handleSubmit = async () => {
    await api
      .delete(`/departments/${selectedDepartment.id}`)
      .then(async () => {
        await api
          .get("/departments")
          .then((response) => {
            setDeleteDepartmentModalOpen(false)
            
            setDepartmentsList(response.data)
          })
      })
  }

  return (
    <>
      <Modal
        show={deleteDepartmentModalOpen}
        onHide={() => setDeleteDepartmentModalOpen(false)}
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
          <Button variant="light" onClick={() => setDeleteDepartmentModalOpen(false)}>Fechar</Button>

          <Button variant="danger" onClick={handleSubmit}>Apagar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteDepartmentModal
