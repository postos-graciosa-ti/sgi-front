import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from "../../data/userSession"
import api from '../../services/api'

const DeleteUserModal = (props) => {
  const {
    openDeleteUserModal,
    setOpenDeleteUserModal,
    setSelectedUser,
  } = props

  const bearerToken = useUserSessionStore(state => state.bearerToken)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const selectedUser = useUserSessionStore(state => state.selectedUser)

  const userSession = useUserSessionStore(state => state.userSession)

  const handleClose = () => {
    api
      .get("/users")
      .then((response) => setUserList(response.data))

    setSelectedUser()

    setOpenDeleteUserModal(false)
  }

  const handleDeleteUser = () => {
    api
      .delete(`/users/${selectedUser.user_id}`)
      .then(() => {
        let logStr = `
          ${userSession.name} excluiu ${selectedUser?.user_name} 
          (
            nome=${selectedUser?.user_name}, 
            email=${selectedUser?.user_email},
            tipo=${selectedUser?.role_name},
            filiais=${selectedUser?.user_subsidiaries.map((subsidiarie) => subsidiarie.name).join(", ")},
            telefone=${selectedUser?.user_phone}
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
      show={openDeleteUserModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Deletar usuário
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja excluir o usuário {selectedUser && selectedUser.name}?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="danger" onClick={handleDeleteUser}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteUserModal
