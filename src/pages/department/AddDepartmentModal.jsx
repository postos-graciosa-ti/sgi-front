import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AddDepartmentModal = (props) => {
  const {
    addDepartmentModalOpen,
    setAddDepartmentModalOpen,
    setDepartmentsList
  } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const userSession = useUserSessionStore(state => state.userSession)

  const [name, setName] = useState('')

  const [description, setDescription] = useState('')

  const handleClose = () => {
    api
      .get("/departments")
      .then((response) => setDepartmentsList(response.data))

    setName()

    setDescription()

    setAddDepartmentModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      name: name,
      description: description
    }

    api
      .post("/departments", formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={addDepartmentModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar setor</Modal.Title>
      </Modal.Header>

      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Body>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Descrição"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>Fechar</Button>

          <Button variant="success" type='submit'>Criar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddDepartmentModal
