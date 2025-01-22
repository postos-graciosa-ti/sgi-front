import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';

const EditDepartmentModal = (props) => {
  const { editDepartmentModalOpen, setEditDepartmentModalOpen, selectedDepartment, setDepartmentsList } = props

  const [name, setName] = useState()

  const [description, setDescription] = useState()

  const handleSubmit = () => {
    let formData = {
      name: name,
      description: description
    }

    api
      .put(`/departments/${selectedDepartment.id}`, formData)
      .then(() => {
        api
          .get("/departments")
          .then((response) => {
            setDepartmentsList(response.data)

            setEditDepartmentModalOpen(false)
          })
      })
  }

  return (
    <>
      <Modal
        show={editDepartmentModalOpen}
        onHide={() => setEditDepartmentModalOpen(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar setor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              defaultValue={selectedDepartment?.name}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Descrição"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={selectedDepartment?.description}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setEditDepartmentModalOpen(false)}>Fechar</Button>

          <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditDepartmentModal
