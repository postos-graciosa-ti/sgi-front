import { useEffect, useState } from "react"
import { Pen, Plus, Question, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import AddUserModal from "./AddUserModal"
import DeleteUserModal from "./DeleteUserModal"
import EditUserModal from "./EditUserModal"
import mountDriver from "../../driverjs/mountDriver"
import userSteps from "../../driverjs/userSteps"

const Users = () => {
  const bearerToken = useUserSessionStore(state => state.bearerToken)

  const userList = useUserSessionStore(state => state.userList)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const setSelectedUser = useUserSessionStore(state => state.setSelectedUser)

  const [modalOpen, setModalOpen] = useState(false)

  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false)

  const [editUserModalOpen, setEditUserModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUserList(response.data)
      })
  }, [])

  const handleOpenAddUserModal = () => {
    setModalOpen(true)
  }

  const handleOpenEditUserModal = (user) => {
    setSelectedUser(user)

    setEditUserModalOpen(true)
  }

  const handleOpenDeleteUserModal = (user) => {
    setSelectedUser(user)

    setOpenDeleteUserModal(true)
  }

  const initTour = () => {
    const driverObj = mountDriver(userSteps)

    driverObj.drive()
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de usuários</h4>

        <div className="mt-3 mb-3">
          <button
            className="btn btn-warning me-2"
            onClick={initTour}
          >
            <Question />
          </button>

          <button
            id="addUser"
            className="btn btn-primary"
            onClick={handleOpenAddUserModal}
            title="Adicionar usuário"
          >
            <Plus />
          </button>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Email</th>

                <th>Nome</th>

                <th>Tipo</th>

                <th>Filiais</th>

                <th></th>
              </tr>
            </thead>

            <tbody id="users-table">
              {
                userList?.map((user) => (
                  <tr
                    key={user.user_id}
                    id="userRow"
                  >
                    <td>{user.user_email}</td>

                    <td>{user.user_name}</td>

                    <td>{user.role_name}</td>

                    <td>
                      {
                        user.user_subsidiaries?.map((subsidiarie, i) => (
                          <>
                            <span
                              key={subsidiarie.id}
                              className="badge text-bg-primary me-1"
                            >
                              {subsidiarie.name}
                            </span>

                            {i % 2 == 0 && <br></br>}
                          </>
                        ))
                      }
                    </td>

                    <td>
                      <button
                        id="editUser"
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => handleOpenEditUserModal(user)}
                        title="Editar usuário"
                      >
                        <Pen />
                      </button>

                      <button
                        id="deleteUser"
                        className="btn btn-danger mt-2 me-2"
                        onClick={() => handleOpenDeleteUserModal(user)}
                        title="Apagar usuário"
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal
        id={"CreateUserModal"}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <EditUserModal
        editUserModalOpen={editUserModalOpen}
        setEditUserModalOpen={setEditUserModalOpen}
      />

      <DeleteUserModal
        openDeleteUserModal={openDeleteUserModal}
        setOpenDeleteUserModal={setOpenDeleteUserModal}
        setSelectedUser={setSelectedUser}
      />
    </>
  )
}

export default Users