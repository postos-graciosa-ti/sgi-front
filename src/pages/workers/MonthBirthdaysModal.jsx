import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useUserSessionStore from "../../data/userSession";
import api from "../../services/api";

const MonthBirthdaysModal = (props) => {
  const { monthBirthdaysModalOpen, setMonthBirthdaysModalOpen } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [monthBirthdayList, setMonthBirthdayList] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/another-route-yet`)
      .then((response) => {
        setMonthBirthdayList(response.data)
      })
  }, [monthBirthdaysModalOpen])

  const handleClose = () => {
    setMonthBirthdaysModalOpen(false)
  }

  return (
    <>
      <Modal
        show={monthBirthdaysModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Aniversariantes do mês</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {
            monthBirthdayList?.map((data) => (
              <div className="alert alert-primary" key={data.worker_id}>
                {data.name} ({dayjs(data.birthdate).format("DD-MM-YYYY")})
              </div>
            ))
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MonthBirthdaysModal