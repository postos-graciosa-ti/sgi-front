import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const EditDepartmentModal = (props) => {
  const {
    editDepartmentModalOpen,
    setEditDepartmentModalOpen,
    selectedDepartment,
    setDepartmentsList,
    setSelectedDepartment
  } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const userSession = useUserSessionStore(state => state.userSession)

  const [name, setName] = useState()

  const [description, setDescription] = useState()

  const handleClose = () => {
    api
      .get("/departments")
      .then((response) => setDepartmentsList(response.data))

    setName()

    setDescription()

    setSelectedDepartment()

    setEditDepartmentModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      name: name,
      description: description
    }

    api
      .put(`/departments/${selectedDepartment.id}`, formData)
      .then(() => handleClose())
  }

  return (
    <>
      <Modal
        show={editDepartmentModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar setor</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <div className="mb-3">
              <label className='fw-bold mb-2'>Nome</label>

              <input
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                defaultValue={selectedDepartment?.name}
                required
              />
            </div>

            <div className="mb-3">
              <label className='fw-bold mb-2'>Descrição</label>

              <input
                className="form-control"
                placeholder="Descrição"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={selectedDepartment?.description}
                required
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>Fechar</Button>

            <Button variant="success" type="submit">Confirmar</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditDepartmentModal
