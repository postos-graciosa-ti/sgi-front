import moment from 'moment';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

  console.log(isHolliday)

  return (
    <Modal
      show={calendarPopupOpen}
      onHide={() => setCalendarPopupOpen(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adicionar {moment(selectedDate).format("DD-MM-YYYY")} como folga?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Adicionar {moment(selectedDate).format("DD-MM-YYYY")} como folga?
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
