import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const MonthMetricsModal = (props) => {
  const { monthMetricsModalOpen, setMonthMetricsModalOpen } = props

  const [monthMetricsList, setMonthMetricsList] = useState()

  useEffect(() => {
    api
      .get("/workers-metrics/current-month")
      .then((response) => setMonthMetricsList(response.data))
  }, [monthMetricsModalOpen])

  const handleClose = () => {
    setMonthMetricsModalOpen(false)
  }

  return (
    <Modal
      show={monthMetricsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Métricas mensais</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* {
          monthMetricsList?.map((metric) => (

          ))
        } */}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MonthMetricsModal