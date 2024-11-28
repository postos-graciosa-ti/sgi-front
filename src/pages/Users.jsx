import { useEffect, useState } from "react"
import Nav from "../components/Nav"
import useUserSessionStore from "../data/userSession"
import getUsers from "../requests/getUsers"
import DeleteUserModal from "./DeleteUserModal"
import UserModal from "./UserModal"
import UpdateUserModal from "./UpdateUserModal"

const Users = () => {
  const [users, setUsers] = useState()

  const userList = useUserSessionStore(state => state.userList)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const [modalOpen, setModalOpen] = useState(false)

  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false)

  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false)

  const setSelectedUser = useUserSessionStore(state => state.setSelectedUser)

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUserList(response.data)
      })
      .catch((error) => console.error(error))
  }, [])

  // const handleOpenModal = (selectedUser) => {
  //   setModalOpen(true)

  //   setSelectedUser(selectedUser)
  // }

  // const handleUpdateUser = () => { }

  // const handleOpenDeleteModal = () => {}

  return (
    <>
      <Nav />

      <div className="container">
        <button
          className="btn btn-sm btn-primary mt-4"
          onClick={() => setModalOpen(true)}
        >
          Cadastrar novo usuário
        </button>

        <div className="table-responsive mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>

                <th>Email</th>

                <th>Cargo</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {userList && userList.map((user) => (
                <>
                  <tr>
                    <td>
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {user.role}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary mt-2 me-2"
                        onClick={() => {
                          setOpenUpdateUserModal(true)
                          setSelectedUser(user)
                        }}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-sm btn-danger mt-2 me-2"
                        onClick={() => {
                          setOpenDeleteUserModal(true)
                          setSelectedUser(user)
                        }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        id={"CreateUserModal"}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <UpdateUserModal 
        openUpdateUserModal={openUpdateUserModal}
        setOpenUpdateUserModal={setOpenUpdateUserModal}      
      />

      <DeleteUserModal
        openDeleteUserModal={openDeleteUserModal}
        setOpenDeleteUserModal={setOpenDeleteUserModal}
      />
    </>
  )
}

export default Users