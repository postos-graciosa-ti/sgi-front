import { useEffect, useState } from "react"
import { Pen, Plus, Question, Trash } from "react-bootstrap-icons"
import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import initTour from "../../driverjs/initTour"
import userSteps from "../../driverjs/userSteps"
import api from "../../services/api"
import AddUserModal from "./AddUserModal"
import DeleteUserModal from "./DeleteUserModal"
import EditUserModal from "./EditUserModal"

const Users = () => {
  const userList = useUserSessionStore(state => state.userList)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const setSelectedUser = useUserSessionStore(state => state.setSelectedUser)

  const [modalOpen, setModalOpen] = useState(false)

  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false)

  const [editUserModalOpen, setEditUserModalOpen] = useState(false)

  const [usersListStatus, setUsersListStatus] = useState()

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        setUserList(response.data)
      })
  }, [])

  useEffect(() => {
    api
      .get(`/users/status/${usersListStatus}`)
      .then((response) => {
        setUserList(response.data)
      })
  }, [usersListStatus])

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

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Cadastro de usuários</h4>

        <div className="mt-3 mb-3">
          <button
            className="btn btn-warning me-2"
            onClick={() => initTour(userSteps)}
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

        <div className="mb-3">
          <ReactSelect
            options={[
              { "value": "active", "label": "Ativo" },
              { "value": "inactive", "label": "Inativo" },
              { "value": "no-filters", "label": "Sem filtros" },
            ]}
            defaultValue={[{ "value": 1, "label": "Ativo" }]}
            onChange={(option) => setUsersListStatus(option.value)}
          />
        </div>

        {
          userList && userList.map((user) => (
            <div key={user.user_id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  {user.user_name}
                </h5>

                <p className="card-text">
                  {
                    user.user_is_active && (
                      <span class="badge text-bg-success">Ativo</span>
                    ) || (
                      <span class="badge text-bg-danger">Inativo</span>
                    )
                  }
                </p>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div><b>E-mail</b></div>

                  <div>{user.user_email}</div>
                </li>

                <li className="list-group-item">
                  <div><b>Permissões</b></div>

                  <div>{user.role_name}</div>
                </li>

                <li className="list-group-item">
                  <div><b>Filiais</b></div>

                  <div>
                    {
                      user.user_subsidiaries?.map((subsidiarie, i) => (
                        <span key={`${subsidiarie.id}-${i}`}>
                          <span className="badge text-bg-primary me-1">
                            {subsidiarie.name}
                          </span>
                        </span>
                      ))
                    }
                  </div>
                </li>

                <li className="list-group-item">
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
                </li>
              </ul>
            </div>
          ))
        }
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