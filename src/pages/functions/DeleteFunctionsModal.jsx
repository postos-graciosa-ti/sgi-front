import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import deleteFunction from '../../requests/deleteFunction'
import getFunctions from '../../requests/getFunctions'

const DeleteFunctionsModal = (props) => {
  const {
    deleteFunctionModalOpen,
    setDeleteFunctionModalOpen,
    selectedFunction,
    setFunctionsList
  } = props

  const handleClose = () => {
    setDeleteFunctionModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    deleteFunction(selectedFunction.id)
      .then(() => {
        getFunctions()
          .then((response) => setFunctionsList(response.data))

        handleClose()
      })
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
