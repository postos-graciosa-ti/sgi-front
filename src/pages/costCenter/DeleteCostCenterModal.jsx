import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const DeleteCostCenterModal = (props) => {
  const { deleteCostCenterModalOpen, setDeleteCostCenterModalOpen, selectedCostCenter, setCostCenterList } = props

  const handleSubmit = async () => {
    await api
      .delete(`/cost-center/${selectedCostCenter.id}`)
      .then(async () => {
        await api
          .get("/cost-center")
          .then((response) => {
            setCostCenterList(response.data)

            setDeleteCostCenterModalOpen(false)
          })
      })
  }

  return (
    <Modal
      show={deleteCostCenterModalOpen}
      onHide={() => setDeleteCostCenterModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Apagar centro de custo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja apagar {selectedCostCenter?.name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setDeleteCostCenterModalOpen(false)}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Apagar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteCostCenterModal
