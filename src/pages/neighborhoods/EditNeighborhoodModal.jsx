import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from "../../services/api"

const EditNeighborhoodModal = (props) => {
  const { editNeighborhoodModalOpen, setEditNeighborhoodModalOpen, selectedNeighborhood, setSelectedNeighborhood, setNeighborhoods } = props

  const [name, setName] = useState()

  const handleClose = (e) => {
    e.preventDefault()
    
    api
      .get("/neighborhoods")
      .then((response) => setNeighborhoods(response.data))

    setSelectedNeighborhood()

    setName()

    setEditNeighborhoodModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "name": name
    }

    api
      .put(`/neighborhoods/${selectedNeighborhood?.id}`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editNeighborhoodModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar bairro</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              defaultValue={selectedNeighborhood?.name}
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

export default EditNeighborhoodModal