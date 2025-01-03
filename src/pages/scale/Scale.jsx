import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ExclamationTriangle, Printer, Question, Trash } from 'react-bootstrap-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ReactDOMServer from 'react-dom/server'
import ReactSelect from 'react-select'
import Nav from "../../components/Nav"
import useDaysOffStore from '../../data/daysOffStore'
import useUserSessionStore from '../../data/userSession'
import mountTour from '../../functions/mountTour'
import api from '../../services/api'
import CalendarPopup from './CalendarPopup'

const printContent = (scalesList) => {
  const currentDate = new Date()

  const currentMonth = currentDate.getMonth()

  return (
    <div>
      <h3>Escala de Colaboradores — {moment().format('MM/YYYY')}</h3>

      <table>
        <thead>
          <tr>
            <th>Colaborador</th>

            <th>Folga</th>

            <th>Assinatura</th>
          </tr>
        </thead>

        <tbody>
          {
            scalesList && scalesList.map((scale) => (
              <tr key={scale.worker.id}>
                <td>{scale.worker.name}</td>

                <td>
                  <div className="badge-container">
                    {scale.days_off?.map((dayOff, index) => (

                      <div key={index} className="badge text-bg-success">
                        {dayOff.date} (
                        {
                          dayOff.weekday === "Monday" ? "Segunda-Feira" :
                            dayOff.weekday === "Tuesday" ? "Terça-Feira" :
                              dayOff.weekday === "Wednesday" ? "Quarta-Feira" :
                                dayOff.weekday === "Thursday" ? "Quinta-Feira" :
                                  dayOff.weekday === "Friday" ? "Sexta-Feira" :
                                    dayOff.weekday === "Saturday" ? "Sábado" :
                                      dayOff.weekday === "Sunday" ? "Domingo" :
                                        ""
                        })
                      </div>
                    ))}
                  </div>
                </td>

                <td></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


const Scales = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const daysOffStore = useDaysOffStore(state => state.daysOff)

  const resetDaysOff = useDaysOffStore(state => state.resetDaysOff)

  const [calendarPopupOpen, setCalendarPopupOpen] = useState(false)

  const [scalesList, setScalesList] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedWorkerId, setSelectedWorkerId] = useState(null)

  const [existentWorkerDaysOff, setExistentWorkerDaysOff] = useState([])

  const [selectedDate, setSelectedDate] = useState()

  let firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  let allDaysOff = [...existentWorkerDaysOff, ...daysOffStore].sort() || []

  useEffect(() => {
    getWorkersBySubsidiarie()

    getScalesBySubsidiarie()
  }, [])

  const getWorkersBySubsidiarie = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        console.log(response)

        let workersData = response.data

        let workersOptions = []

        workersData && workersData.map((worker) => {
          workersOptions.push({ "label": `${worker.worker_name} - ${worker.turn_name} (${worker.turn_start_time} - ${worker.turn_end_time}) - ${worker.function_name}`, "value": worker.worker_id })
        })

        setWorkersOptions(workersOptions)
      })
  }

  const getScalesBySubsidiarie = () => {
    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
      .then((response) => setScalesList(response.data))
      .catch((error) => console.error(error))
  }

  const handleSaveDaysOff = () => {
    let formData = {
      "worker_id": selectedWorkerId,
      "subsidiarie_id": selectedSubsdiarie.value,
      "days_off": `[${allDaysOff.map(dia => `'${dia}'`).join(',')}]`,
      "first_day": moment(firstDay).format("DD-MM-YYYY"),
      "last_day": moment(lastDay).format("DD-MM-YYYY")
    }

    api
      .post("/scales", formData)
      .then((response) => {
        getScalesBySubsidiarie()

        resetDaysOff()

        setExistentWorkerDaysOff(response.data)
      })
      .catch((error) => console.error(error))
  }

  const titleClassName = ({ date, view }) => {
    if (view === 'month') {
      const day = moment(date).format("DD-MM-YYYY")

      const isDayOff = allDaysOff.some(diaFolga => diaFolga === day)

      const isDayOffExistentWorker = existentWorkerDaysOff.some(diaFolga => diaFolga === day)

      return isDayOff ? 'highlight' : isDayOffExistentWorker ? 'highlight' : null
    }

    return null
  }

  const handleDeleteScale = (scaleId) => {
    api
      .delete(`/scales/${scaleId}/subsidiaries/${selectedSubsdiarie.value}`)
      .then(() => {
        getScalesBySubsidiarie()

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${selectedWorkerId}`)
          .then((response) => {
            setExistentWorkerDaysOff(response.data)
          })
      })
  }

  const setTour = () => {
    let route = location.pathname

    let driverObj = mountTour(route)

    driverObj.drive()
  }

  const findExistentWorkerDaysOff = () => {
    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${selectedWorkerId}`)
      .then((response) => {
        setExistentWorkerDaysOff(response.data)
      })
  }

  const handleOnChangeWorker = (e) => {
    resetDaysOff()

    setExistentWorkerDaysOff([])

    setSelectedWorkerId(e.value)

    api
      .get(`scales/subsidiaries/${selectedSubsdiarie.value}/workers/${e.value}`)
      .then((response) => {
        let existentScales = response.data

        let existentDaysOff = []

        {
          existentScales && existentScales.map((scale) => {
            existentDaysOff.push(scale.date)
          })
        }

        setExistentWorkerDaysOff(existentDaysOff)
      })
  }

  const handlePrintScale = () => {
    const content = ReactDOMServer.renderToString(printContent(scalesList))

    const printWindow = window.open('', '_blank')

    printWindow.document.write(`
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Escala de Colaboradores</title>
          <style>
            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
            }
            th, td {
              padding: 5px;
              text-align: left;
              vertical-align: top;
            }
            td div {
              margin-bottom: 10px; /* Espaçamento entre os dias de folga */
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `)

    printWindow.document.close()

    printWindow.print()
  }

  const handleOnChangeCalendar = (value) => {
    setSelectedDate(value)

    setCalendarPopupOpen(true)
  }

  console.log(scalesList)

  return (
    <>
      <Nav />

      <div className="container">
        {/* <div className="row">
          <div className="col-6">
            <div className="mb-2">
              <b>Data de início de planejamento</b>
            </div>

            <input type="date" className="form-control" onChange={e => setFirstDay(e.target.value)} />
          </div>

          <div className="col-6">
            <div className="mb-2">
              <b>Data final de planejamento</b>
            </div>

            <input type="date" className="form-control" onChange={e => setLastDay(e.target.value)} />
          </div>
        </div> */}

        <div className="row mt-3">
          <div className="col-12">
            <ReactSelect
              id="workers-select"
              placeholder="Colaboradores"
              options={workersOptions}
              onChange={(e) => {
                handleOnChangeWorker(e)
              }}
            />
          </div>
        </div>

        <div id="scale-calendar">
          <Calendar
            tileClassName={titleClassName}
            className="w-100 rounded-3 mt-3"
            onChange={value => handleOnChangeCalendar(value)}
            showNeighboringMonth={false}
          />
        </div>

        <button id="help" className="btn btn-warning mt-3 me-2" onClick={setTour}><Question /></button>

        <button id="print-scale" className="btn btn-light mt-3 me-2" onClick={handlePrintScale}><Printer /></button>

        <button id="save-scale" className="btn btn-success mt-3" onClick={handleSaveDaysOff}>Salvar</button>

        <div className="table-responsive mt-3">
          <table id="scale-table" className="table table-hover text-center">
            <thead>
              <tr>
                <th>Colaborador</th>
                <th>Trabalho</th>
                <th>Folga</th>
                <th>Proporção</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {scalesList?.map((scale) => (
                <tr key={scale.id}>
                  <td>{scale.worker.name}</td>

                  <td>
                    <div className="badge-container">
                      {scale.days_on?.map((dayOn, index) => (
                        dayOn.date && dayOn.weekday ? (
                          <span key={index} className="badge text-bg-success">
                            {dayOn.date} (
                            {
                              dayOn.weekday === "Monday" ? "segunda-feira" :
                                dayOn.weekday === "Tuesday" ? "terça-feira" :
                                  dayOn.weekday === "Wednesday" ? "quarta-feira" :
                                    dayOn.weekday === "Thursday" ? "quinta-feira" :
                                      dayOn.weekday === "Friday" ? "sexta-feira" :
                                        dayOn.weekday === "Saturday" ? "sábado" :
                                          dayOn.weekday === "Sunday" ? "domingo" :
                                            ""
                            })
                          </span>
                        ) : null
                      ))}
                    </div>
                  </td>



                  <td>
                    <div className="badge-container">
                      {scale.days_off?.map((dayOff, index) => (
                        <span key={index} className="badge text-bg-success">
                          {dayOff.date} (
                          {
                            dayOff.weekday === "Monday" ? "Segunda-Feira" :
                              dayOff.weekday === "Tuesday" ? "Terça-Feira" :
                                dayOff.weekday === "Wednesday" ? "Quarta-Feira" :
                                  dayOff.weekday === "Thursday" ? "Quinta-Feira" :
                                    dayOff.weekday === "Friday" ? "Sexta-Feira" :
                                      dayOff.weekday === "Saturday" ? "Sábado" :
                                        dayOff.weekday === "Sunday" ? "Domingo" :
                                          ""
                          })
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="badge-container">
                      {JSON.parse(scale.proportion).map((item) => (
                        <div key={item.data}>
                          <span className="badge text-bg-primary">
                            {item.data} (
                            {
                              item.weekday === "Monday" ? "Segunda-Feira" :
                                item.weekday === "Tuesday" ? "Terça-Feira" :
                                  item.weekday === "Wednesday" ? "Quarta-Feira" :
                                    item.weekday === "Thursday" ? "Quinta-Feira" :
                                      item.weekday === "Friday" ? "Sexta-Feira" :
                                        item.weekday === "Saturday" ? "Sábado" :
                                          item.weekday === "Sunday" ? "Domingo" :
                                            ""
                            }
                            ): {item.proporcao}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>


                  <td>
                    <div className="d-inline-flex">
                      <button
                        id="delete-scale"
                        className="btn btn-danger mt-2 me-2"
                        onClick={() => handleDeleteScale(scale.id)}
                      >
                        <Trash />
                      </button>

                      {scale.need_alert === true && (
                        <button
                          id="alert-scale"
                          title="Alerta de usuário com mais de 8 dias consecutivos"
                          className="btn btn-warning mt-2 me-2"
                        >
                          <ExclamationTriangle />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CalendarPopup
        calendarPopupOpen={calendarPopupOpen}
        setCalendarPopupOpen={setCalendarPopupOpen}
        selectedDate={selectedDate}
        existentWorkerDaysOff={existentWorkerDaysOff}
        setExistentWorkerDaysOff={setExistentWorkerDaysOff}
        findExistentWorkerDaysOff={findExistentWorkerDaysOff}
        selectedWorkerId={selectedWorkerId}
        getScalesBySubsidiarie={getScalesBySubsidiarie}
        setScalesList={setScalesList}
        allDaysOff={allDaysOff}
        handleSaveDaysOff={handleSaveDaysOff}
      />

      <style>
        {`
          .highlight {
            background-color: #ECFFDC;
            color: grey;
            // border-radius: 50%;
          }

          // .badge-container {
          //   display: flex;
          //   flex-wrap: wrap;
          //   justify-content: center; /* Centraliza as badges na linha */
          // }

          // .badge {
          //   margin: 5px; /* Ajuste o espaço entre as badges */
          //   width: calc(33.33% - 10px); /* 3 badges por linha, considerando o espaço entre elas */
          //   box-sizing: border-box; /* Garante que o padding e margin não quebrem o layout */
          // }
        `}
      </style>
    </>
  )
}

export default Scales
