import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import getUsers from "../../requests/getUsers"
import DeleteUserModal from "./DeleteUserModal"
import UserModal from "./UserModal"
import UpdateUserModal from "./UpdateUserModal"
import { Pen, Plus, Question, Trash } from "react-bootstrap-icons"

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

  // console.log(userList)

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de usuários</h4>

        <div className="mt-3 mb-3">
          <button
            className="btn btn-warning me-2"
            onClick={() => setModalOpen(true)}
          >
            <Question />
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            <Plus />
          </button>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-hover">
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
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => {
                          setOpenUpdateUserModal(true)
                          setSelectedUser(user)
                        }}
                      >
                        <Pen />
                      </button>

                      <button
                        className="btn btn-danger mt-2 me-2"
                        onClick={() => {
                          setOpenDeleteUserModal(true)
                          setSelectedUser(user)
                        }}
                      >
                        <Trash />
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