import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AddIndicatorsModal = (props) => {
  const { addIndicatorsModalOpen, setAddIndicatorsModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [indicatorsCriteriaOptions, setIndicatorsCriteriaOptions] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedCriteriaOption, setSelectedCriteriaOption] = useState()

  const [selectedWorkerOption, setSelectedWorkerOption] = useState()

  const [note, setNote] = useState()

  useEffect(() => {
    api
      .get("/indicators-criteria")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setIndicatorsCriteriaOptions(options)
      })

    api
      .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.worker_id, label: option.worker_name }))

        setWorkersOptions(options)
      })
  }, [])

  const handleClose = () => {
    setAddIndicatorsModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      month: dayjs().format("YYYY/MM"),
      criteria_id: selectedCriteriaOption?.value,
      workers_ids: `[${selectedWorkerOption.map((option) => option.value).join(",")}]`,
      note: note,
    }

    api.post("/indicators", requestBody)
  }

  return (
    <Modal
      show={addIndicatorsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar indicadores</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">
            Indicador
          </label>

          <ReactSelect
            options={indicatorsCriteriaOptions}
            onChange={(value) => setSelectedCriteriaOption(value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Colaboradores
          </label>

          <ReactSelect
            isMulti
            options={workersOptions}
            onChange={(value) => setSelectedWorkerOption(value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Observações
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddIndicatorsModal