import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const EditCostCenterModal = (props) => {
  const {
    editCostCenterModalOpen,
    setEditCostCenterModalOpen,
    selectedCostCenter,
    setCostCenterList,
    setSelectedCostCenter
  } = props

  const [name, setName] = useState()

  const [description, setDescription] = useState()

  const handleClose = () => {
    api
      .get("/cost-center")
      .then((response) => setCostCenterList(response.data))

    setName()

    setDescription()

    setSelectedCostCenter()

    setEditCostCenterModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      name: name,
      description: description
    }

    api
      .put(`/cost-center/${selectedCostCenter.id}`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={editCostCenterModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar centro de custo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            defaultValue={selectedCostCenter?.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Descrição"
            defaultValue={selectedCostCenter?.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Editar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCostCenterModal
