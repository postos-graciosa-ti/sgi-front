import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import api from '../../services/api'

const DeleteMetricsModal = (props) => {
  const { setMetricsList, selectedMetric, deleteMetricsModalOpen, setDeleteMetricsModalOpen } = props

  const handleClose = () => {
    api
      .get("/metrics")
      .then((response) => setMetricsList(response.data))

    setDeleteMetricsModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .delete(`/metrics/${selectedMetric?.id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteMetricsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deseja realmente apagar {selectedMetric?.year_month}?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Essa ação é irreversível
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleSubmit}>Apagar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteMetricsModal