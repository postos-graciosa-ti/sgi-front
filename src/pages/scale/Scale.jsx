import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ReactSelect from 'react-select'
import Nav from "../../components/Nav"
import useUserSessionStore from '../../data/userSession'
import getMonths from '../../requests/getMonths'
import getTurns from '../../requests/getTurns'
import getWorkersByTurnAndSubsidiarie from '../../requests/getWorkersByTurnAndSubsidiarie'
import postScale from '../../requests/postScale'
import api from '../../services/api'

const Scale = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersTurnList, setWorkersTurnList] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [workersList, setWorkersList] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [monthsList, setMonthsList] = useState()

  const [selectedDates, setSelectedDates] = useState()

  const [seeButton, setSeeButton] = useState(false)

  const [selectedMonth, setSelectedMonth] = useState()

  const [scales, setScales] = useState([])

  const [selectedScale, setSelectedScale] = useState()

  useEffect(() => {
    getWorkersTurns()
  }, [])

  useEffect(() => {
    GetWorkersByTurnAndSubsidiarie()

    GetMonths()
  }, [selectedTurn])

  useEffect(() => {
    getWorkerScalesByMonth()
  }, [selectedTurn, selectedWorker, selectedMonth, scales])

  const getWorkersTurns = () => {
    getTurns()
      .then((response) => {
        let workerTurnsData = response.data

        let workersTurnsOptions = []

        workerTurnsData && workerTurnsData.map((turn) => {
          workersTurnsOptions.push({ "label": `${turn.name} - ${turn.time}`, "value": turn.id })
        })

        setWorkersTurnList(workersTurnsOptions)
      })
  }

  const GetWorkersByTurnAndSubsidiarie = () => {
    getWorkersByTurnAndSubsidiarie(selectedTurn, selectedSubsdiarie.value)
      .then((response) => {
        let workersData = response.data

        let workersDataOptions = []

        workersData && workersData.map((worker) => {
          workersDataOptions.push({ "label": worker.name, "value": worker.id })
        })

        setWorkersList(workersDataOptions)
      })
  }

  const GetMonths = () => {
    getMonths()
      .then((response) => {
        let monthsData = response.data

        let monthsDataOptions = []

        monthsData && monthsData.map((month) => {
          monthsDataOptions.push({ "label": month.name, "value": month.id })
        })

        setMonthsList(monthsDataOptions)
      })
  }

  const handleOnChangeDates = (value) => {
    setSeeButton(true)

    setSelectedDates((prevState) => {
      return (
        prevState ? [...prevState, moment(value).format("DD-MM-YYYY")]
          : [moment(value).format("DD-MM-YYYY")]
      )
    })
  }

  const getWorkerScalesByMonth = () => {
    api
      .get(`/scale/worker/${selectedWorker}/month/${selectedMonth}`)
      .then((response) => {
        let options = []

        let scales = eval(response.data.date)

        scales.map((scale) => {
          options.push(scale)
        })

        setScales(options)

        setSelectedScale(response.data.id)
      })
      .catch((error) => console.error(error))
  }

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const day = moment(date).format("DD-MM-YYYY")

      return scales.some(scale => scale === day) ? 'highlight' : null
    }

    return null
  }

  const handleSaveDates = () => {
    let dates = selectedDates.map(date => `'${date}'`)

    let postScaleFormData = {
      date: `[${dates}]`,
      worker_id: selectedWorker,
      month_id: selectedMonth
    }

    console.log(postScaleFormData)
    debugger;;

    postScale(postScaleFormData)
      .then((response) => {
        console.log(response)
        debugger;;
      })
  }

  return (
    <>
      <Nav />

      <div className="container">
        {
          seeButton && (
            <>
              <button
                className="btn btn-success mb-3"
                onClick={handleSaveDates}
              >
                Salvar
              </button>
            </>
          )
        }

        <div className="row mb-3">
          <div className="col">
            <ReactSelect
              className="disable"
              placeholder="Filial"
              value={{ "value": selectedSubsdiarie.value, "label": selectedSubsdiarie.label }}
            />
          </div>

          <div className="col">
            <ReactSelect
              placeholder="Turnos"
              options={workersTurnList}
              onChange={(e) => {
                setScales([])
                setSelectedTurn(e.value)
              }}
            />
          </div>

          <div className="col">
            <ReactSelect
              placeholder="Colaborador"
              options={workersList}
              onChange={(e) => {
                setScales([])
                setSelectedWorker(e.value)
              }}
            />
          </div>

          <div className="col">
            <ReactSelect
              placeholder="Mês"
              options={monthsList}
              onChange={(e) => {
                setScales([])
                setSelectedMonth(e.value)
              }}
            />
          </div>
        </div>

        <Calendar
          value={selectedDates}
          onChange={(value) => handleOnChangeDates(value)}
          className="w-100"
          tileClassName={tileClassName}
        />
      </div >

      <style>
        {`
          .highlight {
            background-color: #ECFFDC;
            color: grey;
            // border-radius: 50%;
          }
        `}
      </style>

    </>
  )
}

export default Scale
