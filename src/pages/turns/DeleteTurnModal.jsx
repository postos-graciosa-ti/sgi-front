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
        let logStr = `
          ${userSession.name} deletou ${turnToDelete.name} (
            nome=${turnToDelete.name}, 
            horário de inicio de turno=${turnToDelete.start_time},
            horário de inicio de intervalo=${turnToDelete.start_interval_time},
            horário de fim de intervalo=${turnToDelete.end_interval_time},
            horário de fim de turn=${turnToDelete.end_time}
          )`

        let logFormData = {
          log_str: logStr,
          happened_at: moment(new Date()).format("DD-MM-YYYY"),
          happened_at_time: moment(new Date()).format("HH:mm"),
          subsidiarie_id: selectedSubsidiarie.value,
          user_id: userSession.id
        }

        api
          .post(`/subsidiaries/${selectedSubsidiarie.value}/logs/turns`, logFormData)
          .then(() => handleCloseModal())
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