import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const IndicatorsFilterModal = (props) => {
  const { indicatorsFilterModalOpen, setIndicatorsFilterModalOpen } = props

  const [monthsOptions, setMonthsOptions] = useState()

  const [criteriasOptions, setCriteriasOptions] = useState()

  const [selectedMonth, setSelectedMonth] = useState()

  const [selectedCriteria, setSelectedCriteria] = useState()

  useEffect(() => {
    api
      .get(`/indicators`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.month, label: option.month }))

        setMonthsOptions(options)
      })

    api
      .get(`/indicators-criteria`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setCriteriasOptions(options)
      })
  }, [indicatorsFilterModalOpen])

  const handleClose = () => {
    setIndicatorsFilterModalOpen(false)
  }

  const handleSubmit = () => {
    api.post(`/indicators_by_month_and_criteria`, { month: selectedMonth?.value, criteria_id: selectedCriteria?.value })
  }

  return (
    <Modal
      show={indicatorsFilterModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filtrar indicadores</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            options={monthsOptions}
            onChange={(value) => setSelectedMonth(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            options={criteriasOptions}
            onChange={(value) => setSelectedCriteria(value)}
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

export default IndicatorsFilterModal