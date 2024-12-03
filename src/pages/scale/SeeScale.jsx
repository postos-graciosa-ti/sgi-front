import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Nav from "../../components/Nav"
import api from '../../services/api'

const SeeScale = () => {
  const firstDayOfMonth = moment().startOf('month').toDate()

  const lastDayOfMonth = moment().endOf('month').toDate()

  let timedata = {
    "month": moment().month() + 1,
    "year": moment().year()
  }

  const [selectedDays, setSelectedDays] = useState([])

  const [selectedDate, setSelectedDate] = useState(null)

  const [workers, setWorkers] = useState()

  useEffect(() => {
    api
      .post("/generate-day-off", timedata)
      .then((response) => {
        setSelectedDays(response.data.folgas_regulares)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    api
      .get(`/scale/${moment(selectedDate).format("YYYY-MM-DD")}`)
      .then((response) => {
        let scaleData = response.data

        let test = `[${scaleData.workers_ids}]`

        api
          .post("/workers-in-array", {
            "arr": test
          })
          .then((response) => setWorkers(response.data))
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

  return (
    <>
      <Nav />

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <b>
                Selecione uma das datas destacadas
              </b>
            </div>

            <Calendar
              onChange={onChange}
              value={selectedDate}
              tileClassName={tileClassName}
              minDate={firstDayOfMonth}
              maxDate={lastDayOfMonth}
            />
          </div>

          <div className="col">
            {
              selectedDate && (
                <>
                  <div>
                    <b>
                      {moment(selectedDate).format("DD-MM-YYYY")}
                    </b>
                  </div>

                  {workers && workers.map((worker) => (
                    <div>
                      {worker.name}
                    </div>
                  ))}
                </>
              )
            }
          </div>
        </div>

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