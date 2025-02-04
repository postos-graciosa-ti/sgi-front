import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from "../../services/api"
import moment from 'moment'
import Table from 'react-bootstrap/Table';

const ResignationReasonsReportModal = (props) => {
  const { resignationReasonsModal, setResignationReasonsModal } = props

  const [initialDate, setInitialDate] = useState()

  const [finalDate, setFinalDate] = useState()

  const [resignableReasonsOptions, setResignableReasonsOptions] = useState()
  const [selectedResignableReason, setSelectedResignableReason] = useState()

  const [report, setReport] = useState([])

  useEffect(() => {
    api
      .get("/resignable-reasons")
      .then((response) => {
        let resignableReasonsData = response.data

        let options = []

        resignableReasonsData && resignableReasonsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setResignableReasonsOptions(options)
      })

  }, [])

  const handleClose = () => {
    setInitialDate()

    setFinalDate()

    setSelectedResignableReason()

    setReport([])

    setResignationReasonsModal(false)
  }

  const handleSubmit = () => {
    let formData = {
      first_day: moment(initialDate).format("DD-MM-YYYY"),
      last_day: moment(finalDate).format("DD-MM-YYYY"),
      resignable_reasons_ids: `[${selectedResignableReason.map(resignableReason => `${resignableReason.value}`).join(',')}]`
    }

    api
      .post(`/resignable-reasons/report`, formData)
      .then((response) => {
        setReport(response.data)
      })
  }

  return (
    <Modal
      show={resignationReasonsModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filtro de rescisões</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-lg-4">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </div>

          <div className="col-lg-4">
            <input
              type="date"
              className="form-control"
              onChange={(e) => setFinalDate(e.target.value)}
            />
          </div>

          <div className="col-lg-4">
            <ReactSelect
              options={resignableReasonsOptions}
              placeholder="Razões"
              onChange={(value) => setSelectedResignableReason(value)}
              value={selectedResignableReason}
              isMulti
            />
          </div>
        </div>

        {
          report.length > 0 && (
            <div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Funcionário</th>

                    <th>Data</th>

                    <th>Razão</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    report && report.map((report) => (
                      <tr>
                        <td>{report.worker_name}</td>

                        <td>{report.resignation_date}</td>

                        <td>{report.resignable_reason_name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>

            </div>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResignationReasonsReportModal
