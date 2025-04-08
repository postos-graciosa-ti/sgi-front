import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import deleteStates from "../../requests/states/deleteStates"
import getStates from '../../requests/states/getStates'

const DeleteStateModal = (props) => {
  const {
    deleteStateModalOpen,
    setDeleteStateModalOpen,
    selectedState,
    setStatesList
  } = props

  const handleClose = () => {
    getStates()
      .then((response) => setStatesList(response?.data))

    setDeleteStateModalOpen(false)
  }

  const handleSubmit = () => {
    deleteStates(selectedState?.id)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteStateModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmar exclusão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja excluir {selectedState?.name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteStateModal