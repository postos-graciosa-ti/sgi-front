import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const DeleteNeighborhoodModal = (props) => {
  const { deleteNeighborhoodModalOpen, setDeleteNeighborhoodModalOpen, selectedNeighborhood, setNeighborhoods, setSelectedNeighborhood } = props

  const handleClose = () => {
    api
      .get("/neighborhoods")
      .then((response) => setNeighborhoods(response.data))

    setSelectedNeighborhood()

    setDeleteNeighborhoodModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .delete(`/neighborhoods/${selectedNeighborhood?.id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteNeighborhoodModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmar ação</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja excluir {selectedNeighborhood?.name}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteNeighborhoodModal