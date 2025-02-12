import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const AddCostCenterModal = (props) => {
  const { addCostCenterModalOpen, setAddCostCenterModalOpen, setCostCenterList } = props

  const [name, setName] = useState()

  const [description, setDescription] = useState()

  const handleClose = () => {
    api
      .get("/cost-center")
      .then((response) => setCostCenterList(response.data))

    setName()

    setDescription()

    setAddCostCenterModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      name: name,
      description: description
    }

    api
      .post("/cost-center", formData)
      .then(() => {
        handleClose()

        setAddCostCenterModalOpen(false)
      })
  }

  return (
    <Modal
      show={addCostCenterModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar centro de custo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Adicionar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddCostCenterModal
