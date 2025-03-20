import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import { Printer } from "react-bootstrap-icons"

const WorkersByTurnModal = (props) => {
  const { workersByTurnModalOpen, setWorkersByTurnModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsOptions, setTurnsOptions] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [workersByTurn, setWorkersByTurn] = useState()

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

    setWorkersByTurn()

    setWorkersByTurnModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/workers/functions/${selectedFunction?.value}/turns/${selectedTurn?.value}`)
      .then((response) => {
        setWorkersByTurn(response.data)
        console.log(response.data)
        debugger
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

        {
          workersByTurn && (
            <>
              <div>
                <button className="btn btn-primary">
                  <Printer />
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nome</th>
                    </tr>
                  </thead>

                  {
                    workersByTurn?.map((worker) => (
                      <tbody>
                        <tr>
                          <td>{worker.name}</td>
                        </tr>
                      </tbody>
                    ))
                  }
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