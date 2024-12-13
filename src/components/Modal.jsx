import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Modal = (props) => {
  const { isModalOpen, setIsModalOpen, title, children, handleSubmit } = props

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      show={isModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          {children}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>

          <Button type="submit" variant="success">
            Concluir
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default Modal 
