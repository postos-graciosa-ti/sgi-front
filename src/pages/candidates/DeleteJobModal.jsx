import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import deleteJob from "../../requests/deleteJob"
import getJobs from '../../requests/getJobs'

const DeleteJobModal = (props) => {
  const { openDeleteJobModal, setOpenDeleteJobModal, selectedJob } = props

  const setJobsList = useUserSessionStore(state => state.setJobsList)

  // const selectedJob = useUserSessionStore(state => state.selectedJob)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const handleSubmit = async () => {
    await deleteJob(selectedJob.id)
      .then(() => {
        setOpenDeleteJobModal(false)
        getJobs(selectedSubsdiarie.value)
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