import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'

const HollidaysModal = (props) => {
  const { hollidaysModalOpen, setHollidaysModalOpen} = props

  const [hollidays, setHollidays] = useState()

  const [holidayMessage, setHolidayMessage] = useState('')

  useEffect(() => {
    const currentDate = new Date()

    const currentMonth = currentDate.getMonth() + 1

    const currentYear = currentDate.getFullYear()

    axios
      .get(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`)
      .then(response => {
        let datesArr = [
          {
            "date": `${currentYear}-09-03`,
            "name": "Aniversário de Joinville",
            "type": "municipal"
          },
          ...response.data
        ].sort((a, b) => new Date(a.date) - new Date(b.date))

        setHollidays(datesArr)

        const holidaysInMonth = response.data.filter(holiday => {
          const holidayMonth = new Date(holiday.date).getMonth() + 1

          return holidayMonth === currentMonth
        })

        if (holidaysInMonth.length > 0) {
          const holidayList = holidaysInMonth.map(holiday => `${holiday.date} - ${holiday.name}`).join('\n')

          setHolidayMessage(`Feriados em ${currentDate.toLocaleString('default', { month: 'long' })} de ${currentYear}:\n${holidayList}`)
        } else {
          setHolidayMessage(`Não há feriados em ${currentDate.toLocaleString('default', { month: 'long' })} de ${currentYear}.`)
        }
      })
      .catch(error => {
        setHolidayMessage('Erro ao buscar feriados.')

        console.error('Error fetching holidays:', error)
      })

  }, [])

  const handleClose = () => {
    setHollidaysModalOpen(false)
  }

  return (
    <Modal
      show={hollidaysModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Feriados nacionais</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant={"warning"}>
          <b>{holidayMessage}</b>
        </Alert>

        <ListGroup>
          {
            hollidays?.map((holliday, i) => (
              <ListGroup.Item key={i}>
                <b>{moment(holliday.date).format("DD-MM-YYYY")}</b>: <i>{holliday.name}</i>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HollidaysModal
