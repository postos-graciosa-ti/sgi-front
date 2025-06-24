import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from "../../services/api";

const EditIndicatorsCriteriaModal = (props) => {
  const { editIndicatorsCriteriaModalOpen, setEditIndicatorsCriteriaModalOpen, selectedIndicatorCriteria, setIndicatorsCriteria } = props

  const [name, setName] = useState()

  const handleClose = () => {
    api
      .get(`/indicators-criteria`)
      .then((response) => {
        setIndicatorsCriteria(response.data)
      })

    setName()

    setEditIndicatorsCriteriaModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      name: name
    }

    api
      .patch(`/indicators-criteria/${selectedIndicatorCriteria?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editIndicatorsCriteriaModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar critério {selectedIndicatorCriteria?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input
          type="text"
          className="form-control"
          defaultValue={selectedIndicatorCriteria?.name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditIndicatorsCriteriaModal