import moment from "moment";
import printJS from "print-js";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOMServer from 'react-dom/server';
import ReactSelect from "react-select";
import useUserSessionStore from "../../data/userSession";
import api from "../../services/api";

const TurnoFolgas = ({ turno, nomeTurno }) => {
  return (
    <div className="turno-container">
      <style>
        {`
          .turno-container {
            margin-bottom: 20px;
          }

          .cards-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 15px;
            background-color: #fff;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-bottom: 10px;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .card-body {
            display: flex;
            flex-direction: column;
          }

          .card-title {
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .card-text {
            font-size: 0.9rem;
            margin: 5px 0;
          }

          .card-text strong {
            font-weight: bold;
          }

          .list-names {
            font-size: 0.9rem;
            margin: 5px 0;
            padding: 0;
            list-style-type: none;
            line-height: 1.4;
          }

          .list-names li {
            background-color: #f1f1f1;
            border-radius: 4px;
            padding: 4px 8px;
            margin-bottom: 5px;
            display: inline-block;
            width: 100%;
          }

          .assinatura {
            margin-top: 10px;
            padding-top: 10px;
            text-align: left;
            font-size: 0.85rem;
            background-color: #f9f9f9;
            padding: 5px;
            border-radius: 4px;
            margin-bottom: 10px;
          }

          .assinatura input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }

          .turnos-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 40px;
          }

          .coluna-turno {
            width: 48%;
          }

          @media (max-width: 768px) {
            .turnos-container {
              flex-direction: column;
            }

            .coluna-turno {
              width: 100%;
            }
          }
        `}
      </style>

      <h2>{nomeTurno}</h2>
      
      <div className="cards-container">
        {turno.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">Data: {item.date}</h5>
              
              <p className="card-text">
                <strong>Frentistas:</strong> 
                {Array.isArray(item.frentistas) ? (
                  <ul className="list-names">
                    {item.frentistas.map((frentista, idx) => (
                      <li key={idx}>
                        {frentista.name ? frentista.name : "Nome não disponível"}
                        
                        {/* Espaço para assinatura de cada frentista */}
                        <div className="assinatura">
                          <label htmlFor={`assinatura-frentista-${idx}`}>Assinatura:</label>
                          <input
                            id={`assinatura-frentista-${idx}`}
                            type="text"
                            placeholder="Assine aqui"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : 0}
              </p>

              <p className="card-text">
                <strong>Trocadores:</strong> 
                {Array.isArray(item.trocadores) ? (
                  <ul className="list-names">
                    {item.trocadores.map((trocador, idx) => (
                      <li key={idx}>
                        {trocador.name ? trocador.name : "Nome não disponível"}

                        {/* Espaço para assinatura de cada trocador */}
                        <div className="assinatura">
                          <label htmlFor={`assinatura-trocador-${idx}`}>Assinatura:</label>
                          <input
                            id={`assinatura-trocador-${idx}`}
                            type="text"
                            placeholder="Assine aqui"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PrintContent = (scales) => {
  return (
    <div className="print-content">
      <h1>Escala de Folgas</h1>

      <div className="turnos-container">
        <div className="coluna-turno">
          {scales.primeiro_turno_folgas && <TurnoFolgas turno={scales.primeiro_turno_folgas} nomeTurno="Primeiro Turno" />}
        </div>

        <div className="coluna-turno">
          {scales.segundo_turno_folgas && <TurnoFolgas turno={scales.segundo_turno_folgas} nomeTurno="Segundo Turno" />}
        </div>
      </div>

      <div className="coluna-turno">
        {scales.terceiro_turno_folgas && <TurnoFolgas turno={scales.terceiro_turno_folgas} nomeTurno="Terceiro Turno" />}
      </div>
    </div>
  );
}

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

    let formData = {
      "initial_date": moment(initialDate).format("DD-MM-YYYY"),
      "end_date": moment(finalDate).format("DD-MM-YYYY")
    }

    api
      .post(`/subsidiaries/${selectedSubsdiarie.value}/prints/${printStyle.value}/scales`, formData)
      .then((response) => {
        console.log(response.data)

        const printableContent = ReactDOMServer.renderToStaticMarkup(PrintContent(response.data))

        printJS({
          printable: printableContent,
          type: 'raw-html', // Especifica que o conteúdo é HTML bruto
          style: '.custom-style { color: blue; font-size: 18px; }', // Estilos adicionais
        })
      })

    // if (printStyle.value == 1) {
    //   let formData = {
    //     "initial_date": moment(initialDate).format("DD-MM-YYYY"),
    //     "end_date": moment(finalDate).format("DD-MM-YYYY")
    //   }

    //   api
    //     .post(`/subsidiaries/${selectedSubsdiarie.value}/prints/${printStyle.value}/scales`, formData)
    //     .then((response) => {
    //       console.log(response.data)

    //       const content = ReactDOMServer.renderToString(ContentPrint(response.data))

    //       const printWindow = window.open('', '_blank')

    //       printWindow.document.write(`
    //         <html>
    //           <head>
    //             <meta charset="utf-8" />
    //             <title>Escala de Colaboradores</title>
    //             <style>
    //               /* General Styles */
    //               body {
    //                 font-family: Arial, sans-serif;
    //                 margin: 0;
    //                 padding: 0;
    //                 line-height: 1.5;
    //               }

    //               /* Card Styles */
    //               .card {
    //                 border: 1px solid #dee2e6;
    //                 border-radius: 0.25rem;
    //                 background-color: #fff;
    //                 margin-bottom: 1rem;
    //                 box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    //               }

    //               .card-header {
    //                 padding: 0.75rem 1.25rem;
    //                 margin-bottom: 0;
    //                 background-color: #f8f9fa;
    //                 border-bottom: 1px solid #dee2e6;
    //                 font-size: 1.25rem;
    //                 font-weight: 500;
    //               }

    //               .card-body {
    //                 padding: 1.25rem;
    //               }

    //               /* List Group Styles */
    //               .list-group {
    //                 list-style-type: none;
    //                 padding-left: 0;
    //                 margin: 0;
    //               }

    //               .list-group-item {
    //                 padding: 0.75rem 1.25rem;
    //                 margin-bottom: -1px;
    //                 background-color: #fff;
    //                 border: 1px solid #dee2e6;
    //               }

    //               .list-group-item:last-child {
    //                 border-bottom-right-radius: 0.25rem;
    //                 border-bottom-left-radius: 0.25rem;
    //               }

    //               .list-group-item:first-child {
    //                 border-top-right-radius: 0.25rem;
    //                 border-top-left-radius: 0.25rem;
    //               }

    //               /* Text Utilities */
    //               .text-muted {
    //                 color: #6c757d !important;
    //               }

    //               .text-danger {
    //                 color: #dc3545 !important;
    //               }

    //               /* Spacing Utilities */
    //               .mb-4 {
    //                 margin-bottom: 1.5rem !important;
    //               }

    //               .mb-3 {
    //                 margin-bottom: 1rem !important;
    //               }

    //               .mb-2 {
    //                 margin-bottom: 0.5rem !important;
    //               }
    //             </style>
    //           </head>
    //           <body>
    //             ${content}
    //           </body>
    //         </html>
    //       `)

    //       printWindow.document.close()

    //       printWindow.print()
    //     })
    // } else {
    //   handlePrintScale(scalesList)
    // }

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