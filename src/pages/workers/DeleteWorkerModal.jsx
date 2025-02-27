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
      .then(() => handleClose())
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
