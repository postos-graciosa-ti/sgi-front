import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AddSubsidiarieModal = (props) => {
  const {
    addSubsidiarieModalOpen,
    setAddSubsidiarieModalOpen,
    setSubsidiaries
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const [manager, setManager] = useState()

  const [usersOptions, setUsersOptions] = useState([])

  const [selectedUser, setSelectedUser] = useState()

  const [name, setName] = useState()

  const [adress, setAdress] = useState()

  const [phone, setPhone] = useState()

  const [email, setEmail] = useState()

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        if (response?.data) {
          const options = response.data.map((user) => ({
            label: user.user_name,
            value: user.user_id,
          }))

          setUsersOptions(options)
        }
      })

  }, [])

  const handleCloseModal = () => {
    api
      .get("/subsidiaries")
      .then((response) => setSubsidiaries(response.data))

    setManager()

    setSelectedUser()

    setName()

    setAdress()

    setPhone()

    setEmail()

    setAddSubsidiarieModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "adress": adress,
      "phone": phone,
      "email": email,
      "coordinator": selectedUser.value,
      "manager": manager.value || null
    }

    api
      .post("/subsidiaries", formData)
      .then(() => handleCloseModal())
  }

  return (
    <>
      <Modal
        show={addSubsidiarieModalOpen}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Adicionar filial
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <ReactSelect
                placeholder={"Gerente"}
                options={usersOptions}
                onChange={(value) => setManager(value)}
              />
            </div>

            <div className="mb-3">
              <ReactSelect
                placeholder={"Coordenador"}
                options={usersOptions}
                onChange={(value) => setSelectedUser(value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Endereço"
                onChange={(e) => setAdress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Telefone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="light"
              onClick={handleCloseModal}
            >
              Fechar
            </Button>

            <Button
              type="submit"
              variant="success"
            >
              Criar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddSubsidiarieModal
