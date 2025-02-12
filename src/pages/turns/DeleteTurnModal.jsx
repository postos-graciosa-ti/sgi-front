import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import deleteTurn from '../../requests/deleteTurn'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'
import moment from 'moment'

const DeleteTurnModal = (props) => {
  const { deleteTurnModalOpen, setDeleteTurnModalOpen, GetTurns, turnToDelete, setTurnToDelete } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleCloseModal = () => {
    GetTurns()

    setTurnToDelete()

    setDeleteTurnModalOpen(false)
  }

  const handleSubmit = () => {
    deleteTurn(turnToDelete.id)
      .then(() => {
        let logFormData = {
          "happened_at": moment(new Date()).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date()).format("HH:mm"),
          "http_method": 3,
          "subsidiarie_id": selectedSubsidiarie.value,
          "user_id": userSession.id,
          "turn_id": turnToDelete.id
        }

        api
          .post(`/logs/turns`, logFormData)
          .then(() => {
            handleCloseModal()
          })
          .catch((error) => console.error(error))
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