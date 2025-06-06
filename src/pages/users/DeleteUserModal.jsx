import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
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
      .patch(`/users/${selectedUser?.user_id}/created_by/${userSession?.id}/deactivate`)
      .then(() => handleClose())
      .catch((error) => {
        Swal.fire("Erro", error.response.data.detail, "error")
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
