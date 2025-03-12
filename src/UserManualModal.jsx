import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const UserManualModal = (props) => {
  const { userManualModalOpen, setUserManualModalOpen } = props

  const handleClose = () => {
    setUserManualModalOpen(false)
  }

  return (
    <Modal
      show={userManualModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Manual do usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <iframe
          src="/sgi-manual-do-usuario.pdf"
          style={{
            "width": "100%",
            "height": "100%"
          }}
        >
        </iframe>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>fechar</Button>

        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UserManualModal