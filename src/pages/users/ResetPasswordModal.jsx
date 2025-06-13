const ResetPasswordModal = (props) => {
  const { resetPasswordModalOpen, setResetPasswordModalOpen } = props

  const handleClose = () => {
    setResetPasswordModalOpen(false)
  }

  return (
    <>
      <Modal
        show={resetPasswordModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Redefinir senha</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ResetPasswordModal