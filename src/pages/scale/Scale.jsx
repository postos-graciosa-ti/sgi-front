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

const Scale = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersTurnList, setWorkersTurnList] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [workersList, setWorkersList] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [monthsList, setMonthsList] = useState()

  const [selectedDates, setSelectedDates] = useState()

  const [seeButton, setSeeButton] = useState(false)

  useEffect(() => {
    getWorkersTurns()
  }, [])

  useEffect(() => {
    GetWorkersByTurnAndSubsidiarie()

    GetMonths()
  }, [selectedTurn])

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
        prevState ? [...prevState, moment(value).format("YYYY-MM-DD")]
          : [moment(value).format("YYYY-MM-DD")]
      )
    })
  }

  // console.log(selectedDates)

  const handleSaveDates = () => {
    
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
              onChange={(e) => setSelectedTurn(e.value)}
            />
          </div>

          <div className="col">
            <ReactSelect
              placeholder="Colaborador"
              options={workersList}
            />
          </div>

          <div className="col">
            <ReactSelect
              placeholder="Mês"
              options={monthsList}
            />
          </div>
        </div>

        <Calendar
          className="w-100"
          onChange={(value) => handleOnChangeDates(value)}
        />
      </div>
    </>
  )
}

export default Scale