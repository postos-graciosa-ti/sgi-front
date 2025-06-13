import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const ChangeWorkerSubsidiarieModal = (props) => {
  const { changeWorkerSubsidiarieModalOpen, setChangeWorkerSubsidiarieModalOpen, selectedWorker, setSelectedWorker, setWorkersList } = props

  const subsidiarieSession = useUserSessionStore(state => state.selectedSubsdiarie)

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  useEffect(() => {
    api
      .get("/subsidiaries")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setSubsidiariesOptions(options)
      })
  }, [])

  const handleClose = () => {
    setSelectedWorker()

    setSelectedSubsidiarie()

    setChangeWorkerSubsidiarieModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .patch(`/workers/${selectedWorker?.worker_id}/change-subsidiarie/${selectedSubsidiarie?.value}`)
      .then(() => {
        api
          .get(`/workers/subsidiarie/${subsidiarieSession?.value}`)
          .then((response) => {
            let allWorkers = response.data

            let statusWorkers = allWorkers.filter((worker) => worker.worker_is_active == true && worker.is_away == false)

            let sortStatusWorkers = statusWorkers.sort()

            setWorkersList(sortStatusWorkers)

            handleClose()
          })
      })
  }

  return (
    <>
      <Modal
        show={changeWorkerSubsidiarieModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Mudar filial de colaborador {selectedWorker?.worker_name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label className="fw-bold form-label">
            Filial
          </label>

          <ReactSelect
            options={subsidiariesOptions}
            onChange={(value) => setSelectedSubsidiarie(value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChangeWorkerSubsidiarieModal