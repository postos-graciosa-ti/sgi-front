import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from "../../data/userSession"
import deleteUser from '../../requests/deleteUser'
import getUsers from '../../requests/getUsers'

const DeleteUserModal = (props) => {
  const {
    openDeleteUserModal,
    setOpenDeleteUserModal,
  } = props

  const bearerToken = useUserSessionStore(state => state.bearerToken)

  const setUserList = useUserSessionStore(state => state.setUserList)

  const selectedUser = useUserSessionStore(state => state.selectedUser)

  const handleDeleteUser = () => {
    deleteUser(selectedUser.user_id)
      .then(() => {
        getUsers(bearerToken)
          .then((response) => {
            setUserList(response.data)
            setOpenDeleteUserModal(false)
          })
      })
  }

  return (
    <Modal
      show={openDeleteUserModal}
      // onHide={handleClose}
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
        <Button variant="light" onClick={() => setOpenDeleteUserModal(false)}>
          Fechar
        </Button>

        <Button variant="danger" onClick={() => handleDeleteUser()}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteUserModal