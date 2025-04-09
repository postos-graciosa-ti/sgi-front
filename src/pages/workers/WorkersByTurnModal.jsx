import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import { Printer } from "react-bootstrap-icons"
import ReactDOMServer from 'react-dom/server'
import WorkersByTurnPrintContent from "./WorkersByTurnPrintContent"
import { fieldsOptions } from "./fieldsOptions"

const WorkersByTurnModal = (props) => {
  const { workersByTurnModalOpen, setWorkersByTurnModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsOptions, setTurnsOptions] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

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

    setWorkersByTurnAndFunction()

    setWorkersByTurnModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie?.value}`)
      .then((response) => {
        const grouped = {}

        selectedTurn?.forEach((turn) => {
          selectedFunction?.forEach((func) => {
            const key = `${turn.label} - ${func.label}`

            const workers = response.data.filter(
              (worker) => worker.function_id == func.value && worker.turn_id == turn.value
            )

            if (workers.length > 0) {
              grouped[key] = workers
            }
          })
        })

        setWorkersByTurnAndFunction(grouped)
      })
  }

  const handlePrintWorkersByTurn = () => {
    const printableContent = ReactDOMServer.renderToString(
      <WorkersByTurnPrintContent
        workersByTurnAndFunction={workersByTurnAndFunction}
        selectedFields={selectedFields}
        selectedSubsdiarie={selectedSubsdiarie}
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
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filtrar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            placeholder="Turno"
            options={turnsOptions}
            isMulti
            onChange={(value) => setSelectedTurn(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder="Function"
            options={functionsOptions}
            isMulti
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

        <div>
          <button className="btn btn-primary" onClick={handlePrintWorkersByTurn}>
            <Printer />
          </button>
        </div>

        {
          workersByTurnAndFunction && Object.entries(workersByTurnAndFunction).map(([groupLabel, workers]) => (
            <div key={groupLabel} className="mb-5">
              <h5 className="mb-3">{groupLabel}</h5>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {selectedFields?.map((field) => (
                        <th key={field.value}>{field.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {workers.map((worker, index) => (
                      <tr key={index}>
                        {selectedFields?.map((field) => (
                          <td key={field.value}>
                            {worker && worker[field.value]?.name || worker && worker[field.value]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        }

        {/* {
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
                                {worker && worker[field.value]?.name || worker && worker[field.value]}
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
        } */}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Buscar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkersByTurnModal