import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const AddCostCenterModal = (props) => {
  const { addCostCenterModalOpen, setAddCostCenterModalOpen, setCostCenterList } = props

  const [name, setName] = useState()

  const [description, setDescription] = useState()

  const handleSubmit = async () => {
    let formData = {
      name: name,
      description: description
    }

    await api
      .post("/cost-center", formData)
      .then(async () => {
        await api
          .get("/cost-center")
          .then((response) => {
            setCostCenterList(response.data)

            setAddCostCenterModalOpen(false)
          })
      })
  }

  return (
    <Modal
      show={addCostCenterModalOpen}
      onHide={() => setAddCostCenterModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
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
        <Button variant="light" onClick={() => setAddCostCenterModalOpen(false)}>Close</Button>

        <Button variant="success" onClick={handleSubmit}>Adicionar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddCostCenterModal