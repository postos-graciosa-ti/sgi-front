import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import postJob from '../../requests/postJob';
import useUserSessionStore from '../../data/userSession';
import getJobs from '../../requests/getJobs';

const CreateJobModal = (props) => {
  const { openCreateJobModal, setOpenCreateJobModal } = props

  const [name, setName] = useState()

  const [description, setDescription] = useState()

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const setJobsList = useUserSessionStore(state => state.setJobsList)

  const handleSubmit = (e) => {
    e.preventDefault()

    let jobsFormData = {
      "name": name,
      "description": description,
      "subsidiarie_id": selectedSubsidiarie.value
    }

    postJob(jobsFormData)
      .then((response) => {
        if (response.status == 200) {
          getJobs(selectedSubsidiarie.value)
            .then((response) => {
              setJobsList(response.data)
              setOpenCreateJobModal(false)
            })
        }
      })
  }

  return (
    <>
      <Modal
        show={openCreateJobModal}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar vaga</Modal.Title>
        </Modal.Header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Descrição"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Modal.Body>


          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => setOpenCreateJobModal(false)}
            >
              Fechar
            </Button>

            <Button type="submit" variant="success">Criar</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default CreateJobModal