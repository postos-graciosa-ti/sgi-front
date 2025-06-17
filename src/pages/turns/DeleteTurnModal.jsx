import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const DeleteTurnModal = (props) => {
  const {
    deleteTurnModalOpen,
    setDeleteTurnModalOpen,
    turnToDelete,
    setTurnToDelete,
    setTurnsList
  } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleClose = () => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie.value}/turns`)
      .then((response) => setTurnsList(response.data))

    setTurnToDelete()

    setDeleteTurnModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .delete(`/turns/${turnToDelete.id}`)
      .then(() => handleClose())
  }

  return (
    <>
      <Modal
        show={deleteTurnModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Tem certeza que deseja excluir o turno {turnToDelete && turnToDelete.name}?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
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