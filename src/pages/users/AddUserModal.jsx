import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AddUserModal = (props) => {
  const {
    modalOpen,
    setModalOpen,
  } = props

  const setUserList = useUserSessionStore(state => state.setUserList)

  const [subsidiariesList, setSubsidiariesList] = useState()

  const [rolesOptions, setRolesOptions] = useState()

  const [name, setName] = useState()

  const [email, setEmail] = useState()

  const [role, setRole] = useState()

  const [selectedSubsidiaries, setSelectedSubsidiaries] = useState([])

  const [phone, setPhone] = useState()

  useEffect(() => {
    api
      .get("/roles")
      .then((response) => {
        let rolesData = response.data

        let options = []

        rolesData && rolesData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        })

        setRolesOptions(options)
      })

    api
      .get("/subsidiaries")
      .then((response) => {
        let subsidiariesData = response.data

        let options = []

        subsidiariesData && subsidiariesData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        })

        setSubsidiariesList(options)
      })
  }, [])

  const handleClose = () => {
    api
      .get("/users")
      .then((response) => setUserList(response.data))

    setName()

    setEmail()

    setRole()

    setSelectedSubsidiaries([])

    setPhone()

    setModalOpen(false)
  }

  const handleCreateUser = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "email": email,
      "role_id": role,
      "subsidiaries_id": `[${selectedSubsidiaries.map(subsidiary => subsidiary.value).join(',')}]`,
      "phone": phone
    }

    api
      .post("/users", formData)
      .then(() => handleClose())
  }

  return (
    <>
      <Modal
        show={modalOpen}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Criar novo usuário
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleCreateUser(e)}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
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
              <Select
                placeholder="Tipo"
                options={rolesOptions}
                onChange={(e) => setRole(e.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Filial"
                options={subsidiariesList}
                isMulti
                value={selectedSubsidiaries && selectedSubsidiaries}
                onChange={(e) => setSelectedSubsidiaries(e)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Telefone"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Fechar
            </Button>

            <Button type="submit" variant="success">
              Criar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddUserModal
