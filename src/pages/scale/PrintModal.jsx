import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactSelect from "react-select";

const PrintModal = (props) => {
  const { printModalOpen, setPrintModalOpen } = props

  const [initialDate, setInitialDate] = useState()

  const [finalDate, setFinalDate] = useState()

  const printOptions = [
    { "label": "relatório tipo 1", "value": 1 },
    { "label": "relatório tipo 2", "value": 1 }
  ]

  const handleSubmit = () => {
    console.log(initialDate, finalDate)
  }

  return (
    <Modal
      show={printModalOpen}
      onHide={() => setPrintModalOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Selecione o dia e tipo de impressão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col">
            <input type="date" className="form-control" onChange={(e) => setInitialDate(e.target.value)} />
          </div>

          <div className="col">
            <input type="date" className="form-control" onChange={(e) => setFinalDate(e.target.value)} />
          </div>

          <div className="col">
            <ReactSelect
              options={printOptions}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setPrintModalOpen(false)}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Imprimir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PrintModal