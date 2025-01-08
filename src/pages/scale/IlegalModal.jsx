import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useDaysOffStore from '../../data/daysOffStore'
import moment from 'moment'
import ilegalDaysStore from '../../data/ilegalDaysStore'

const IlegalModal = (props) => {
  const { ilegalModalOpen, setIlegalModalOpen, datesIlegal, setDatesIlegal, handleSaveDaysOff, selectedDate } = props

  const setIlegalDays = ilegalDaysStore((state) => state.setIlegalDays)

  const handleSubmit = () => {
    setIlegalDays(moment(selectedDate).format("DD-MM-YYYY"))

    setIlegalModalOpen(false)
  }

  return (
    <Modal
      show={ilegalModalOpen}
      onHide={() => setIlegalModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Dia ilegal</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Quer mesmo adicionar?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setIlegalModalOpen(false)}>
          Fechar
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default IlegalModal
