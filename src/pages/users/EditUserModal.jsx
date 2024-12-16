import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from 'react-select'
import getFunctions from '../../requests/getFunctions'
import getRoles from '../../requests/getRoles'
import getSubsidiaries from '../../requests/getSubsidiaries'
import putUser from '../../requests/putUser'

const EditUserModal = (props) => {
  const { editUserModalOpen, setEditUserModalOpen, selectedUser } = props

  const [rolesList, setRolesList] = useState()

  const [functionsList, setFunctionsList] = useState([])

  const [subsidiariesList, setSubsidiariesList] = useState([])

  const [email, setEmail] = useState()

  const [name, setName] = useState()

  const [role, setRole] = useState()

  const [functions, setFunctions] = useState()

  const [subsidiaries, setSubsidiaries] = useState()

  console.log(selectedUser)

  useEffect(() => {
    GetRoles()

    GetFunctions()

    GetSubsidiaries()
  }, [])

  const GetRoles = () => {
    getRoles()
      .then((response) => {
        let rolesData = response.data

        let options = []

        rolesData && rolesData.map((role) => {
          options.push({ "value": role.id, "label": role.name })
        })

        setRolesList(options)
      })
  }

  const GetFunctions = () => {
    getFunctions()
      .then((response) => {
        const functionsData = response.data;

        const options = functionsData?.map((func) => ({
          value: func.id,
          label: func.name,
        })) || []

        setFunctionsList(options)
      })
  }

  const GetSubsidiaries = () => {
    getSubsidiaries()
      .then((response) => {
        const subsidiariesData = response.data;

        const options = subsidiariesData?.map((subsidiary) => ({
          value: subsidiary.id,
          label: subsidiary.name,
        })) || []

        setSubsidiariesList(options)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(email, name, role, functions, subsidiaries)

    const subsidiariesString = subsidiaries?.map(subsidiary => subsidiary.value).join(',') || ''

    const selectedUserSubsidiariesString = selectedUser?.subsidiaries ? selectedUser?.subsidiaries.map((subsidiary) => subsidiary.id).join(',') : ''

    let formData = {
      email: email || selectedUser?.user_email,
      name: name || selectedUser?.user_name,
      role: role || selectedUser?.role_id,
      functions: functions || selectedUser?.function_id,
      subsidiaries: `[${subsidiariesString}]` || `[${selectedUserSubsidiariesString}]`
    }

    putUser(selectedUser?.user_id, formData)
      .then((response) => {
        setEditUserModalOpen(false)
      })
  }

  return (
    <Modal
      show={editUserModalOpen}
      onHide={() => {
        setEditUserModalOpen(false)
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar usuário</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="email"
              placeholder="E-mail"
              className="form-control"
              defaultValue={selectedUser?.user_email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Nome"
              className="form-control"
              defaultValue={selectedUser?.user_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
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
            <ReactSelect
              options={functionsList}
              defaultValue={{
                "label": selectedUser?.function_name,
                "value": selectedUser?.function_id
              }}
              onChange={(e) => setFunctions(e)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              options={subsidiariesList}
              isMulti
              defaultValue={
                selectedUser?.subsidiaries ? selectedUser?.subsidiaries.map((subsidiary) => ({
                  "label": subsidiary.name,
                  "value": subsidiary.id
                })) : []
              }
              onChange={(e) => setSubsidiaries(e)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => {
            setEditUserModalOpen(false)
          }}>
            Fechar
          </Button>

          <Button type="submit" variant="success">Salvar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditUserModal
