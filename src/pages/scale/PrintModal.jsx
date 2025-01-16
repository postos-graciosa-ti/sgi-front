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
      {scales && scales.primeiro_turno_folgas && scales.primeiro_turno_folgas.map((firstTurn, index) => (
        <div key={index} className="card mb-4">
          <div className="card-header">
            {firstTurn.turn_info && <h5>Turno 01 ({firstTurn.turn_info.start_time} - {firstTurn.turn_info.end_time})</h5>}
          </div>
          <div className="card-body">
            <div className="mb-2 text-muted">{firstTurn && firstTurn.date}</div>
            {firstTurn && firstTurn.frentistas && firstTurn.frentistas.length > 0 ? (
              <ul className="list-group">
                {firstTurn.frentistas.map((frentista) => (
                  <li key={frentista.name} className="list-group-item">{frentista.name}</li>
                ))}
              </ul>
            ) : (
              <div className="text-danger">Sem frentistas</div>
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
            {secondTurn && secondTurn.frentistas && secondTurn.frentistas.length > 0 ? (
              <ul className="list-group">
                {secondTurn.frentistas.map((frentista) => (
                  <li key={frentista.name} className="list-group-item">{frentista.name}</li>
                ))}
              </ul>
            ) : (
              <div className="text-danger">Sem frentistas</div>
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
            {thirdTurn && thirdTurn.frentistas && thirdTurn.frentistas.length > 0 ? (
              <ul className="list-group">
                {thirdTurn.frentistas.map((frentista) => (
                  <li key={frentista.name} className="list-group-item">{frentista.name}</li>
                ))}
              </ul>
            ) : (
              <div className="text-danger">Sem frentistas</div>
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
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <style>
                  table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                  }
                  th, td {
                    padding: 5px;
                    text-align: left;
                    vertical-align: top;
                  }
                  td div {
                    margin-bottom: 10px; /* Espaçamento entre os dias de folga */
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