import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'
import moment from 'moment'

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
      .then(() => {
        let logStr = `${userSession.name} apagou ${selectedCostCenter.name}`

        let logFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date).format("HH:mm"),
          "subsidiarie_id": selectedSubsidiarie.value,
          "user_id": userSession.id
        }

        api
          .post(`/subsidiaries/${selectedSubsidiarie.value}/logs/costs-centers`, logFormData)
          .then(() => handleClose())
      })
      .catch((error) => console.error(error))
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
