import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const DeleteCostCenterModal = (props) => {
  const {
    deleteCostCenterModalOpen,
    setDeleteCostCenterModalOpen,
    selectedCostCenter,
    setCostCenterList,
    setSelectedCostCenter
  } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleClose = () => {
    api
      .get("/cost-center")
      .then((response) => setCostCenterList(response.data))
      .catch((error) => console.error(error))

    setSelectedCostCenter()

    setDeleteCostCenterModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .delete(`/cost-center/${selectedCostCenter.id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteCostCenterModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Apagar centro de custo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja apagar {selectedCostCenter?.name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Apagar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteCostCenterModal
