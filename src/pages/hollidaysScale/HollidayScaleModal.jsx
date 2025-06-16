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

const getWorkersList = async (setWorkersList, selectedSubsidiarie) => {
  let workers = await api.get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`).then((response) => response.data)

  setWorkersList(workers)
}

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

  const [workersList, setWorkersList] = useState()

  useEffect(() => {
    getWorkersList(setWorkersList, selectedSubsidiarie)

    loadTurnsOptions(selectedSubsidiarie, setTurnsOptions)

    loadFunctionsOptions(selectedSubsidiarie, setFunctionsOptions)
  }, [])

  useEffect(() => {
    if (selectedTurn && selectedFunction) {
      loadWorkersByTurnAndFunctionOptions(selectedSubsidiarie, selectedFunction, selectedTurn, setWorkersOptions)
    }
  }, [selectedTurn, selectedFunction])

  useEffect(() => {
    if (!hollidayScaleModalOpen) return

    const fetchData = async () => {
      try {
        const [scaleResponse, workersResponse] = await Promise.all([
          api.get(`/subsidiaries/${selectedSubsidiarie?.value}/hollidays-scale/${selectedHolliday?.date}`),
          api.get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
        ])

        const scaleData = scaleResponse.data

        const allWorkers = workersResponse.data

        const scaledWorkerIds = scaleData.map(scale => scale.worker.id)

        const availableWorkers = allWorkers.filter(
          worker => worker.worker_is_active && !scaledWorkerIds.includes(worker.worker_id)
        )

        setWorkersScale(scaleData)

        setWorkersList(availableWorkers)
      } catch (error) {
        console.error("Erro ao carregar escala/trabalhadores:", error)
      }
    };

    fetchData()
  }, [hollidayScaleModalOpen])

  const handleClose = () => {
    setSelectedHolliday()

    setSelectedWorker()

    setSelectedTurn()

    setSelectedFunction()

    setWorkersOptions()

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
      .then((response) => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/hollidays-scale/${selectedHolliday?.date}`)
          .then((response) => {
            const scaledWorkerIds = response.data.map(scale => scale.worker.id)

            let newWorkersList = workersList?.filter(worker => !scaledWorkerIds.includes(worker.worker_id))

            setWorkersList(newWorkersList)

            setWorkersScale(response?.data)
          })

      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: error.response.data.detail,
        })
      })
  }

  const handlePrint = async () => {
    const working = await api.get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`).then((response) => response.data)

    const subsidiarieData = await api.get(`/subsidiaries/${selectedSubsidiarie?.value}`).then((response) => response.data)

    const managerData = subsidiarieData.manager && await api.get(`/users/${subsidiarieData.manager}`).then((response) => response.data)

    const coordinatorData = subsidiarieData.coordinator && await api.get(`/users/${subsidiarieData.coordinator}`).then((response) => response.data)

    const onDuty = (
      managerData && `${managerData.name} (Gerente - ${managerData.phone}) / ${coordinatorData.name} (Coordenador - ${coordinatorData.phone})` ||
      `${coordinatorData.name} (Coordenador - ${coordinatorData.phone})`
    )

    const printableContent = ReactDOMServer.renderToString(
      <HollidayScalePrintContent
        workersScale={workersScale}
        selectedHolliday={selectedHolliday}
        onDuty={onDuty}
        subsidiarieData={subsidiarieData}
        userSession={userSession}
        webAdress={webAdress}
        working={working}
      />
    )

    printJS({
      printable: printableContent,
      type: 'raw-html',
      header: null
    })
  }

  const handleDeleteHollidayScale = (scaleId) => {
    api
      .delete(`/hollidays-scale/${scaleId}`)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/hollidays-scale/${selectedHolliday?.date}`)
          .then((response) => {
            const newWorkersScale = response?.data

            const scaledWorkerIds = newWorkersScale.map(scale => scale.worker.id)

            api
              .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
              .then((res) => {
                const allWorkers = res.data

                const updatedWorkersList = allWorkers.filter(worker => !scaledWorkerIds.includes(worker.worker_id))

                setWorkersList(updatedWorkersList)

                setWorkersScale(newWorkersScale)
              })
          })
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

            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <b>Funcionários trabalhando</b>
                  </button>
                </h2>

                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Colaborador</th>
                          </tr>
                        </thead>

                        <tbody>
                          {
                            workersList?.map((worker) => (
                              <tr>
                                <td>{worker.worker_name}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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