import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import deleteTurn from '../../requests/deleteTurn'

const DeleteTurnModal = (props) => {
  const { deleteTurnModalOpen, setDeleteTurnModalOpen, GetTurns, turnToDelete, setTurnToDelete } = props

  const handleCloseModal = () => {
    GetTurns()

    setTurnToDelete()

    setDeleteTurnModalOpen(false)
  }

  const handleSubmit = () => {
    deleteTurn(turnToDelete.id)
      .then(() => handleCloseModal())
  }

  return (
    <>
      <Modal
        show={deleteTurnModalOpen}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Confirmar exclusão
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Tem certeza que deseja excluir o turno {turnToDelete && turnToDelete.name}?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleCloseModal}>
            Fechar
          </Button>

          <Button variant="danger" onClick={handleSubmit}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteTurnModal