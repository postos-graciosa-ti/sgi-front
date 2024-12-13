import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import deleteTurn from '../../requests/deleteTurn'

const DeleteTurnModal = (props) => {
  const { deleteTurnModalOpen, setDeleteTurnModalOpen, GetTurns, turnToDelete } = props

  const handleCloseModal = () => {
    setDeleteTurnModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    deleteTurn(turnToDelete.id)
      .then(() => {
        GetTurns()

        handleCloseModal()
      })
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