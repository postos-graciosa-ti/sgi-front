import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'
import moment from 'moment'

const EditCostCenterModal = (props) => {
  const {
    editCostCenterModalOpen,
    setEditCostCenterModalOpen,
    selectedCostCenter,
    setCostCenterList,
    setSelectedCostCenter
  } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

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
      .then((response) => {
        let logStr = `
          ${userSession.name} atualizou ${selectedCostCenter?.name} de (nome=${selectedCostCenter?.name}, descrição=${selectedCostCenter?.description})  
          para ${response.data.name} (nome=${response.data.name}, descrição=${response.data.description})
        `

        let logFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date).format("HH:mm"),
          "subsidiarie_id": selectedSubsidiarie.value,
          "user_id": userSession.id
        }

        api
          .post(`/subsidiaries/${selectedSubsidiarie.value}/logs/costs-centers`, logFormData)
          .then(() => handleClose())
      })
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
