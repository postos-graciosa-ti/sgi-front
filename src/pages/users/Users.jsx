import { useEffect, useState } from "react"
import { Pen, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import AddUserModal from "./AddUserModal"
import DeleteUserModal from "./DeleteUserModal"
import EditUserModal from "./EditUserModal"

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

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de usuários</h4>

        <div className="mt-3 mb-3">
          <button
            id="addUser"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
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
              {userList && userList.map((user) => (
                <>
                  <tr>
                    <td>
                      {user.user_email}
                    </td>

                    <td>
                      {user.user_name}
                    </td>

                    <td>
                      {user.role_name}
                    </td>

                    <td>
                      {
                        user.user_subsidiaries?.reduce((acc, curr, index) => {
                          if (index % 2 === 0) {
                            acc.push([curr]);
                          } else {
                            acc[acc.length - 1].push(curr);
                          }
                          return acc;
                        }, []).map((group, groupIndex) => (
                          <div key={groupIndex}>
                            {group.map((subsidiary, subIndex) => (
                              <span key={subIndex} className="badge text-bg-primary me-1">
                                {subsidiary.name}
                              </span>
                            ))}
                          </div>
                        ))
                      }
                    </td>

                    <td>
                      <button
                        id="editUser"
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => {
                          setEditUserModalOpen(true);
                          setSelectedUser(user)
                        }}
                        title="Editar usuário"
                      >
                        <Pen />
                      </button>

                      <button
                        id="deleteUser"
                        className="btn btn-danger mt-2 me-2"
                        onClick={() => {
                          setOpenDeleteUserModal(true);
                          setSelectedUser(user);
                        }}
                        title="Apagar usuário"
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