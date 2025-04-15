import moment from 'moment'
import { useEffect, useState } from 'react'
import { Plus, Printer, Trash } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import Swal from 'sweetalert2'
import Select from "../../components/form/Select"
import useUserSessionStore from '../../data/userSession'
import loadFunctionsOptions from "../../requests/loadOptions/loadFunctionsOptions"
import loadTurnsOptions from "../../requests/loadOptions/loadTurnsOptions"
import loadWorkersByTurnAndFunctionOptions from '../../requests/loadOptions/loadWorkersByTurnAndFunctionOptions'
import api from '../../services/api'
import HollidayScalePrintContent from './HollidayScalePrintContent'

const HollidayScaleModal = (props) => {
  const { hollidayScaleModalOpen, setHollidayScaleModalOpen, selectedHolliday, setSelectedHolliday } = props

  const webAdress = window.location.origin + location.pathname

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const userSession = useUserSessionStore(state => state.userSession)

  const [workersScale, setWorkersScale] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [turnsOptions, setTurnsOptions] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  useEffect(() => {
    loadTurnsOptions(selectedSubsidiarie, setTurnsOptions)

    loadFunctionsOptions(selectedSubsidiarie, setFunctionsOptions)
  }, [])

  useEffect(() => {
    if (selectedTurn && selectedFunction) {
      loadWorkersByTurnAndFunctionOptions(selectedSubsidiarie, selectedFunction, selectedTurn, setWorkersOptions)
    }
  }, [selectedTurn, selectedFunction])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/hollidays-scale/${selectedHolliday?.date}`)
      .then((response) => setWorkersScale(response?.data))
  }, [hollidayScaleModalOpen])

  const handleClose = () => {
    setSelectedHolliday()

    setSelectedWorker()

    setSelectedTurn()

    setSelectedFunction()

    setHollidayScaleModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      date: selectedHolliday?.date,
      worker_id: selectedWorker?.value,
      worker_turn_id: selectedTurn?.value,
      worker_function_id: selectedFunction?.value,
      subsidiarie_id: selectedSubsidiarie?.value,
    }

    api
      .post("/hollidays-scale", formData)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/hollidays-scale/${selectedHolliday?.date}`)
          .then((response) => setWorkersScale(response?.data))
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: error.response.data.detail,
        })
      })
  }

  const handlePrint = () => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}`)
      .then((response) => {
        let subsidiarieData = response?.data

        api
          .get(`/users/${subsidiarieData?.manager}`)
          .then((response) => {
            let managerData = response?.data

            api
              .get(`/users/${subsidiarieData?.coordinator}`)
              .then((response) => {
                let coordinatorData = response?.data

                const onDuty = managerData
                  ? `${managerData.name} (Gerente - ${managerData.phone}) / ${coordinatorData.name} (Coordenador - ${coordinatorData.phone})`
                  : `${coordinatorData.name} (Coordenador - ${coordinatorData.phone})`

                const printableContent = ReactDOMServer.renderToString(
                  <HollidayScalePrintContent
                    workersScale={workersScale}
                    selectedHolliday={selectedHolliday}
                    onDuty={onDuty}
                    subsidiarieData={subsidiarieData}
                    userSession={userSession}
                    webAdress={webAdress}
                  />
                )

                printJS({
                  printable: printableContent,
                  type: 'raw-html',
                  header: null
                })
              })
          })
      })
  }

  const handleDeleteHollidayScale = (scaleId) => {
    api
      .delete(`/hollidays-scale/${scaleId}`)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/hollidays-scale/${selectedHolliday?.date}`)
          .then((response) => setWorkersScale(response?.data))
      })
  }

  return (
    <>
      <Modal
        show={hollidayScaleModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{moment(selectedHolliday?.date).format("DD-MM-YYYY")}: {selectedHolliday?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div>
              <Select
                placeholder={"Turnos"}
                options={turnsOptions}
                setSelectedValue={setSelectedTurn}
              />
            </div>

            <div>
              <Select
                placeholder={"Funções"}
                options={functionsOptions}
                setSelectedValue={setSelectedFunction}
              />
            </div>

            <div className="row">
              <div className="col-9">
                <Select
                  placeholder={"Colaboradores"}
                  options={workersOptions}
                  setSelectedValue={setSelectedWorker}
                />
              </div>

              <div className="col-3">
                <div className="d-flex gap-2">
                  <button className="btn btn-warning" onClick={handleSubmit}>
                    <Plus />
                  </button>

                  <button className="btn btn-light" onClick={handlePrint}>
                    <Printer />
                  </button>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Funcionários de folga</th>

                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {
                    workersScale?.map((scale) => (
                      <tr key={scale?.id}>
                        <td>{scale?.worker?.name}</td>

                        <td>
                          <button className="btn btn-danger" onClick={() => handleDeleteHollidayScale(scale?.id)}>
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            <span><b>Ei, coordenador, lembre-se: em feriados o colaborador recebe 100%</b></span>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HollidayScaleModal