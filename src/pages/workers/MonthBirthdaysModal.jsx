import dayjs from "dayjs";
import printJS from 'print-js';
import { useEffect, useState } from "react";
import { Printer } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOMServer from 'react-dom/server';
import useUserSessionStore from "../../data/userSession";
import api from "../../services/api";

export const MonthBirthdaysPrintContent = ({ monthBirthdayList, selectedSubsidiarie }) => {
  return (
    <>
      <h4>
        {selectedSubsidiarie?.label} - Aniversariantes do mês {dayjs().format("MM")}
      </h4>

      {
        monthBirthdayList && monthBirthdayList.map((data) => (
          <div>{data.name} ({dayjs(data.birthdate).format("DD/MM/YYYY")})</div>
        ))
      }
    </>
  )
}

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

  const handlePrint = () => {
    const printableContent = ReactDOMServer.renderToString(
      <MonthBirthdaysPrintContent
        monthBirthdayList={monthBirthdayList}
        selectedSubsidiarie={selectedSubsidiarie}
      />
    )

    printJS({
      printable: printableContent,
      type: 'raw-html',
      header: null
    })
  }

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
            monthBirthdayList && (
              <>
                <button className="btn btn-light" onClick={handlePrint}>
                  <Printer />
                </button>

                {
                  monthBirthdayList?.map((data) => (
                    <div className="alert alert-primary" key={data.worker_id}>
                      {data.name} ({dayjs(data.birthdate).format("DD-MM-YYYY")})
                    </div>
                  ))
                }
              </>
            )
          }
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>Entendido</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MonthBirthdaysModal