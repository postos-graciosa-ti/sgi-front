import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';
import useUserSessionStore from '../../data/userSession';
import moment from 'moment';

const NrModal = (props) => {
  const { nrModalOpen, setNrModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [nrList, setNrList] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/get-nr20-list`)
      .then((response) => setNrList(response.data))

  }, [nrModalOpen])

  const handleClose = () => {
    setNrModalOpen(false)
  }

  return (
    <Modal
      show={nrModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Colaboradores que precisam fazer NR 20</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Matrícula</th>

                <th>Nome</th>
              </tr>
            </thead>

            <tbody>
              {
                nrList?.nr_list.map((worker) => (
                  <tr>
                    <td>{worker.enrolment}</td>

                    <td>{worker.name}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div>
          <span>
            <i>*Filtrando admitidos entre {moment(nrList?.first_day).format("DD-MM-YYYY")} e {moment(nrList?.last_day).format("DD-MM-YYYY")}</i>
          </span>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NrModal