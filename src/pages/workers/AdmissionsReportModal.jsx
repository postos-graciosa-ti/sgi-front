import dayjs from "dayjs"
import { useState } from 'react'
import { Printer } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AdmissionsReportPrintContent = ({ admissionsReport, firstDay, lastDay }) => {
  return (
    <>
      <div>
        <img src="/logo.png" style={{ width: '80px' }} />
      </div>

      <div>
        <h4>Colaboradores admitidos entre {dayjs(firstDay).format("DD/MM/YYYY")} e {dayjs(lastDay).format("DD/MM/YYYY")}</h4>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
          </tr>
        </thead>

        <tbody>
          {
            admissionsReport && admissionsReport.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

const AdmissionsReportModal = (props) => {
  const { admissionsReportModalOpen, setAdmissionsReportModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [firstDay, setFirstDay] = useState()

  const [lastDay, setLastDay] = useState()

  const [admissionsReport, setAdmissionsReport] = useState()

  const handleClose = () => {
    setAdmissionsReport()

    setAdmissionsReportModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      first_day: firstDay,
      last_day: lastDay
    }

    api
      .post(`/subsidiaries/${selectedSubsdiarie?.value}/workers/admissions-report`, requestBody)
      .then((response) => setAdmissionsReport(response.data))
  }

  const handlePrint = () => {
    const printableContent = ReactDOMServer.renderToString(
      <AdmissionsReportPrintContent
        admissionsReport={admissionsReport}
        firstDay={firstDay}
        lastDay={lastDay}
      />
    )

    printJS({
      printable: printableContent,
      type: 'raw-html',
      header: null,
    })
  }

  return (
    <Modal
      show={admissionsReportModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filtro de admissões</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Data inicial
          </label>

          <input
            type="date"
            className="form-control"
            onChange={(e) => setFirstDay(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Data final
          </label>

          <input
            type="date"
            className="form-control"
            onChange={(e) => setLastDay(e.target.value)}
          />
        </div>

        {
          admissionsReport && (
            <div>
              <button className="btn btn-light" onClick={handlePrint}>
                <Printer />
              </button>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nome</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      admissionsReport && admissionsReport.map((worker) => (
                        <tr key={worker.id}>
                          <td>{worker.name}</td>
                        </tr>
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
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Buscar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdmissionsReportModal