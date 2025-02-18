import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import deleteSubsidiarieTurns from "../../requests/turns/deleteSubsidiarieTurns"
import getSubsidiarieTurns from '../../requests/turns/getSubsidiarieTurns'
import postTurnsLogs from '../../requests/turns/turnsLogs/postTurnsLogs'

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
    getSubsidiarieTurns(selectedSubsidiarie.value)
      .then((response) => setTurnsList(response.data))

    setTurnToDelete()

    setDeleteTurnModalOpen(false)
  }

  const handleSubmit = () => {
    deleteSubsidiarieTurns(turnToDelete.id)
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

        postTurnsLogs(selectedSubsidiarie.value, logFormData)
          .then(() => handleClose())
      })
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