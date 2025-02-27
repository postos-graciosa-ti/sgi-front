import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
import api from '../../services/api'
import moment from 'moment'

const DeleteWorkerModal = (props) => {
  const {
    deleteWorkerModalOpen,
    setDeleteWorkerModalOpen,
    selectedWorker,
    setSelectedWorker,
    setWorkersList
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [dateResignation, setDateResignation] = useState('')

  const [resignationsReasonsOptions, setResignationsReasonsOptions] = useState([])
  const [selectedResignationReason, setSelectedResignationReason] = useState()

  useEffect(() => {
    api
      .get("/resignable-reasons")
      .then((response) => {
        let resignableReasonsData = response.data

        let options = []

        resignableReasonsData && resignableReasonsData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        })

        setResignationsReasonsOptions(options)
      })

  }, [])

  const handleClose = () => {
    getWorkersBySubsidiarie(selectedSubsdiarie.value)
      .then((response) => {
        setWorkersList(response.data)
      })

    setSelectedWorker({})

    setDateResignation('')

    setSelectedResignationReason()

    setDeleteWorkerModalOpen(false)
  }

  const handleDeleteWorker = () => {
    const formData = {
      is_active: false,
      resignation_reason: selectedResignationReason.value,
      resignation_date: moment(dateResignation).format("DD-MM-YYYY")
    }

    api
      .put(`/workers/${selectedWorker?.worker_id}/deactivate`, formData)
      .then(() => {
        let logStr = `
          ${userSession.name} demitiu ${selectedWorker.worker_name}
          (
            nome=${selectedWorker.worker_name},
            função=${selectedWorker.function_name},
            filial=${selectedSubsdiarie.label}),
            ativo=não,
            turno=${selectedWorker.turn_name},
            centro de custo=${selectedWorker.cost_center},
            setor=${selectedWorker.department},
            data de admissão=${selectedWorker.admission_date},
            data de demissão=${moment(dateResignation).format("DD-MM-YYYY")},
            razão de demissão=${selectedResignationReason.label}
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
      show={deleteWorkerModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {
            selectedWorker?.worker_is_active == false && (
              <>Funcionário já demitido</>
            ) || (
              <>Confirmar demissão</>
            )
          }
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          selectedWorker?.worker_is_active == false && (
            <>
              <div>
                <b>{selectedWorker?.worker_name}</b> já foi demitido(a) por <b>{selectedWorker?.resignation_reason_name}</b> em <b>{selectedWorker?.resignation_date}</b>
              </div>
            </>
          ) || (
            <>
              <div className='mb-3'>
                Deseja realmente demitir o funcionário {selectedWorker?.worker_name}?
              </div>

              <div className='mb-3'>
                <label><b>Motivo de demissão</b></label>

                <ReactSelect
                  options={resignationsReasonsOptions}
                  placeholder="Razão de demissão"
                  onChange={(value) => setSelectedResignationReason(value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label><b>Data de demissão</b></label>

                <input
                  type="date"
                  className="form-control mt-1"
                  placeholder="Data de demissão"
                  value={dateResignation}
                  onChange={(e) => setDateResignation(e.target.value)}
                />
              </div>
            </>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        {
          selectedWorker?.worker_is_active == false && (
            <>
              <Button variant="light" onClick={handleClose}>
                Fechar
              </Button>
            </>
          ) || (
            <>
              <Button variant="light" onClick={handleClose}>
                Fechar
              </Button>

              <Button variant="danger" onClick={handleDeleteWorker}>
                Desativar
              </Button>
            </>
          )
        }
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteWorkerModal
