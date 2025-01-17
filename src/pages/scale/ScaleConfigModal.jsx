import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactSelect from 'react-select';

const ScaleConfigModal = (props) => {
  const { scaleConfiOpen, setScaleConfigOpen } = props

  return (
    <Modal
      show={scaleConfiOpen}
      onHide={() => setScaleConfigOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Configurar escala</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <label>Dia da semana</label>
          <ReactSelect />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setScaleConfigOpen(false)}>Close</Button>

        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScaleConfigModal
