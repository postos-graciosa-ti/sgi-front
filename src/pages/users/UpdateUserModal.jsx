import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select'
import useUserSessionStore from '../../data/userSession'
import getRoles from '../../requests/getRoles'
import getUsers from '../../requests/getUsers'
import putUser from '../../requests/putUser'

const UpdateUserModal = (props) => {
  const {
    openUpdateUserModal,
    setOpenUpdateUserModal,
  } = props

  const selectedUser = useUserSessionStore(state => state.selectedUser)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const [rolesOptions, setRolesOptions] = useState()

  const [name, setName] = useState()

  const [email, setEmail] = useState()

  const [role, setRole] = useState()

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
  }, [])

  const handleUpdateUser = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "email": email,
      "password": "1",
      "role_id": role
    }

    putUser(selectedUser.id, formData)
      .then((response) => {
        if (response.status == 200) {
          getUsers()
            .then((response) => {
              setUserList(response.data)
              setOpenUpdateUserModal(false)
            })
        }
      })
  }

  // const handleCreateUser = (e) => {
  //   e.preventDefault()

  //   let userData = {
  //     "name": name,
  //     "email": email,
  //     "password": "1",
  //     "role_id": role
  //   }

  //   postUser(userData)
  //     .then((response) => {

  //       if (response.status == 200) {
  //         getUsers()
  //           .then((response) => {
  //             setUserList(response.data)

  //             setModalOpen(false)
  //           })
  //           .catch((error) => console.error(error))
  //       }
  //     })
  // }

  return (
    <>
      <Modal
        show={openUpdateUserModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar usuário
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleUpdateUser(e)}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                defaultValue={selectedUser.name}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={selectedUser.email}
              />
            </div>

            <div className="mb-3">
              <Select
                options={rolesOptions}
                defaultValue={{ "label": selectedUser.role, "value": 0 }}
                onChange={(e) => setRole(e.value)}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={() => setOpenUpdateUserModal(false)}>
              Fechar
            </Button>

            <Button type="submit" variant="success" onClick={() => handleUpdateUser()}>
              Editar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default UpdateUserModal