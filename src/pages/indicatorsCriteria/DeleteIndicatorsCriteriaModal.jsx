import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';

const DeleteIndicatorsCriteriaModal = (props) => {
  const { deleteIndicatorsCriteriaModalOpen, setDeleteIndicatorsCriteriaModalOpen, selectedIndicatorCriteria, setIndicatorsCriteria } = props

  const handleClose = () => {
    api
      .get(`/indicators-criteria`)
      .then((response) => {
        setIndicatorsCriteria(response.data)
      })

    setDeleteIndicatorsCriteriaModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .delete(`/indicators-criteria/${selectedIndicatorCriteria?.id}`)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={deleteIndicatorsCriteriaModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Apagar critério {selectedIndicatorCriteria?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Deseja realmente apagar {selectedIndicatorCriteria?.name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteIndicatorsCriteriaModal