import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'
import { ExclamationTriangle } from 'react-bootstrap-icons'
import moment from 'moment'

const AddScaleModal = (props) => {
  const { addScaleModalOpen, setAddScaleModalOpen, selectedDate, handleOnClickCalendar } = props

  return (
    <>
      <Modal
        show={addScaleModalOpen}
        onHide={() => setAddScaleModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-inline-flex">
              <div>
                <button className="btn btn-warning me-1">
                  <ExclamationTriangle />
                </button>
              </div>

              <div>
                <span>
                  {selectedDate && moment(selectedDate).format("DD-MM-YYYY")} está fora de escala
                </span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Deseja mesmo adicionar <b>{selectedDate && moment(selectedDate).format("DD-MM-YYYY")}</b>?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setAddScaleModalOpen(false)}>
            fechar
          </Button>

          <Button variant="danger" onClick={() => {
            handleOnClickCalendar(selectedDate)
            
            setAddScaleModalOpen(false)
          }}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddScaleModal
