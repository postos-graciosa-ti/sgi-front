import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DigitalizeDocsModal = (props) => {
  const { digitalizeDocsModalOpen, setDigitalizeDocsModalOpen } = props

  const handleClose = () => {
    setDigitalizeDocsModalOpen(false)
  }

  return (
    <Modal
      show={digitalizeDocsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        I will not close if you click outside me. Do not even try to press
        escape key.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success">Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DigitalizeDocsModal