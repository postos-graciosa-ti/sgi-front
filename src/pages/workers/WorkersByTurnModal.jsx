import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import { Printer } from "react-bootstrap-icons"
import ReactDOMServer from 'react-dom/server'
import WorkersByTurnPrintContent from "./WorkersByTurnPrintContent"

const WorkersByTurnModal = (props) => {
  const { workersByTurnModalOpen, setWorkersByTurnModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsOptions, setTurnsOptions] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const fieldsOptions = [
    { value: "esocial", label: "E-social" },
    { value: "enrolment", label: "Matrícula" },
    { value: "sales_code", label: "Código de vendas" },
    { value: "timecode", label: "Código de ponto" },
    { value: "worker_name", label: "Nome" },
    { value: "function_name", label: "Função" },
    { value: "turn_name", label: "Turno" },
    { value: "cost_center_name", label: "Centro de custo" },
    { value: "department_name", label: "Setor" },
    { value: "admission_date", label: "Data de admissão" },
  ]

  const [selectedTurn, setSelectedTurn] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [selectedFields, setSelectedFields] = useState()

  const [workersByTurnAndFunction, setWorkersByTurnAndFunction] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns`)
      .then((response) => {
        let options = response?.data.map((turn) => ({ label: turn.name, value: turn.id }))

        setTurnsOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/functions`)
      .then((response) => {
        let options = response?.data.map((func) => ({ label: func.name, value: func.id }))

        setFunctionsOptions(options)
      })
  }, [])

  const handleClose = () => {
    setSelectedTurn()

    setSelectedFunction()

    setWorkersByTurnModalOpen(false)
  }

  const handleSubmit = () => {
    let arr = []

    selectedFields?.map((field) => {
      arr.push(field?.value)
    })

    let formData = {
      fields: arr
    }

    api
      .post(`/subsidiaries/${selectedSubsdiarie?.value}/workers/functions/${selectedFunction?.value}/turns/${selectedTurn?.value}`, formData)
      .then((response) => {
        console.log(response)
        setWorkersByTurnAndFunction(response.data)
      })
  }

  const handlePrintWorkersByTurn = () => {
    const printableContent = ReactDOMServer.renderToString(
      <WorkersByTurnPrintContent
        workersByTurnAndFunction={workersByTurnAndFunction}
        selectedFields={selectedFields}
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
      show={workersByTurnModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            placeholder="Turno"
            options={turnsOptions}
            onChange={(value) => setSelectedTurn(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder="Function"
            options={functionsOptions}
            onChange={(value) => setSelectedFunction(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder="Campos selecionados"
            options={fieldsOptions}
            isMulti
            onChange={(value) => setSelectedFields(value)}
          />
        </div>

        {
          workersByTurnAndFunction && (
            <>
              <div>
                <button className="btn btn-primary" onClick={handlePrintWorkersByTurn}>
                  <Printer />
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {
                        selectedFields?.map((field) => (
                          <th key={field.value}>
                            {field.label}
                          </th>
                        ))
                      }
                    </tr>
                  </thead>

                  <tbody>
                    {
                      workersByTurnAndFunction?.map((worker, index) => (
                        <tr key={index}>
                          {
                            selectedFields?.map((field) => (
                              <td key={field.value}>
                                {worker[field.value]}
                              </td>
                            ))
                          }
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
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

export default WorkersByTurnModal