import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ReactSelect from 'react-select'
import Nav from "../../components/Nav"
import useUserSessionStore from '../../data/userSession'
import getWorkersBySubsidiarie from '../../requests/getWorkersBySubsidiarie'
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

  const handleSubmitScale = (e) => {
    e.preventDefault()

    let workersIds = selectedWorkers.map(worker => worker.value).join(',')

    let formData = {
      "date": `${moment(selectedDate).format("YYYY-MM-DD")}`,
      "workers_ids": workersIds,
      "subsidiarie_id": selectedSubsdiarie.value
    }

    console.log(formData)

    api
      .post("/scale", formData)
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
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

        {/* <h4>
          Programação de folga
        </h4>

        <div className="mb-2">
          <b>
            Pré-visualização de dias de folga
          </b>
        </div>

        <Calendar
          onChange={onChange}
          value={selectedDate}
          tileClassName={tileClassName}
        />

        {
          selectedDate && (
            <div className="mt-3">
              <b>
                Programação de folga para: {moment(selectedDate.toDateString()).format("DD/MM/YYYY")}
              </b>

              <ReactSelect />
            </div>
          )
        } */}

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