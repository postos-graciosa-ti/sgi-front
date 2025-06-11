import dayjs from 'dayjs'
import printJS from 'print-js'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const ChangeWorkerTurnPrintContent = ({ selectedWorker, selectedTurn, workerData, subsidiarieData }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>
      </div>

      <div>
        <h4>Acordo de compensação de horas</h4>
      </div>

      <div>
        <h4><b>Empregador</b>: {subsidiarieData?.name}</h4>

        <p><b>CNPJ:</b> {subsidiarieData?.cnpj}</p>

        <p><b>Endereço:</b> {subsidiarieData?.adress}</p>
      </div>

      <div>
        <h4><b>Empregado</b>: {workerData?.name}</h4>

        <p><b>CPF:</b> {workerData?.cpf}</p>

        <p><b>CTPS:</b> {workerData?.ctps}</p>

        <p><b>Série:</b> {workerData?.ctps_serie}</p>

        <p><b>Endereço:</b> {workerData?.street} {workerData?.street_number} {workerData?.street_complement}</p>
      </div>

      <div>
        <h4><b>Objeto</b></h4>

        <p>O presente acordo tem como objetivo a alteração do horário de trabalho do empregado, mantendo a mesma carga horária semanal, conforme descrito a seguir:</p>

        <p><b>Horário de trabalho</b></p>

        <p><b>Horário anterior:</b></p>

        <p><b>Novo horário:</b> {selectedTurn?.label}</p>

        <p><b>Dias da Semana</b>: segunda à sábado</p>

        <p><b>Data de Início</b>: {dayjs().format("DD-MM-YYYY")}</p>
      </div>

      <div>
        <h4><b>Compensação de Horas (Se Aplicável)</b></h4>

        <p><b>Validade do Acordo:</b> tempo indeterminado</p>
      </div>

      <div>
        <h4><b>Condições Gerais</b></h4>

        <p>O presente acordo está em conformidade com a legislação trabalhista vigente</p>

        <p>O presente acordo poderá ser rescindido por qualquer das partes, mediante aviso prévio</p>
      </div>

      <div>
        <h4><b>Assinaturas</b></h4>

        <p><b>Empregador</b> _______________________________________________________________</p>

        <p><b>Empregado</b> _______________________________________________________________</p>

        <p><b>Data</b>: {dayjs().format("DD-MM-YYYY")}</p>
      </div>
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

  const handleSubmit = async () => {
    const requestBody = {
      worker_id: selectedWorker?.value,
      turn_id: selectedTurn?.value,
    }

    let workerData = await api.get(`/workers/${selectedWorker?.value}`).then((response) => response.data)

    let subsidiarieData = await api.get(`/subsidiaries/${selectedSubsdiarie?.value}`).then((response) => response.data)

    await api
      .patch("/patch-workers-turn", requestBody)
      .then(() => {
        handleClose()

        const printableContent = ReactDOMServer.renderToString(
          <ChangeWorkerTurnPrintContent
            selectedWorker={selectedWorker}
            selectedTurn={selectedTurn}
            workerData={workerData}
            subsidiarieData={subsidiarieData}
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