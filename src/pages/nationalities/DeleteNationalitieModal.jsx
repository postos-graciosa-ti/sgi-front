import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import deleteNationalities from "../../requests/nationalities/deleteNationalities"
import getNationalities from '../../requests/nationalities/getNationalities'

const DeleteNationalitieModal = (props) => {
  const {
    deleteNationalitieModalOpen,
    setDeleteNationalitieModalOpen,
    selectedNationalitie,
    setNationalitiesList,
    setSelectedNationalitie
  } = props

  const handleClose = () => {
    getNationalities()
      .then((response) => setNationalitiesList(response?.data))

    setSelectedNationalitie()

    setDeleteNationalitieModalOpen(false)
  }

  const handleSubmit = () => {
    deleteNationalities(selectedNationalitie?.id)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteNationalitieModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmar exclusão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Deseja mesmo excluir {selectedNationalitie?.name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteNationalitieModal