import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pen, QuestionCircle, X } from 'react-bootstrap-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import Nav from "../../components/Nav"
import refactorTomorrow from '../../functions/refactorTomorrow'
import postGenerateDayOff from '../../requests/postGenerateDayOff.js'
import api from '../../services/api'
import AgreedModal from './AgreedModal.jsx'

const SeeScale = () => {
  const navigate = useNavigate()

  const firstDayOfMonth = moment().startOf('month').toDate()

  const lastDayOfMonth = moment().endOf('month').toDate()

  let timedata = {
    "month": moment().month() + 1,
    "year": moment().year()
  }

  const [selectedDays, setSelectedDays] = useState([])

  const [selectedDate, setSelectedDate] = useState(null)

  const [workers, setWorkers] = useState()

  const [agreedModalOpen, setAgreedModalOpen] = useState(false)

  const [selectedWorker, setSelectedWorker] = useState()

  const [selectedScale, setSelectedScale] = useState()

  useEffect(() => {
    postGenerateDayOff(timedata)
      .then((response) => setSelectedDays(response.data.folgas_regulares))
  }, [])

  useEffect(() => {
    api
      .get(`/scale/${moment(selectedDate).format("YYYY-MM-DD")}`)
      .then((response) => {
        let scaleData = response.data

        setSelectedScale(response.data)

        // let test = `[${scaleData.workers_ids}]`

        api
          .post("/workers-in-array", {
            "arr": scaleData.workers_ids
          })
          .then((response) => {
            console.log(response.data)
            setWorkers(response.data)
          })
      })
      .catch((error) => console.error(error))

  }, [selectedDate])

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate()

      return selectedDays.includes(day) ? 'highlight' : null
    }

    return null
  }

  const onChange = (newDate) => {
    setWorkers([])
    setSelectedDate(newDate)
  }

  const handleDeleteScale = (worker) => {
    api
      .delete(`/scales/${moment(selectedDate).format("YYYY-MM-DD")}/${worker.id}`)
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className='mb-3'>
          <button
            id="seeScale"
            className="btn btn-primary"
            onClick={() => navigate('/scale', { replace: true })}
          >
            Planejamento de folgas
          </button>

          <button
            id="help"
            className="btn btn-warning ms-2"
            onClick={() => refactorTomorrow.drive()}
          >
            <QuestionCircle />
          </button>
        </div>

        <div className="mb-3">
          <h4>Escala de folgas</h4>
          <span>Selecione uma data no calendário e verá ao lado os colaboradores que vão folgar nesse dia</span>
        </div>

        <div className="row">
          <div className="col">
            <div id="calendar">
              <Calendar
                onChange={onChange}
                value={selectedDate}
                tileClassName={tileClassName}
                minDate={firstDayOfMonth}
                maxDate={lastDayOfMonth}
              />
            </div>
          </div>

          <div className="col">
            {
              selectedDate && (
                <div id="workers">
                  <div>
                    <b>
                      {moment(selectedDate).format("DD-MM-YYYY")}
                    </b>
                  </div>

                  {workers && workers.map((worker) => (
                    <div key={worker.id}>
                      {
                        !worker.agreed ? (
                          <button
                            type="button"
                            className="btn btn-warning me-2"
                            onClick={() => {
                              setSelectedWorker(worker)
                              setAgreedModalOpen(true)
                            }}
                          >
                            <Pen />
                          </button>
                        ) : ""
                      }

                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={() => handleDeleteScale(worker)}
                      >
                        <X />
                      </button>

                      {worker.name}
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

        <AgreedModal
          selectedScale={selectedScale}
          selectedWorker={selectedWorker}
          selectedDate={moment(selectedDate).format("YYYY-MM-DD")}
          agreedModalOpen={agreedModalOpen}
          setAgreedModalOpen={setAgreedModalOpen}
          workers={workers}
          setWorkers={setWorkers}
        />

        <style>
          {`
          .highlight {
            background-color: #ffff76;
            color: grey;
            // border-radius: 50%;
          }
        `}
        </style>
      </div>
    </>
  )
}

export default SeeScale