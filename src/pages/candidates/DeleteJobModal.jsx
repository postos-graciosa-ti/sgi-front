import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const DeleteJobModal = (props) => {
  const { openDeleteJobModal, setOpenDeleteJobModal, selectedJob } = props

  const setJobsList = useUserSessionStore(state => state.setJobsList)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleSubmit = async () => {
    await api
      .delete(`/jobs/${selectedJob.id}`)
      .then(() => {
        setOpenDeleteJobModal(false)

        api
          .get(`/jobs/subsidiarie/${selectedSubsdiarie.value}`)
          .then((response) => {
            setJobsList(response.data)
          })
      })
  }

  return (
    <>
      <Modal
        show={openDeleteJobModal}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Encerrar vaga
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Tem certeza que deseja encerrar a vaga?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => setOpenDeleteJobModal(false)}>
            Fechar
          </Button>

          <Button variant="danger" onClick={() => handleSubmit()}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteJobModal