import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import useUserSessionStore from '../../data/userSession'
import getFunctions from "../../requests/getFunctions"
import getTurns from '../../requests/getTurns'
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
import postWorker from '../../requests/postWorker'
import api from '../../services/api'

const CreateWorkerModal = (props) => {
  const {
    createWorkerModalOpen,
    setCreateWorkerModalOpen,
    setWorkersList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setSelectedName] = useState()

  const [functionsList, setFunctionsList] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [turnsList, setTurnsList] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  useEffect(() => {
    // getFunctions()
    // .then((response) => {
    //   let functionsData = response.data

    //   let options = []

    //   functionsData && functionsData.map((data) => {
    //     options.push({ "value": data.id, "label": data.name })
    //   })

    //   setFunctionsList(options)
    // })

    api
      .get("/functions/for-workers")
      .then((response) => {
        let functionsData = response.data

        let options = []

        functionsData && functionsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setFunctionsList(options)
      })

    getTurns()
      .then((response) => {
        let turnsData = response.data

        let options = []

        turnsData && turnsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setTurnsList(options)
      })
  }, [])

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
            <Button variant="light" onClick={() => setCreateWorkerModalOpen(false)}>
              Fechar
            </Button>

            <Button type="submit" variant="success">Adicionar</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default CreateWorkerModal