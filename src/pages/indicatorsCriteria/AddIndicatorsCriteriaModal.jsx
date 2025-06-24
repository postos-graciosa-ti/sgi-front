import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const AddIndicatorsCriteriaModal = (props) => {
  const { addIndicatorsCriteriaModalOpen, setAddIndicatorsCriteriaModalOpen, setIndicatorsCriteria } = props

  const [name, setName] = useState()

  const handleClose = () => {
    api
      .get(`/indicators-criteria`)
      .then((response) => {
        setIndicatorsCriteria(response.data)
      })

    setName()

    setAddIndicatorsCriteriaModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      name: name
    }

    api
      .post(`/indicators-criteria`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addIndicatorsCriteriaModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar critério</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddIndicatorsCriteriaModal