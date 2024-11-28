import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import useUserSessionStore from '../data/userSession'
import getRoles from '../requests/getRoles'
import getSubsidiaries from '../requests/getSubsidiaries'
import getUsers from '../requests/getUsers'
import postUser from '../requests/postUser'

const UserModal = (props) => {
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

  const [selectedSubsidiaries, setSelectedSubsidiaries] = useState([])

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

  }, [])

  const handleCreateUser = (e) => {
    e.preventDefault()

    let subsidiariesString = selectedSubsidiaries.map(subsidiary => subsidiary.value).join(',');

    let userData = {
      "name": name,
      "email": email,
      "password": "1",
      "role_id": role,
      "subsidiaries_id": subsidiariesString
    }

    postUser(userData)
      .then((response) => {
        if (response.status == 200) {
          getUsers()
            .then((response) => {
              setUserList(response.data)

              setModalOpen(false)
            })
            .catch((error) => console.error(error))
        }
      })
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
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Cargo"
                options={rolesOptions}
                onChange={(e) => setRole(e.value)}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Filial"
                options={subsidiariesList}
                isMulti
                onChange={(e) => setSelectedSubsidiaries(e)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Fechar
            </Button>

            <Button type="submit" variant="primary">
              Confirmar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default UserModal