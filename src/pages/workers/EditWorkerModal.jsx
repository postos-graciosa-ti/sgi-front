import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import getFunctions from '../../requests/getFunctions'
import getSubsidiaries from '../../requests/getSubsidiaries'
import getTurns from '../../requests/getTurns'
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
import api from '../../services/api'

const EditWorkerModal = (props) => {
  const {
    editWorkerModalOpen,
    setEditWorkerModalOpen,
    selectedWorker,
    setSelectedWorker,
    setWorkersList
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setName] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedSubsidiarieOption, setSelectedSubsidiarieOption] = useState()

  const [turnsOptions, setTurnsOptions] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  useEffect(() => {
    // getFunctions()
    //   .then((response) => {
    //     setFunctionsOptions(response.data.map((func) => ({
    //       value: func.id,
    //       label: func.name
    //     })))
    //   })

    api
      .get("/functions/for-workers")
      .then((response) => {
        let functionsForWorkers = response.data

        let options = []

        functionsForWorkers && functionsForWorkers.map((func) => {
          options.push({ "label": func.name, "value": func.id })
        })

        setFunctionsOptions(options)
      })

    getSubsidiaries()
      .then((response) => {
        setSubsidiariesOptions(response.data.map((subsidiarie) => ({
          value: subsidiarie.id,
          label: subsidiarie.name
        })))
      })

    getTurns()
      .then((response) => {
        setTurnsOptions(response.data.map((turn) => ({
          value: turn.id,
          label: turn.name
        })))
      })
  }, [])

  const handleClose = () => {
    setSelectedWorker({})

    setEditWorkerModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "name": name || selectedWorker?.worker_name,
      "function_id": selectedFunction?.value || selectedWorker?.function_id,
      "subsidiarie_id": selectedSubsidiarieOption?.value || selectedSubsdiarie?.value,
      "is_active": true,
      "turn_id": selectedTurn?.value || selectedWorker?.turn_id
    }

    api
      .put(`/workers/${selectedWorker?.worker_id}`, formData)
      .then(() => {
        getWorkersBySubsidiarie(selectedSubsdiarie.value)
          .then((response) => setWorkersList(response.data))

        handleClose()
      })
  }

  return (
    <Modal
      show={editWorkerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            defaultValue={selectedWorker?.worker_name}
            placeholder='Nome'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            defaultValue={functionsOptions?.find((func) => func.value === selectedWorker?.function_id)}
            options={functionsOptions}
            onChange={setSelectedFunction}
            placeholder="Selecione a função"
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            defaultValue={subsidiariesOptions?.find((subsidiarie) => subsidiarie.value === selectedSubsdiarie?.value)}
            options={subsidiariesOptions}
            onChange={setSelectedSubsidiarieOption}
            placeholder="Selecione a subsidiaria"
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            defaultValue={turnsOptions?.find((turn) => turn.value === selectedWorker?.turn_id)}
            options={turnsOptions}
            onChange={setSelectedTurn}
            placeholder="Selecione o turno"
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Fechar
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditWorkerModal
