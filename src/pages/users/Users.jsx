import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import getUsers from "../../requests/getUsers"
import DeleteUserModal from "./DeleteUserModal"
import AddUserModal from "./AddUserModal"
import UpdateUserModal from "./EditUserModal"
import { Pen, Plus, Question, Trash } from "react-bootstrap-icons"
import EditUserModal from "./EditUserModal"

const Users = () => {
  const userList = useUserSessionStore(state => state.userList)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const [selectedUser, setSelectedUser] = useState()

  const [modalOpen, setModalOpen] = useState(false)

  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false)

  const [editUserModalOpen, setEditUserModalOpen] = useState(false)

  useEffect(() => {
    getUsers()
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
                <th>Email</th>

                <th>Nome</th>

                <th>Tipo</th>

                <th>Função</th>

                <th>Filias</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
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
                      {user.function_name}
                    </td>

                    <td>
                      {
                        // Agrupar subsidiárias em pares de 2
                        user.subsidiaries.reduce((acc, curr, index) => {
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
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => {
                          setEditUserModalOpen(true);
                          setSelectedUser(user)
                        }}
                      >
                        <Pen />
                      </button>

                      <button
                        className="btn btn-danger mt-2 me-2"
                        onClick={() => {
                          setOpenDeleteUserModal(true);
                          setSelectedUser(user);
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

      <AddUserModal
        id={"CreateUserModal"}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <EditUserModal
        editUserModalOpen={editUserModalOpen}
        setEditUserModalOpen={setEditUserModalOpen}
        selectedUser={selectedUser}
      />

      <DeleteUserModal
        openDeleteUserModal={openDeleteUserModal}
        setOpenDeleteUserModal={setOpenDeleteUserModal}
      />
    </>
  )
}

export default Users