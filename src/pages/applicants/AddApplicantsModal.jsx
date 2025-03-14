import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AddApplicantsModal = (props) => {
  const { addApplicantsModalOpen, setAddApplicantsModalOpen } = props

  const handleClose = () => {
    setAddApplicantsModalOpen(false)
  }

  const handleSubmit = () => {

  }

  return (
    <Modal
      show={addApplicantsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Nome" />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button type="submit" variant="success">Confirmar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddApplicantsModal