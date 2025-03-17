import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';

const AddApplicantsModal = (props) => {
  const { addApplicantsModalOpen, setAddApplicantsModalOpen, setApplicants } = props

  const [name, setName] = useState()

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicants(response.data))

    setAddApplicantsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name
    }

    api
      .post("/applicants", formData)
      .then(() => handleClose())
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
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
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