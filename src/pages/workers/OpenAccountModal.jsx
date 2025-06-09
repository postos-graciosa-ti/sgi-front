import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Printer } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import api from '../../services/api'

const thStyle = {
  textAlign: 'left',
  padding: '10px',
  border: '1px solid #ccc'
}

const tdStyle = {
  padding: '10px',
  border: '1px solid #ccc'
}

const OpenAccountPrintContent = ({ workersList, startDate, endDate }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#333' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="/logo.png" style={{ width: '120px', marginBottom: '10px' }} alt="Logo" />

        <h2 style={{ margin: '0', fontSize: '20px' }}>Relatório de Vale-Transporte</h2>

        <p style={{ margin: '5px 0', fontSize: '14px' }}>
          Período: {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
        </p>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
          marginTop: '10px'
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={thStyle}>Nome</th>

            <th style={thStyle}>Data de Admissão</th>
          </tr>
        </thead>

        <tbody>
          {
            workersList && workersList.map((worker, idx) => (
              !worker.bank_account || !worker.bank_agency && (
                <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={tdStyle}>{worker.name}</td>

                  <td style={tdStyle}>{dayjs(worker.admission_date).format('DD/MM/YYYY')}</td>
                </tr>
              )
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const OpenAccountModal = (props) => {
  const { openAccountModalOpen, setOpenAccountModalOpen } = props

  const [startDate, setStartDate] = useState()

  const [endDate, setEndDate] = useState()

  const [workersList, setWorkersList] = useState()

  useEffect(() => {
    if (startDate, endDate) {
      let requestBody = {
        "start_date": startDate,
        "end_date": endDate,
      }

      api
        .post("/workers/open-account-report", requestBody)
        .then((response) => {
          console.log(response)

          setWorkersList(response.data)
        })
    }
  }, [startDate, endDate])

  const handlePrint = () => {
    const printableContent = ReactDOMServer.renderToString(
      <OpenAccountPrintContent
        workersList={workersList}
        startDate={startDate}
        endDate={endDate}
      />
    )

    printJS({
      printable: printableContent,
      type: 'raw-html',
      header: null
    })
  }

  const handleClose = () => {
    setStartDate()

    setEndDate()

    setWorkersList()

    setOpenAccountModalOpen(false)
  }

  return (
    <Modal
      show={openAccountModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Data inicial
          </label>

          <input
            type="date"
            className="form-control"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Data final
          </label>

          <input
            type="date"
            className="form-control"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {
          workersList && (
            <div className="container-fluid">
              <button className="btn btn-light mt-3 mb-3" onClick={handlePrint}>
                <Printer />
              </button>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Data de admissão</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      workersList.map((worker) => (
                        worker.bank_account == null && (
                          <tr key={worker.id}>
                            <td>{worker.name}</td>
                            <td>{worker.cpf}</td>
                            <td>{dayjs(worker.admission_date).format("DD-MM-YYYY")}</td>
                          </tr>
                        )
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default OpenAccountModal