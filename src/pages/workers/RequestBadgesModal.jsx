import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import Swal from 'sweetalert2'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const RequestBadgesModal = (props) => {
  const { requestBadgesModalOpen, setRequestBadgesModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedWorkers, setSelectedWorkers] = useState()

  useEffect(() => {
    if (requestBadgesModalOpen) {
      api
        .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
        .then((response) => {
          let options = response.data.map((option) => ({ value: option.worker_id, label: option.worker_name }))

          setWorkersOptions(options)
        })
    }
  }, [requestBadgesModalOpen])

  const handleClose = () => {
    setRequestBadgesModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      workers_ids: selectedWorkers.map((worker) => worker.value),
      recipient_email: "postosgraciosati@gmail.com",
    }

    api
      .post(`/workers/request-badges`, requestBody)
      .then(() => {
        Swal.fire("Sucesso", "Solicitação enviada com sucesso", "success")
      })
  }

  return (
    <Modal
      show={requestBadgesModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Solicitar crachá definitivo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ReactSelect
          options={workersOptions}
          onChange={(options) => setSelectedWorkers(options)}
          isMulti
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Solicitar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RequestBadgesModal