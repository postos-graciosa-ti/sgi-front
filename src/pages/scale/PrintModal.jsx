import moment from 'moment'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import useUserSessionStore from "../../data/userSession"
import api from '../../services/api'
import printContent from './printContent'

const PrintModal = (props) => {
  const { printModalOpen, setPrintModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [initialDate, setInitialDate] = useState()

  const [finalDate, setFinalDate] = useState()

  const handleClose = () => {
    setInitialDate()

    setFinalDate()

    setPrintModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      start_date: moment(initialDate).format("DD-MM-YYYY"),
      end_date: moment(finalDate).format("DD-MM-YYYY")
    }

    api
      .post(`/subsidiaries/${selectedSubsdiarie.value}/scales/print`, formData)
      .then((response) => {
        let scalesToPrint = response.data

        api
          .get(`/subsidiaries/${selectedSubsdiarie.value}`, formData)
          .then((response) => {
            let subsidiarieData = response.data

            api
              .get(`/users/${subsidiarieData?.coordinator}`)
              .then((response) => {
                let coordinatorData = response.data

                if (subsidiarieData?.manager) {
                  api
                    .get(`/users/${subsidiarieData?.manager}`)
                    .then((response) => {
                      let managerData = response.data

                      let onDuty = (
                        selectedSubsdiarie.value == 1 && `Graciosa: ${managerData?.name} (Gerente - ${managerData?.phone}) / ${coordinatorData?.name} (Coordenador - ${coordinatorData?.phone})`
                        || selectedSubsdiarie.value == 2 && `Fatima: ${coordinatorData?.name} (Coordenador - ${coordinatorData?.phone})`
                        || selectedSubsdiarie.value == 3 && `Bemer: ${coordinatorData?.name} (Coordenador - ${coordinatorData?.phone})`
                        || selectedSubsdiarie.value == 4 && `Jariva: ${managerData?.name} (Gerente - ${managerData.phone}) / ${coordinatorData?.name} (Coordenadora - ${coordinatorData?.phone})`
                        || selectedSubsdiarie.value == 5 && `Graciosa V: ${managerData?.name} (Gerente - ${managerData?.phone}) / ${coordinatorData?.name} (Coordenador - ${coordinatorData?.phone})`
                        || selectedSubsdiarie.value == 6 && `Piraí: ${managerData?.name} (Gerente - ${managerData?.phone}) / ${coordinatorData?.name} (Coordenador - ${coordinatorData?.phone})`
                      )

                      const printableContent = `
                        <html>
                          <head>
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
                            ${ReactDOMServer.renderToStaticMarkup(printContent(scalesToPrint, onDuty))}
                          </body>
                        </html> 
                      `

                      printJS({
                        printable: printableContent,
                        type: 'raw-html',
                      })

                      handleClose()
                    })
                } else {
                  let onDuty = (
                    selectedSubsdiarie.value == 2 && `Fatima: ${coordinatorData?.name} (Coordenador - ${coordinatorData?.phone})`
                    || selectedSubsdiarie.value == 3 && `Bemer: ${coordinatorData?.name} (Coordenador - ${coordinatorData?.phone})`
                  )

                  const printableContent = `
                    <html>
                      <head>
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
                        ${ReactDOMServer.renderToStaticMarkup(printContent(scalesToPrint, onDuty))}
                      </body>
                    </html> 
                  `

                  printJS({
                    printable: printableContent,
                    type: 'raw-html',
                  })

                  handleClose()
                }
              })
          })
      })
  }

  return (
    <Modal
      show={printModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Intervalo de dias para impressão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </div>

          <div className="col">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Imprimir</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintModal;