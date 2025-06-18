import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import ReactSelect from "react-select"

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
    console.log(selectedWorkers)
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