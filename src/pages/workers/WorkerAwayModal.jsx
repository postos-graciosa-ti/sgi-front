import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Input from '../../components/form/Input'
import Select from '../../components/form/Select'
import useUserSessionStore from '../../data/userSession'
import loadAwayReasons from "../../requests/loadOptions/loadAwayReasons"
import api from '../../services/api'

const WorkerAwayModal = (props) => {
  const { workerAwayModalOpen, setWorkerAwayModalOpen, selectedWorker, setSelectedWorker, setWorkersList } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [awayReasonsOptions, setAwayReasonsOptions] = useState()

  const [awayStartDate, setAwayStartDate] = useState()

  const [awayEndDate, setAwayEndDate] = useState()

  const [selectedAwayReason, setSelectedAwayReason] = useState()

  useEffect(() => {
    if (workerAwayModalOpen)
      loadAwayReasons(setAwayReasonsOptions)
  }, [workerAwayModalOpen])

  const handleClose = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
      .then((response) => {
        setWorkersList(response.data)
      })

    setSelectedWorker()

    setAwayStartDate()

    setAwayEndDate()

    setSelectedAwayReason()

    setWorkerAwayModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      "away_start_date": awayStartDate,
      "away_end_date": awayEndDate,
      "away_reason_id": selectedAwayReason?.value,
    }

    api
      .put(`/subsidiaries/${selectedSubsidiarie?.value}/workers/${selectedWorker?.worker_id}/away`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={workerAwayModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Afastamento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Input
          type="date"
          setSelectedValue={setAwayStartDate}
          label={"Data de afastamento"}
        />

        <Input
          type="date"
          setSelectedValue={setAwayEndDate}
          label={"Data de retorno"}
        />

        <Select
          options={awayReasonsOptions}
          placeholder={"Razão de afastamento"}
          setSelectedValue={setSelectedAwayReason}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Afastar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkerAwayModal