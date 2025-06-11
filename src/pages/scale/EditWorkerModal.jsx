import printJS from 'print-js'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const ChangeWorkerTurnPrintContent = ({ selectedWorker, selectedTurn }) => {
  return (
    <>
      <h4>Termo de consentimento de mudança de horário</h4>

      <p>Eu, {selectedWorker.label}, aceito ser trocado o turno para {selectedTurn.label}</p>

      <p>Assinatura</p>

      <p>_________________________________________________________________________________</p>
    </>
  )
}

const EditWorkerModal = (props) => {
  const { editWorkerModalOpen, setEditWorkerModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [turnsOptions, setTurnsOptions] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie?.value}`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.worker_id, label: option.worker_name }))

        setWorkersOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setTurnsOptions(options)
      })
  }, [])

  const handleClose = () => {
    setEditWorkerModalOpen(false)
  }

  const handleSubmit = () => {
    const requestBody = {
      worker_id: selectedWorker?.value,
      turn_id: selectedTurn?.value,
    }

    console.log(requestBody)
    debugger

    api
      .patch("/patch-workers-turn", requestBody)
      .then(() => {
        handleClose()

        const printableContent = ReactDOMServer.renderToString(
          <ChangeWorkerTurnPrintContent
            selectedWorker={selectedWorker}
            selectedTurn={selectedTurn}
          />
        )

        printJS({
          printable: printableContent,
          type: "raw-html",
        })
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
        <Modal.Title>Editar turno de colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            placeholder="Colaboradores"
            options={workersOptions}
            onChange={(option) => setSelectedWorker(option)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder="Turnos"
            options={turnsOptions}
            onChange={(option) => setSelectedTurn(option)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditWorkerModal