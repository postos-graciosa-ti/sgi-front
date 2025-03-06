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

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsOptions, setTurnsOptions] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [startDate, setStartDate] = useState()

  const [endDate, setEndDate] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns`)
      .then((response) => {
        let options = []

        response?.data.map((turn) => {
          options.push({ value: turn.id, label: turn.name })
        })

        setTurnsOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/functions`)
      .then((response) => {
        let options = []

        response?.data.map((func) => {
          options.push({ value: func.id, label: func.name })
        })

        setFunctionsOptions(options)
      })

  }, [])

  useEffect(() => {
    if (selectedTurn && selectedFunction) {
      api
        .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns/${selectedTurn?.value}/functions/${selectedFunction?.value}/workers`)
        .then((response) => {
          let options = []

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
        const printableContent = `
          <html>
            <head>
              <style>
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                }
                th, td {
                  text-align: left;
                  vertical-align: top;
                }
              </style>
            </head>
            <body>
              ${ReactDOMServer.renderToStaticMarkup(printContent(response.data, onDuty, formData.start_date, formData.end_date, selectedTurn, selectedFunction))}
            </body>
          </html>
        `

        printJS({
          printable: printableContent,
          type: 'raw-html',
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
              placeholder={"Selecionar colaborador"}
              options={workersOptions}
              onChange={(value) => setSelectedWorker(value)}
              isMulti={true}
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
