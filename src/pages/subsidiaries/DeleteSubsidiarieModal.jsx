import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import deleteSubsidiarie from "../../requests/deleteSubsidiarie"
import getSubsidiaries from "../../requests/getSubsidiaries"

const DeleteSubsidiarieModal = (props) => {
  const {
    selectedSubsidiarie,
    deleteSubsidiarieModalOpen,
    setDeleteSubsidiarieModalOpen,
    setSubsidiaries
  } = props

  const handleCloseModal = () => {
    setDeleteSubsidiarieModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    deleteSubsidiarie(selectedSubsidiarie.id)
      .then(() => {
        getSubsidiaries()
          .then((response) => {
            setSubsidiaries(response.data)
            handleCloseModal()
          })
      })
  }

  return (
    <>
      <Modal
        show={deleteSubsidiarieModalOpen}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Confirmar exclusão
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            Tem certeza que deseja excluir {selectedSubsidiarie && selectedSubsidiarie.name}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="light"
              onClick={handleCloseModal}
            >
              Fechar
            </Button>

            <Button
              type="submit"
              variant="danger"
            >
              Excluir
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default DeleteSubsidiarieModal
