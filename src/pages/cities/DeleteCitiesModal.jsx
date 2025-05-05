import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const DeleteCitiesModal = (props) => {
  const {
    deleteCitiesModalOpen,
    setDeleteCitiesModalOpen,
    selectedCity,
    setSelectedCity,
    setCitiesList,
  } = props

  const handleClose = () => {
    api
      .get("/cities")
      .then((response) => setCitiesList(response?.data))

    setSelectedCity()

    setDeleteCitiesModalOpen(false)
  }

  const handleSubmit = async () => {
    await api
      .delete(`/cities/${selectedCity?.Cities?.id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteCitiesModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Apagar cidade</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja apagar {selectedCity?.Cities?.name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteCitiesModal