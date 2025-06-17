import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const DeleteFunctionsModal = (props) => {
  const {
    deleteFunctionModalOpen,
    setDeleteFunctionModalOpen,
    selectedFunction,
    setFunctionsList,
    setSelectedFunction
  } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const userSession = useUserSessionStore(state => state.userSession)

  const handleClose = () => {
    api
      .get("/functions")
      .then((response) => setFunctionsList(response.data))

    setSelectedFunction()

    setDeleteFunctionModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    api
      .delete(`/functions/${selectedFunction.id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteFunctionModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deletar função</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          Deseja realmente deletar a função {selectedFunction?.name}?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>

          <Button type="submit" variant="danger">
            Deletar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default DeleteFunctionsModal
