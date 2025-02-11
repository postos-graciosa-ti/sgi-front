import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import getFunctions from '../../requests/getFunctions'
import getRoles from '../../requests/getRoles'
import getSubsidiaries from '../../requests/getSubsidiaries'
import putUser from '../../requests/putUser'
import useUserSessionStore from '../../data/userSession'
import getUsers from '../../requests/getUsers'
import api from '../../services/api'

const EditUserModal = (props) => {
  const { editUserModalOpen, setEditUserModalOpen } = props

  const bearerToken = useUserSessionStore(state => state.bearerToken)

  const selectedUser = useUserSessionStore(state => state.selectedUser)

  const setSelectedUser = useUserSessionStore(state => state.setSelectedUser)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const [rolesList, setRolesList] = useState()

  const [functionsList, setFunctionsList] = useState([])

  const [subsidiariesList, setSubsidiariesList] = useState([])

  const [email, setEmail] = useState()

  const [name, setName] = useState()

  const [role, setRole] = useState()

  const [functions, setFunctions] = useState()

  const [subsidiaries, setSubsidiaries] = useState()

  useEffect(() => {
    getRoles()
      .then((response) => {
        let rolesData = response.data

        let options = []

        rolesData && rolesData.map((role) => {
          options.push({ "value": role.id, "label": role.name })
        })

        setRolesList(options)
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

    getSubsidiaries()
      .then((response) => {
        const subsidiariesData = response.data;

        const options = subsidiariesData?.map((subsidiary) => ({
          value: subsidiary.id,
          label: subsidiary.name,
        })) || []

        setSubsidiariesList(options)
      })

  }, [])

  const handleClose = () => {
    setSelectedUser({})

    setEmail()

    setName()

    setRole({})

    setSubsidiaries()

    setEditUserModalOpen(false)
  }

  const handleSubmit = () => {
    const subsidiariesString = subsidiaries?.map(subsidiary => subsidiary.value).join(',') || ''

    const selectedUserSubsidiariesString = selectedUser?.user_subsidiaries ? selectedUser?.user_subsidiaries.map((subsidiary) => subsidiary.id).join(',') : ''

    let subsidiariesId = (
      subsidiariesString.length > 0 && `[${subsidiariesString}]` ||
      selectedUserSubsidiariesString.length > 0 && `[${selectedUserSubsidiariesString}]`
    )

    let formData = {
      "email": email || selectedUser?.user_email,
      "name": name || selectedUser?.user_name,
      "role_id": role?.value || selectedUser?.role_id,
      "subsidiaries_id": subsidiariesId,
      "function_id": functions?.value || selectedUser?.function_id,
      "is_active": true
    }

    putUser(selectedUser?.user_id, formData)
      .then(() => {
        getUsers(bearerToken)
          .then(response => {
            setUserList(response.data)

            handleClose()
          })
      })
  }

  return (
    <Modal
      show={editUserModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar usuário</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="fw-bold mb-1">Email</label>

          <input
            type="email"
            placeholder="E-mail"
            className="form-control"
            defaultValue={selectedUser?.user_email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold mb-1">Nome</label>

          <input
            type="text"
            placeholder="Nome"
            className="form-control"
            defaultValue={selectedUser?.user_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold mb-1">Tipo</label>

          <ReactSelect
            options={rolesList}
            defaultValue={{
              "label": selectedUser?.role_name,
              "value": selectedUser?.role_id
            }}
            onChange={(e) => setRole(e)}
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold mb-1">Filiais</label>

          <ReactSelect
            options={subsidiariesList}
            isMulti
            defaultValue={
              selectedUser?.user_subsidiaries ? selectedUser?.user_subsidiaries.map((subsidiary) => ({
                "label": subsidiary.name,
                "value": subsidiary.id
              })) : []
            }
            onChange={(e) => setSubsidiaries(e)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditUserModal
