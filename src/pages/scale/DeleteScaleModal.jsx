import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import useUserSessionStore from '../../data/userSession'

const DeleteScaleModal = (props) => {
  const {
    deleteScaleModalOpen,
    setDeleteScaleModalOpen,
    selectedScale,
    setScalesList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleClose = () => {
    setDeleteScaleModalOpen(false)
  }

  const handleDelete = () => {
    api
      .delete(`/scales/${selectedScale.scale_id}`)
      .then(() => {
        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => {
            setScalesList(response.data)

            setDeleteScaleModalOpen(false)
          })
      })
  }

  return (
    <Modal
      show={deleteScaleModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deletar escala</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Deseja realmente deletar a escala do <b>dia {moment(selectedScale?.date).format('DD/MM/YYYY')}</b>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="danger" onClick={handleDelete}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteScaleModal