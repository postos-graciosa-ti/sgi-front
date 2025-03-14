import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from "../../services/api";

const AddNeighborhoodModal = (props) => {
  const { addNeighborhoodModalOpen, setAddNeighborhoodModalOpen, setNeighborhoods } = props

  const [name, setName] = useState()

  const handleClose = () => {
    api
      .get("/neighborhoods")
      .then((response) => setNeighborhoods(response.data))

    setName()

    setAddNeighborhoodModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name
    }

    api
      .post("/neighborhoods", formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addNeighborhoodModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar bairro</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input
              placeholder="Nome"
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
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

export default AddNeighborhoodModal