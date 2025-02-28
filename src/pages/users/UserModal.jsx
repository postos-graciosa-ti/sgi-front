import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const AddUserModal = (props) => {
  const {
    id,
    modalOpen,
    setModalOpen,
  } = props

  const setUserList = useUserSessionStore(state => state.setUserList)

  const [rolesOptions, setRolesOptions] = useState()

  const [name, setName] = useState()

  const [email, setEmail] = useState()

  const [role, setRole] = useState()

  const [subsidiariesList, setSubsidiariesList] = useState()

  const [functionsList, setFunctionsList] = useState()

  const [selectedSubsidiaries, setSelectedSubsidiaries] = useState([])

  const [selectAllSubsidiaries, setSelectAllSubsidiaries] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

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

    api
      .get("/functions")
      .then((response) => {
        let functionsData = response.data

        let options = []

        functionsData && functionsData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        })

        setFunctionsList(options)
      })

  }, [])

  const handleCreateUser = (e) => {
    e.preventDefault()

    let subsidiariesString = selectedSubsidiaries.map(subsidiary => subsidiary.value).join(',');

    let formData = {
      "name": name,
      "email": email,
      "password": "1",
      "role_id": role.value,
      "subsidiaries_id": `[${subsidiariesString}]`,
      "function_id": selectedFunction.value
    }

    api
      .post("/users", formData)
      .then(() => {
        api
          .get("/users")
          .then((response) => {
            setUserList(response.data)

            setSelectAllSubsidiaries(false)

            setModalOpen(false)
          })
      })
  }

  const handleSelectRole = (role) => {
    if (role == 1)
      setSelectAllSubsidiaries(true)

    setRole(role)
  }

  return (
    <>
      <Modal
        show={modalOpen}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {
              id == "CreateUserModal" && "Criar novo usuário"
              || "Editar usuário"
            }
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
                onChange={(e) => handleSelectRole(e.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Filial"
                options={subsidiariesList}
                isMulti
                value={selectAllSubsidiaries && subsidiariesList || selectedSubsidiaries}
                onChange={(e) => setSelectedSubsidiaries(e)}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Função"
                options={functionsList}
                onChange={(e) => setSelectedFunction(e)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="light"
              onClick={() => {
                setModalOpen(false)
                setSelectAllSubsidiaries(false)
              }}
            >
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
