import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Question } from 'react-bootstrap-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ReactSelect from 'react-select'
import Nav from "../../components/Nav"
import useUserSessionStore from '../../data/userSession'
import getMonths from '../../requests/getMonths'
import getTurns from '../../requests/getTurns'
import getWorkersByTurnAndSubsidiarie from '../../requests/getWorkersByTurnAndSubsidiarie'
import postScale from '../../requests/postScale'
import putScale from '../../requests/putScale'
import api from '../../services/api'

const Scale = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [allScales, setAllScales] = useState()

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

  const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(new Date(2024, 11, 1))

  const [lastDayCurrentMonth, setLastDayCurrentMonth] = useState(new Date(2024, 11, 31))

  useEffect(() => {
    getAllScales()

    getWorkersTurns()
  }, [])

  useEffect(() => {
    GetWorkersByTurnAndSubsidiarie()

    GetMonths()
  }, [selectedTurn])

  useEffect(() => {
    if (selectedTurn && selectedWorker && selectedMonth && scales) {
      getWorkerScalesByMonth()
    }
  }, [selectedMonth])

  useEffect(() => {
    console.log("teste")

    console.log(selectedMonth)

    setFirstDayCurrentMonth(new Date(2024, selectedMonth - 1, 1))

    setLastDayCurrentMonth(new Date(2024, selectedMonth, 0))
  }, [selectedMonth])

  const getAllScales = () => {
    api
      .get('/scales')
      .then((response) => {
        response.data && response.data.map((scale) => {
          console.log(JSON.parse(scale.scale.date.replace(/'/g, '"')))
        })

        setAllScales(response.data)
      })
  }

  const getWorkersTurns = () => {
    getTurns()
      .then((response) => {
        let workerTurnsData = response.data

        let workersTurnsOptions = []

        workerTurnsData && workerTurnsData.map((turn) => {
          workersTurnsOptions.push({ "label": turn.name, "value": turn.id })
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
    let needPutMethod = scales.length > 0 && true || false

    if (needPutMethod) {
      let dates = [...scales, ...selectedDates]

      let formData = {
        date: `[${dates.map(date => `'${date}'`).join(',')}]`,
        worker_id: selectedWorker,
        month_id: selectedMonth
      }

      putScale(selectedScale, formData)
        .then(() => {
          getWorkerScalesByMonth()

          setSeeButton(false)
        })

    } else {
      let formData = {
        date: `[${selectedDates.map(date => `'${date}'`).join(',')}]`,
        worker_id: selectedWorker,
        month_id: selectedMonth
      }

      postScale(formData)
        .then(() => {
          getWorkerScalesByMonth()

          setSeeButton(false)
        })
    }
  }

  const [turnWorkersOnTrack, setTurnWorkersOnTrack] = useState([])

  const [workersOnTrack, setWorkersOnTrack] = useState([])

  const handleFindWorkersOnTrack = () => {
    console.log("teste")

    api
      .get(`/workers/on-track/turn/${turnWorkersOnTrack}/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        console.log(response.data)

        setWorkersOnTrack(response.data)
      })
  }

  // useEffect(() => {
  //   api
  //     .get(`/workers/on-track/turn/${turnWorkersOnTrack}/subsidiarie/${selectedSubsdiarie.value}`)
  //     .then((response) => {
  //       console.log(response.data)

  //       setWorkersOnTrack(response.data)
  //     })

  // }, [turnWorkersOnTrack])

  return (
    <>
      <Nav />

      <div className="container">
        <button className="btn btn-warning mb-3 me-2">
          <Question />
        </button>

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

        <div className="row">
          <div className="col">
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
              className="w-100 rounded-3"
              tileClassName={tileClassName}
              minDate={firstDayCurrentMonth}
              maxDate={lastDayCurrentMonth}
            />

            <div className="mt-3">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Colaborador</th>
                      <th>Folgas</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allScales && allScales.map((scale, index) => (
                      <tr key={index}>
                        <td>{scale.month.name}</td>
                        <td>{scale.worker.name}</td>
                        <td>
                          <div className="badge-container">
                            {scale.scale.date && JSON.parse(scale.scale.date.replace(/'/g, '"')).map((date, dateIndex) => (
                              <>
                                <span key={dateIndex} className="badge text-bg-primary">
                                  {date}&nbsp;
                                </span>
                              </>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div >

          <div className="col">
            <h4 className="mb-4">Funcionários na pista neste turno</h4>

            <div className="row">
              <div className="col">
                <div>
                  <ReactSelect
                    placeholder="Turno"
                    options={workersTurnList}
                    onChange={(e) => {
                      setTurnWorkersOnTrack(e.value)
                    }}
                  />
                </div>

                <div className="table-responsive mt-3">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Nome do colaborador</th>

                        <th>Função</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        workersOnTrack?.map((onTrack) => (
                          <tr>
                            <td>{onTrack.worker_name}</td>

                            <td>{onTrack.function_name}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                {/* {
                  workersOnTrack?.map((onTrack) => (
                    <>
                      {
                        onTrack.worker_name
                      }
                    </>
                  ))
                } */}

                {/* {
                  workersOnTrack && workersOnTrack.map((worker, index) => (
                    <div key={index}>
                      <p>{worker.worker.name}</p>
                    </div>
                  ))
                } */}
              </div>

              <div className="col">
                <button className="btn btn-success" onClick={handleFindWorkersOnTrack}>
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
