import moment from 'moment'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const DeleteSubsidiarieModal = (props) => {
  const {
    selectedSubsidiarie,
    deleteSubsidiarieModalOpen,
    setDeleteSubsidiarieModalOpen,
    setSubsidiaries,
    setSelectedSubsidiarie
  } = props

  const userSession = useUserSessionStore(state => state.userSession)

  const handleCloseModal = () => {
    api
      .get("/subsidiaries")
      .then((response) => setSubsidiaries(response.data))

    setSelectedSubsidiarie()

    setDeleteSubsidiarieModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    api
      .delete(`/subsidiaries/${selectedSubsidiarie.id}`)
      .then(() => {
        let logStr = `${userSession.name} removeu ${selectedSubsidiarie.name} (nome=${selectedSubsidiarie.name}, endereço=${selectedSubsidiarie.adress}, telefone=${selectedSubsidiarie.phone}, email=${selectedSubsidiarie.email})`

        let logFormData = {
          "log_str": logStr,
          "happened_at": moment(new Date()).format("DD-MM-YYYY"),
          "happened_at_time": moment(new Date()).format("HH:mm"),
          "user_id": userSession.id
        }

        api
          .post(`/subsidiaries/logs`, logFormData)
          .then(() => handleCloseModal())
      })
  }

  return (
    <>
      <Modal
        show={deleteSubsidiarieModalOpen}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Confirmar exclusão
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            Tem certeza que deseja excluir {selectedSubsidiarie && selectedSubsidiarie.name}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="light"
              onClick={handleCloseModal}
            >
              Fechar
            </Button>

            <Button
              type="submit"
              variant="danger"
            >
              Excluir
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default DeleteSubsidiarieModal
