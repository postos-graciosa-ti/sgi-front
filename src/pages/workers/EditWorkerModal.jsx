import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import moment from 'moment'

const EditWorkerModal = (props) => {
  const {
    editWorkerModalOpen,
    setEditWorkerModalOpen,
    setWorkersList,
    selectedWorker
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setName] = useState()

  const [functionsOptions, setFunctionsOptions] = useState([])
  const [selectedFunction, setSelectedFunction] = useState()

  const [turnsOptions, setTurnsOptions] = useState([])
  const [selectedTurn, setSelectedTurn] = useState()

  const [costCenterOptions, setCostCenterOptions] = useState([])
  const [selectedCostCenter, setSelectedCostCenter] = useState()

  const [departmentsOptions, setDepartmentsOptions] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState()

  const [admissionDate, setAdmissionDate] = useState()

  useEffect(() => {
    api
      .get("/functions")
      .then((response) => {
        const functionsData = response.data

        const options = functionsData?.map((data) => ({
          value: data.id,
          label: data.name
        })) || []

        setFunctionsOptions(options)
      })

    api
      .get("/turns")
      .then((response) => {
        const turnsData = response.data

        const options = turnsData?.map((data) => ({
          value: data.id,
          label: data.name
        })) || []

        setTurnsOptions(options)
      })

    api
      .get("/cost-center")
      .then((response) => {
        const costCenterData = response.data

        const options = costCenterData?.map((data) => ({
          value: data.id,
          label: data.name
        })) || []

        setCostCenterOptions(options)
      })

    api
      .get("/departments")
      .then((response) => {
        const departmentsData = response.data

        const options = departmentsData?.map((data) => ({
          value: data.id,
          label: data.name
        })) || []

        setDepartmentsOptions(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => setWorkersList(response.data))

    setName()

    setSelectedFunction()

    setSelectedTurn()

    setSelectedCostCenter()

    setSelectedDepartment()

    setAdmissionDate()

    setEditWorkerModalOpen(false)
  }

  const handleSubmit = () => {
    const formData = {
      name: name || selectedWorker?.worker_name,
      function_id: selectedFunction?.value || selectedWorker?.function_id,
      subsidiarie_id: selectedSubsdiarie.value,
      is_active: selectedWorker?.worker_is_active,
      turn_id: selectedTurn?.value || selectedWorker?.turn_id,
      cost_center_id: selectedCostCenter?.value || selectedWorker?.cost_center_id,
      department_id: selectedDepartment?.value || selectedWorker?.department_id,
      admission_date: admissionDate || selectedWorker?.admission_date,
      resignation_date: selectedWorker?.resignation_date
    }

    api
      .put(`/workers/${selectedWorker?.worker_id}`, formData)
      .then((response) => {
        let oldWorkerData = selectedWorker

        let oldWorkerFunc = functionsOptions.find((func) => func.value == oldWorkerData.function_id)

        let oldWorkerTurn = turnsOptions.find((turn) => turn.value == oldWorkerData.turn_id)

        let oldWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == oldWorkerData.cost_center_id)

        let oldWorkerDepartment = departmentsOptions.find((department) => department.value == oldWorkerData.department_id)

        let updatedWorkerData = response.data

        let updatedWorkerFunc = functionsOptions.find((func) => func.value == updatedWorkerData.function_id)

        let updatedWorkerTurn = turnsOptions.find((turn) => turn.value == updatedWorkerData.turn_id)

        let updatedWorkerCostCenter = costCenterOptions.find((costCenter) => costCenter.value == updatedWorkerData.cost_center_id)

        let updatedWorkerDepartment = departmentsOptions.find((department) => department.value == updatedWorkerData.department_id)

        let logStr = `
          ${userSession.name} atualizou ${selectedWorker?.worker_name} de 
          (
            nome=${oldWorkerData.worker_name},
            função=${oldWorkerFunc.label},
            filial=${selectedSubsdiarie.label},
            ativo=sim,
            turno=${oldWorkerTurn.label},
            centro de custo=${oldWorkerCostCenter.label},
            setor=${oldWorkerDepartment.label},
            data de admissão=${oldWorkerData.admission_date}
          )
          para ${updatedWorkerData.name}
          (
            nome=${updatedWorkerData.name},
            função=${updatedWorkerFunc.label},
            filial=${selectedSubsdiarie.label},
            ativo=sim,
            turno=${updatedWorkerTurn.label},
            centro de custo=${updatedWorkerCostCenter.label},
            setor=${updatedWorkerDepartment.label},
            data de admissão=${updatedWorkerData.admission_date}
          )
        `

        let logFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date()).format("HH:mm"),
          "happened_at_time": moment(new Date()).format("DD-MM-YYYY"),
          "user_id": userSession.id,
          "subsidiarie_id": selectedSubsdiarie.value
        }

        api
          .post(`/logs/subsidiaries/${selectedSubsdiarie.value}/workers`, logFormData)
          .then(() => handleClose())
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
          <label htmlFor="workerName">
            <b>Nome do colaborador</b>
          </label>

          <input
            name="workerName"
            type="text"
            placeholder="Nome"
            className="form-control mt-1"
            onChange={(e) => setName(e.target.value)}
            defaultValue={selectedWorker?.worker_name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="workerFunction">
            <b>Função do colaborador</b>
          </label>

          <ReactSelect
            name="workerFunction"
            className="mt-1"
            placeholder="Função"
            options={functionsOptions}
            onChange={(value) => setSelectedFunction(value)}
            defaultValue={{
              label: selectedWorker?.function_name,
              value: selectedWorker?.function_id
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="workerTurn">
            <b>Turno do colaborador</b>
          </label>

          <ReactSelect
            name="workerTurn"
            className="mt-1"
            placeholder="Turnos"
            options={turnsOptions}
            onChange={(value) => setSelectedTurn(value)}
            defaultValue={{
              label: selectedWorker?.turn_name,
              value: selectedWorker?.turn_id
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="workerCostCenter">
            <b>Centro de custo do colaborador</b>
          </label>

          <ReactSelect
            name='workerCostCenter'
            className='mt-1'
            placeholder="C. de custos"
            options={costCenterOptions}
            onChange={(value) => setSelectedCostCenter(value)}
            defaultValue={{
              label: selectedWorker?.cost_center,
              value: selectedWorker?.cost_center_id
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="workerDepartment">
            <b>Setor do colaborador</b>
          </label>

          <ReactSelect
            name='workerDepartment'
            className='mt-1'
            placeholder="Setor"
            options={departmentsOptions}
            onChange={(value) => setSelectedDepartment(value)}
            defaultValue={{
              label: selectedWorker?.department,
              value: selectedWorker?.department_id
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="workerAdmissionDate">
            <b>Data de admissão do colaborador</b>
          </label>

          <input
            name='workerAdmissionDate'
            type="text"
            placeholder="Admissão"
            className="form-control mt-1"
            onChange={(e) => setAdmissionDate(e.target.value)}
            defaultValue={selectedWorker?.admission_date}
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
