import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import useUserSessionStore from '../../data/userSession'
import getRoles from '../../requests/getRoles'
import getSubsidiaries from '../../requests/getSubsidiaries'
import getUsers from '../../requests/getUsers'
import postUser from '../../requests/postUser'
import api from '../../services/api'

const AddUserModal = (props) => {
  const {
    modalOpen,
    setModalOpen,
  } = props

  const bearerToken = useUserSessionStore(state => state.bearerToken)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const [rolesOptions, setRolesOptions] = useState()

  const [name, setName] = useState()

  const [email, setEmail] = useState()

  const [role, setRole] = useState()

  const [subsidiariesList, setSubsidiariesList] = useState()

  const [functionsList, setFunctionsList] = useState()

  const [selectedSubsidiaries, setSelectedSubsidiaries] = useState([])

  const [selectedFunction, setSelectedFunction] = useState()

  const [hideSubsidiaries, setHideSubsidiaries] = useState(false)

  useEffect(() => {
    getRoles()
      .then((response) => {
        let rolesData = response.data

        let options = []

        rolesData && rolesData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        })

        setRolesOptions(options)
      })

    getSubsidiaries()
      .then((response) => {
        let subsidiariesData = response.data

        let options = []

        subsidiariesData && subsidiariesData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        })

        setSubsidiariesList(options)
      })

    api
      .get("/functions/for-users")
      .then((response) => {
        let functionsData = response.data

        let options = []

        functionsData && functionsData.map((data) => {
          options.push({ "label": data.name, "value": data.id })
        })

        setFunctionsList(options)
      })
  }, [])

  const handleClose = () => {
    setSelectedSubsidiaries([])

    setModalOpen(false)
  }

  const handleCreateUser = (e) => {
    e.preventDefault()

    let subsidiariesString = selectedSubsidiaries.map(subsidiary => subsidiary.value).join(',');

    let formData = {
      "name": name,
      "email": email,
      "role_id": role,
      "subsidiaries_id": `[${subsidiariesString}]`,
      "function_id": selectedFunction.value
    }

    postUser(formData)
      .then(() => {
        getUsers(bearerToken)
          .then((response) => {
            setUserList(response.data)

            setModalOpen(false)
          })
      })
  }

  const handleSelectRole = (role) => {
    setRole(role)
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
                onChange={(e) => handleSelectRole(e.value)}
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
              <Select
                placeholder="Função"
                options={functionsList}
                onChange={(e) => setSelectedFunction(e)}
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
