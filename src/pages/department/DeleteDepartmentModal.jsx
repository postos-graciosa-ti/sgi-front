import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from "../../services/api"
import useUserSessionStore from '../../data/userSession'

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
      .then(() => {
        let logStr = `${userSession.name} apagou ${selectedDepartment?.name} (nome=${selectedDepartment?.name}, descrição=${selectedDepartment?.description})`

        let logsFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date()).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date()).format("HH:mm"),
          "subsidiarie_id": selectedSubsidiarie.value,
          "user_id": userSession.id
        }

        api
          .post(`/subsidiaries/${selectedSubsidiarie.value}/logs/departments`, logsFormData)
          .then(() => handleClose())
      })
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
