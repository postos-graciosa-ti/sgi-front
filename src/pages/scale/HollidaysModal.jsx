import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const HollidaysModal = (props) => {
  const { hollidaysModalOpen, setHollidaysModalOpen, hollidays } = props

  const handleClose = () => {
    setHollidaysModalOpen(false)
  }

  return (
    <Modal
      show={hollidaysModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Feriados nacionais</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          hollidays?.map((holliday) => (
            <div className="card mb-2 p-2">
              <span><b>{moment(holliday.date).format("DD-MM-YYYY")}</b>: {holliday.name}</span>
            </div>
          ))
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HollidaysModal
