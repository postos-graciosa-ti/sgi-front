import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const EditUserModal = (props) => {
  const { editUserModalOpen, setEditUserModalOpen } = props

  const bearerToken = useUserSessionStore(state => state.bearerToken)

  const selectedUser = useUserSessionStore(state => state.selectedUser)

  const setSelectedUser = useUserSessionStore(state => state.setSelectedUser)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const userSession = useUserSessionStore(state => state.userSession)

  const [rolesList, setRolesList] = useState()

  const [functionsList, setFunctionsList] = useState([])

  const [subsidiariesList, setSubsidiariesList] = useState([])

  const [email, setEmail] = useState()

  const [name, setName] = useState()

  const [role, setRole] = useState()

  const [functions, setFunctions] = useState()

  const [subsidiaries, setSubsidiaries] = useState()

  const [phone, setPhone] = useState()

  useEffect(() => {
    api
      .get("/roles")
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

    api
      .get("/subsidiaries")
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
    api
      .get("/users")
      .then((response) => setUserList(response.data))

    setSelectedUser({})

    setEmail()

    setName()

    setRole({})

    setSubsidiaries()

    setPhone()

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
      "is_active": true,
      "phone": phone
    }

    api
      .put(`/users/${selectedUser?.user_id}`, formData)
      .then((response) => {
        let oldUserRole = rolesList?.find((role) => role.value == selectedUser?.role_id)

        let newUserRole = rolesList?.find((role) => role.value == response?.data.role_id)

        let newSubsidiariesIds = JSON.parse(response?.data.subsidiaries_id) || eval(response?.data.subsidiaries_id)

        let newUserSubsidiaries = subsidiariesList?.filter(({ value }) => newSubsidiariesIds.includes(value)) || []

        let logStr = `
          ${userSession?.name} atualizou ${selectedUser?.user_name} de 
          (
            nome=${selectedUser?.user_name}, 
            email=${selectedUser?.user_email},
            tipo=${oldUserRole?.label},
            filiais=${selectedUser?.user_subsidiaries.map((subsidiarie) => subsidiarie.name).join(", ")},
            telefone=${selectedUser?.user_phone}
          ) 
          para ${response?.data.name} 
          (
            nome=${response?.data.name}, 
            email=${response?.data.email},
            tipo=${newUserRole?.label},
            filiais=(${newUserSubsidiaries.map(subsidiarie => subsidiarie.label).join(", ")}), 
            telefone=${response?.data.phone}
          )
        `

        let logsFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date()).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date()).format("HH:mm"),
          "user_id": userSession.id
        }

        api
          .post(`/logs/users`, logsFormData)
          .then(() => handleClose())
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

        <div className="mb-3">
          <label className="fw-bold mb-1">Telefone</label>

          <input
            className="form-control"
            placeholder="Telefone"
            defaultValue={selectedUser?.user_phone}
            onChange={(e) => setPhone(e.target.value)}
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
