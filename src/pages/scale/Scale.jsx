import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ReactSelect from 'react-select'
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from '../../data/userSession'
import getSundays from "../../functions/getSundays"
import getWeek from "../../functions/getWeek"
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
import postScaleCreate from "../../requests/postScaleCreate"
import postValidateSundays from '../../requests/postValidateSundays'
import postValidateWeekdays from '../../requests/postValidateWeekdays'
import api from '../../services/api'

const Scale = () => {
  const firstDayOfMonth = moment().startOf('month').toDate()

  const lastDayOfMonth = moment().endOf('month').toDate()

  let timedata = {
    "month": moment().month() + 1,
    "year": moment().year()
  }

  const [selectedDays, setSelectedDays] = useState([])

  const [selectedDate, setSelectedDate] = useState(null)

  const selectedSubsdiarie = useUserSessionStore((state) => state.selectedSubsdiarie)

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedWorkers, setSelectedWorkers] = useState('[]')

  useEffect(() => {
    api
      .post("/generate-day-off", timedata)
      .then((response) => {
        setSelectedDays(response.data.folgas_regulares)
      })
      .catch((error) => console.error(error))

    getWorkersBySubsidiarie(selectedSubsdiarie.value)
      .then((response) => {
        let workersData = response.data

        let options = []

        workersData && workersData.map((worker) => {
          options.push({ "label": worker.name, "value": worker.id })
        })

        setWorkersOptions(options)
      })
  }, [])

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate()

      return selectedDays.includes(day) ? 'highlight' : null
    }

    return null
  }

  const onChange = (newDate) => {
    setSelectedDate(newDate)
  }

  const [test, setTest] = useState(true)

  const handleSubmitScale = (e) => {
    e.preventDefault()

    let weekdays = `${getWeek(selectedDate)}`.replace(/(\d{4}-\d{2}-\d{2})/g, '"$1"')

    let sundays = `${getSundays(selectedDate)}`.replace(/(\d{4}-\d{2}-\d{2})/g, '"$1"')

    let workersIds = selectedWorkers.map(worker => worker.value).join(',')

    let formData = {
      "date": `${moment(selectedDate).format("YYYY-MM-DD")}`,
      "workers_ids": `[${workersIds}]`,
      "subsidiarie_id": selectedSubsdiarie.value,
      "days_of_week": weekdays,
      "sundays": sundays
    }

    postValidateWeekdays(selectedDate, workersIds, selectedSubsdiarie, weekdays)
      .then((response) => {
        if (response.data.success == true) {
          postValidateSundays(selectedDate, workersIds, selectedSubsdiarie, weekdays)
            .then((response) => {
              if (response.data.success == true) {
                postScaleCreate(formData)
                  .then((response) => console.log(response))
              } else {
                Swal.fire({
                  title: "Erro ao planejar folgas de domingo",
                  text: `${response.data.message}`,
                  icon: "error"
                })
                throw new Error("Erro ao planejar folgas de domingo")
              }
            })
        } else {
          Swal.fire({
            title: "Erro ao planejar folgas da semana",
            text: `${response.data.message}`,
            icon: "error"
          })
          throw new Error("Erro ao planejar folgas da semana")
        }
      })
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
              <form onSubmit={(e) => handleSubmitScale(e)}>
                <div>
                  <b>
                    {selectedDate && moment(selectedDate.toDateString()).format("DD/MM/YYYY")}
                  </b>

                  <ReactSelect
                    className="mt-2 mb-3"
                    placeholder="Colaboradores"
                    options={workersOptions}
                    isMulti
                    onChange={(e) => setSelectedWorkers(e)}
                  />

                  <button type="submit" className="btn btn-sm btn-primary">
                    Cadastrar escala
                  </button>
                </div>
              </form>
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

export default Scale