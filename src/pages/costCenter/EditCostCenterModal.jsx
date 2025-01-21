import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const EditCostCenterModal = (props) => {
  const { editCostCenterModalOpen, setEditCostCenterModalOpen, selectedCostCenter, setCostCenterList } = props

  const [name, setName] = useState()

  const [description, setDescription] = useState()

  const handleSubmit = async () => {
    let formData = {
      name: name,
      description: description
    }

    await api
      .put(`/cost-center/${selectedCostCenter.id}`, formData)
      .then(async () => {
        await api
          .get("/cost-center")
          .then((response) => {
            setCostCenterList(response.data)

            setEditCostCenterModalOpen(false)
          })
      })
  }

  return (
    <Modal
      show={editCostCenterModalOpen}
      onHide={() => setEditCostCenterModalOpen(false)}
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
        <Button variant="light" onClick={() => setEditCostCenterModalOpen(false)}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Editar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCostCenterModal
