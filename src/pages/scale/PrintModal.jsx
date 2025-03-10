import moment from 'moment'
import printJS from 'print-js'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import printContent from './printContent'

const PrintModal = (props) => {
  const { printModalOpen, setPrintModalOpen } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsOptions, setTurnsOptions] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [startDate, setStartDate] = useState()

  const [endDate, setEndDate] = useState()

  const [selectAllWorkers, setSelectAllWorkers] = useState()

  const webAdress = window.location.origin + location.pathname

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns`)
      .then((response) => {
        const sortedTurns = response.data.sort((a, b) => {
          const startA = moment(a.start_time, "HH:mm")

          const startB = moment(b.start_time, "HH:mm")

          return startA.diff(startB)
        })

        let options = []

        sortedTurns && sortedTurns.map((turn) => {
          options.push({ "label": `${turn.start_time} - ${turn.end_time}`, "value": turn.id })
        })

        setTurnsOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/functions`)
      .then((response) => {
        let functions = response.data

        let functionsOptions = []

        functions && functions.map((func) => {
          let inScaleFunctions = (
            func.name == "Operador(a) de Caixa I" ||
            func.name == "Frentista I" ||
            func.name == "Frentista / Caixa II" ||
            func.name == "Trocador de Óleo / Frentista II"
          )

          if (inScaleFunctions)
            functionsOptions.push({ "label": func.name, "value": func.id })
        })

        setFunctionsOptions(functionsOptions)
      })

  }, [])

  useEffect(() => {
    if (selectedTurn && selectedFunction) {
      api
        .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns/${selectedTurn?.value}/functions/${selectedFunction?.value}/workers`)
        .then((response) => {
          let options = []

          options.push({ value: 0, label: "Todos" })

          response?.data.map((worker) => {
            options.push({ value: worker.id, label: worker.name })
          })

          setWorkersOptions(options)
        })
    }

  }, [selectedTurn, selectedFunction])

  const handleClose = () => {
    setWorkersOptions()

    setSelectedTurn()

    setSelectedFunction()

    setSelectedWorker()

    setStartDate()

    setEndDate()

    setPrintModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      start_date: moment(startDate).format("DD-MM-YYYY"),
      end_date: moment(endDate).format("DD-MM-YYYY"),
      turn_id: selectedTurn?.value,
      workers_ids: selectedWorker?.map((worker) => worker.value) || [],
      function_id: selectedFunction?.value
    }

    const { data: subsidiarieData } = await api.get(`/subsidiaries/${selectedSubsdiarie?.value}`)

    const { data: coordinatorData } = await api.get(`/users/${subsidiarieData?.coordinator}`)

    let managerData = null

    if (subsidiarieData?.manager) {
      const { data } = await api.get(`/users/${subsidiarieData.manager}`)

      managerData = data
    }

    const onDuty = managerData
      ? `${managerData.name} (Gerente - ${managerData.phone}) / ${coordinatorData.name} (Coordenador - ${coordinatorData.phone})`
      : `${coordinatorData.name} (Coordenador - ${coordinatorData.phone})`

    await api
      .post(`/subsidiaries/${selectedSubsdiarie?.value}/scales/print`, formData)
      .then((response) => {
        const printableContent = ReactDOMServer.renderToString(
          printContent(
            response.data,
            onDuty,
            formData.start_date,
            formData.end_date,
            selectedTurn,
            selectedFunction,
            selectedSubsdiarie,
            subsidiarieData.cnpj,
            userSession,
            webAdress
          )
        )

        printJS({
          printable: printableContent,
          type: 'raw-html',
          header: null
        })

        handleClose()
      })
  }

  return (
    <Modal
      show={printModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Imprimir escala</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <ReactSelect
              placeholder={"Selecionar turno"}
              options={turnsOptions}
              onChange={(value) => setSelectedTurn(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder={"Selecionar função"}
              options={functionsOptions}
              onChange={(value) => setSelectedFunction(value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder="Selecionar colaborador"
              options={workersOptions}
              onChange={(selected) => {
                if (selected.some(worker => worker.value === 0)) {
                  setSelectedWorker(workersOptions?.filter(worker => worker.value !== 0));
                } else {
                  setSelectedWorker(selected);
                }
              }}
              isMulti={true}
              value={selectedWorker}
            />
          </div>

          <div className="row">
            <div className="col">
              <input
                type="date"
                className="form-control"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col">
              <input
                type="date"
                className="form-control"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button type="submit" variant="success">Confirmar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default PrintModal
