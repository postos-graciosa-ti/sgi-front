import moment from "moment";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOMServer from 'react-dom/server';
import ReactSelect from "react-select";
import useUserSessionStore from "../../data/userSession";
import api from "../../services/api";

export const ContentPrint = (scales) => {
  return (
    <>
      <div>
        <h1>Escala de dias de folga</h1>
      </div>
      {scales && scales.primeiro_turno_folgas && scales.primeiro_turno_folgas.map((firstTurn, index) => (
        <div key={index} className="card mb-4">
          <div className="card-header">
            {firstTurn.turn_info && <h5>Turno 01 ({firstTurn.turn_info.start_time} - {firstTurn.turn_info.end_time})</h5>}
          </div>

          <div className="card-body">
            <div className="mb-2 text-muted">{firstTurn && firstTurn.date}</div>

            {/* Frentistas */}
            {firstTurn && firstTurn.frentistas && firstTurn.frentistas.length > 0 ? (
              <div className="mb-3">
                <h6>Frentistas:</h6>
                <ul className="list-group">
                  {firstTurn.frentistas.map((frentista) => (
                    <li key={frentista.name} className="list-group-item">{frentista.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-danger">Sem frentistas</div>
            )}

            {/* Trocadores */}
            {firstTurn && firstTurn.trocadores && firstTurn.trocadores.length > 0 ? (
              <div>
                <h6>Trocadores:</h6>
                <ul className="list-group">
                  {firstTurn.trocadores.map((trocador) => (
                    <li key={trocador.name} className="list-group-item">{trocador.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-danger">Sem trocadores</div>
            )}
          </div>
        </div>
      ))}

      {scales && scales.segundo_turno_folgas && scales.segundo_turno_folgas.map((secondTurn, index) => (
        <div key={index} className="card mb-4">
          <div className="card-header">
            {secondTurn.turn_info && <h5>Turno 02 ({secondTurn.turn_info.start_time} - {secondTurn.turn_info.end_time})</h5>}
          </div>
          <div className="card-body">
            <div className="mb-2 text-muted">{secondTurn && secondTurn.date}</div>

            {/* Frentistas */}
            {secondTurn && secondTurn.frentistas && secondTurn.frentistas.length > 0 ? (
              <div className="mb-3">
                <h6>Frentistas:</h6>
                <ul className="list-group">
                  {secondTurn.frentistas.map((frentista) => (
                    <li key={frentista.name} className="list-group-item">{frentista.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-danger">Sem frentistas</div>
            )}

            {/* Trocadores */}
            {secondTurn && secondTurn.trocadores && secondTurn.trocadores.length > 0 ? (
              <div>
                <h6>Trocadores:</h6>
                <ul className="list-group">
                  {secondTurn.trocadores.map((trocador) => (
                    <li key={trocador.name} className="list-group-item">{trocador.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-danger">Sem trocadores</div>
            )}
          </div>
        </div>
      ))}

      {scales && scales.terceiro_turno_folgas && scales.terceiro_turno_folgas.map((thirdTurn, index) => (
        <div key={index} className="card mb-4">
          <div className="card-header">
            {thirdTurn.turn_info && <h5>Turno 03 ({thirdTurn.turn_info.start_time} - {thirdTurn.turn_info.end_time})</h5>}
          </div>
          <div className="card-body">
            <div className="mb-2 text-muted">{thirdTurn && thirdTurn.date}</div>

            {/* Frentistas */}
            {thirdTurn && thirdTurn.frentistas && thirdTurn.frentistas.length > 0 ? (
              <div className="mb-3">
                <h6>Frentistas:</h6>
                <ul className="list-group">
                  {thirdTurn.frentistas.map((frentista) => (
                    <li key={frentista.name} className="list-group-item">{frentista.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-danger">Sem frentistas</div>
            )}

            {/* Trocadores */}
            {thirdTurn && thirdTurn.trocadores && thirdTurn.trocadores.length > 0 ? (
              <div>
                <h6>Trocadores:</h6>
                <ul className="list-group">
                  {thirdTurn.trocadores.map((trocador) => (
                    <li key={trocador.name} className="list-group-item">{trocador.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-danger">Sem trocadores</div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

const PrintModal = (props) => {
  const { printModalOpen, setPrintModalOpen, handlePrintScale, scalesList } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [initialDate, setInitialDate] = useState()

  const [finalDate, setFinalDate] = useState()

  const [printStyle, setPrintStyle] = useState()

  const printOptions = [
    { "label": "relatório por turno", "value": 1 },
    { "label": "relatório simples", "value": 2 }
  ]

  const handleSubmit = () => {
    if (printStyle.value == 1) {
      let formData = {
        "initial_date": moment(initialDate).format("DD-MM-YYYY"),
        "end_date": moment(finalDate).format("DD-MM-YYYY")
      }

      api
        .post(`/subsidiaries/${selectedSubsdiarie.value}/prints/${printStyle.value}/scales`, formData)
        .then((response) => {
          console.log(response.data)

          const content = ReactDOMServer.renderToString(ContentPrint(response.data))

          const printWindow = window.open('', '_blank')

          printWindow.document.write(`
            <html>
              <head>
                <meta charset="utf-8" />
                <title>Escala de Colaboradores</title>
                <style>
                  /* General Styles */
                  body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    line-height: 1.5;
                  }

                  /* Card Styles */
                  .card {
                    border: 1px solid #dee2e6;
                    border-radius: 0.25rem;
                    background-color: #fff;
                    margin-bottom: 1rem;
                    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                  }

                  .card-header {
                    padding: 0.75rem 1.25rem;
                    margin-bottom: 0;
                    background-color: #f8f9fa;
                    border-bottom: 1px solid #dee2e6;
                    font-size: 1.25rem;
                    font-weight: 500;
                  }

                  .card-body {
                    padding: 1.25rem;
                  }

                  /* List Group Styles */
                  .list-group {
                    list-style-type: none;
                    padding-left: 0;
                    margin: 0;
                  }

                  .list-group-item {
                    padding: 0.75rem 1.25rem;
                    margin-bottom: -1px;
                    background-color: #fff;
                    border: 1px solid #dee2e6;
                  }

                  .list-group-item:last-child {
                    border-bottom-right-radius: 0.25rem;
                    border-bottom-left-radius: 0.25rem;
                  }

                  .list-group-item:first-child {
                    border-top-right-radius: 0.25rem;
                    border-top-left-radius: 0.25rem;
                  }

                  /* Text Utilities */
                  .text-muted {
                    color: #6c757d !important;
                  }

                  .text-danger {
                    color: #dc3545 !important;
                  }

                  /* Spacing Utilities */
                  .mb-4 {
                    margin-bottom: 1.5rem !important;
                  }

                  .mb-3 {
                    margin-bottom: 1rem !important;
                  }

                  .mb-2 {
                    margin-bottom: 0.5rem !important;
                  }
                </style>
              </head>
              <body>
                ${content}
              </body>
            </html>
          `)

          printWindow.document.close()

          printWindow.print()
        })
    } else {
      handlePrintScale(scalesList)
    }

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
              onChange={(value) => setPrintStyle(value)}
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