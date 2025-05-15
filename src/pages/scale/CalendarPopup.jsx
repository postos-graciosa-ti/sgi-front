import moment from 'moment';
import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Dash, InfoCircle, Plus } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useUserSessionStore from '../../data/userSession';
import api from '../../services/api';

const CalendarPopup = (props) => {
  const {
    calendarPopupOpen,
    setCalendarPopupOpen,
    handleOnclickDay,
    selectedDate,
    daysOff,
    selectedWorker,
    setScalesList,
    setDaysOff,
    hollidays,
  } = props

  let isHolliday = hollidays?.find((holiday) => holiday.date == moment(selectedDate).format("YYYY-MM-DD"))

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [dateEventList, setDateEventList] = useState()

  const [dateEvent, setDateEvent] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsidiarie?.value}/dates/${moment(selectedDate).format("YYYY-MM-DD")}/dates-events`)
      .then((response) => setDateEventList(response.data))

  }, [calendarPopupOpen])

  const handleAddDateEvent = () => {
    let formData = {
      event_name: dateEvent,
      date: moment(selectedDate).format("YYYY-MM-DD")
    }

    api
      .post(`/subsidiaries/${selectedSubsidiarie?.value}/dates-events`, formData)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/dates/${moment(selectedDate).format("YYYY-MM-DD")}/dates-events`)
          .then((response) => setDateEventList(response.data))
      })
  }

  const handleDeleteDateEvent = (event) => {
    api
      .delete(`/subsidiaries/${selectedSubsidiarie?.value}/dates-events/${event.id}`)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/dates/${moment(selectedDate).format("YYYY-MM-DD")}/dates-events`)
          .then((response) => setDateEventList(response.data))
      })
  }

  return (
    <Modal
      show={calendarPopupOpen}
      onHide={() => setCalendarPopupOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {
            isHolliday && (
              <>
                {moment(selectedDate).format("DD-MM-YYYY")} ({isHolliday?.name})
              </>
            ) || (
              <>
                Adicionar {moment(selectedDate).format("DD-MM-YYYY")} como folga?
              </>
            )
          }
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          dateEventList && dateEventList.map((event) => (
            <div key={event.id} className="row mb-3">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  value={event.event_name}
                  disabled
                />
              </div>

              <div className="col-2">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteDateEvent(event)}
                >
                  <Dash />
                </button>
              </div>
            </div>
          ))
        }

        <div className="row">
          <div className="col-10">
            <input
              type="text"
              placeholder="Deseja adicionar um evento? (opcional)"
              className="form-control"
              onChange={(e) => setDateEvent(e.target.value)}
            />
          </div>

          <div className="col-2">
            <button
              className="btn btn-warning"
              onClick={handleAddDateEvent}
            >
              <Plus />
            </button>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {
          isHolliday && (
            <>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="info-tooltip">
                    Lembre-se, em feriados ({isHolliday?.name}) o colaborador recebe <strong>100%</strong>.
                  </Tooltip>
                }
              >
                <span className="ms-2 d-inline-flex align-items-center">
                  <InfoCircle size={20} style={{ cursor: "pointer" }} />
                </span>
              </OverlayTrigger>
            </>
          )
        }

        {
          !isHolliday && (
            <>
              <Button variant="light" onClick={() => setCalendarPopupOpen(false)}>Fechar</Button>

              <Button variant="success" onClick={() => handleOnclickDay(selectedDate)}>Adicionar</Button>
            </>
          ) || <></>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default CalendarPopup
