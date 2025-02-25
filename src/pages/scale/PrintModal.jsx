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
              ${ReactDOMServer.renderToStaticMarkup(printContent(response.data))}
            </body>
          </html> 
        `

        printJS({
          printable: printableContent,
          type: 'raw-html',
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
