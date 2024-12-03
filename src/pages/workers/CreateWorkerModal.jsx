import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import getFunctions from "../../requests/getFunctions"
import Select from 'react-select'
import { useEffect, useState } from 'react'
import getSubsidiaries from '../../requests/getSubsidiaries'
import postWorker from '../../requests/postWorker'
import getTurns from '../../requests/getTurns'
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
import useUserSessionStore from '../../data/userSession'

const CreateWorkerModal = (props) => {
  const {
    createWorkerModalOpen,
    setCreateWorkerModalOpen,
  } = props

  const [name, setSelectedName] = useState()

  const [functionsList, setFunctionsList] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsList, setTurnsList] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const setWorkersList = useUserSessionStore((state) => state.setWorkersList)

  useEffect(() => {
    GetFunctions()

    GetTurns()
  }, [])

  const GetFunctions = () => {
    getFunctions()
      .then((response) => {
        let functionsData = response.data

        let options = []

        functionsData && functionsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setFunctionsList(options)
      })
  }

  const GetTurns = () => {
    getTurns()
      .then((response) => {
        let turnsData = response.data

        let options = []

        turnsData && turnsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setTurnsList(options)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "function_id": selectedFunction,
      "subsidiarie_id": selectedSubsdiarie.value,
      "turn_id": selectedTurn
    }

    postWorker(formData)
      .then(() => {
        getWorkersBySubsidiarie(selectedSubsdiarie.value)
          .then((response) => {
            setWorkersList(response.data)

            setCreateWorkerModalOpen(false)
          })
      })
  }

  return (
    <>
      <Modal
        show={createWorkerModalOpen}
        onHide={() => setCreateWorkerModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar colaborador</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setSelectedName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Cargo"
                options={functionsList}
                onChange={(e) => setSelectedFunction(e.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Turno"
                options={turnsList}
                onChange={(e) => setSelectedTurn(e.value)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setCreateWorkerModalOpen(false)}>
              Fechar
            </Button>

            <Button type="submit" variant="primary">Adicionar</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default CreateWorkerModal