import moment from "moment"
import printJS from "print-js"
import { useEffect, useState } from "react"
import { BuildingCheck, BuildingDash, Check2All, Printer, Trash } from "react-bootstrap-icons"
import Calendar from "react-calendar"
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import mountTour from "../../functions/mountTour"
import CalendarPopup from "../../pages/scale/CalendarPopup"
import api from "../../services/api"
import DaysOffReportModal from "./DaysOffReportModal"
import DaysOnReportModal from "./DaysOnReportModal"
import DeleteScaleModal from "./DeleteScaleModal"
import addDaysOffValidations from "./functions/addDaysOffValidations"
import printContent from "./printContent"
import PrintModal from "./PrintModal"

const Scale = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const [selectedDate, setSelectedDate] = useState()

  const [daysOff, setDaysOff] = useState([])

  const [workersOptions, setWorkersOptions] = useState([])

  const [selectedWorker, setSelectedWorker] = useState()

  const [selectedWorkerInfo, setSelectedWorkerInfo] = useState()

  const [calendarPopupOpen, setCalendarPopupOpen] = useState(false)

  const [scalesList, setScalesList] = useState([])

  const [deleteScaleModalOpen, setDeleteScaleModalOpen] = useState(false)

  const [selectedTemplate, setSelectedTemplate] = useState()

  const [allWorkers, setAllWorkers] = useState([])

  const [scaleHistoryModalOpen, setScaleHistoryModalOpen] = useState(false)

  const [printModalOpen, setPrintModalOpen] = useState(false)

  const userSession = useUserSessionStore((state) => state.userSession)

  const [message, setMessage] = useState()

  const [functionsOptions, setFunctionsOptions] = useState([])
  const [selectedFunction, setSelectedFunction] = useState()

  const [turnsOptions, setTurnsOptions] = useState([])
  const [selectedTurn, setSelectedTurn] = useState()

  const [daysOffModalOpen, setDaysOffModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        setAllWorkers(response.data)

        let workers = response.data

        let workersOptions = []

        workers?.map((worker) => {
          workersOptions.push({ "label": `${worker.worker_name} | ${worker.function_name} | ${worker.turn_start_time} - ${worker.turn_end_time}`, "value": worker.worker_id })
        })

        setWorkersOptions(workersOptions)
      })

    api
      .get("/functions")
      .then((response) => {
        let functions = response.data

        let functionsOptions = []

        functions && functions.map((func) => {
          functionsOptions.push({ "label": func.name, "value": func.id })
        })

        setFunctionsOptions(functionsOptions)
      })

    api
      .get("/turns")
      .then((response) => {
        let turns = response.data

        let turnsOptions = []

        turns && turns.map((turn) => {
          turnsOptions.push({ "label": turn.name, "value": turn.id })
        })

        setTurnsOptions(turnsOptions)
      })

    api
      .get("/scales/day-off/quantity")
      .then((response) => {
        setMessage(`*Quantidade ideal de dias de folga do mês atual (uma por semana): ${response.data}`)
      })

    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
      .then((response) => setScalesList(response.data))

  }, [])

  useEffect(() => {
    if (selectedSubsdiarie && selectedFunction && selectedTurn) {
      api
        .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
        .then((response) => {
          setAllWorkers(response.data)
        })

      api
        .get(`/workers/subsidiaries/${selectedSubsdiarie.value}/functions/${selectedFunction.value}/turns/${selectedTurn.value}`)
        .then((response) => {
          // setAllWorkers(response.data)

          let workers = response.data

          let workersOptions = []

          workers?.map((worker) => {
            workersOptions.push({ "label": worker.name, "value": worker.id })
          })

          setWorkersOptions(workersOptions)
        })
    }

  }, [selectedSubsdiarie, selectedFunction, selectedTurn])

  const handleTitleClassname = ({ date, view }) => {
    if (view == "month") {
      let isDayOff = daysOff.some((dayOff) => dayOff == moment(date).format("DD-MM-YYYY"))

      return isDayOff && 'bg-danger text-white' || null
    }

    return
  }

  const handleOnclickDay = (date) => {
    let validationResult = addDaysOffValidations(scalesList, daysOff, date, selectedWorker, allWorkers)

    if (validationResult.hasError) {
      Swal.fire({
        icon: "error",
        title: "Erro ao selecionar data",
        text: `${validationResult.errorMessage}`
      })

      setCalendarPopupOpen(false)

      return
    }

    setDaysOff((prevState) => {
      if (prevState) {
        return [...prevState, moment(date).format("DD-MM-YYYY")]
      } else {
        return [moment(date).format("DD-MM-YYYY")]
      }
    })

    setCalendarPopupOpen(false)
  }

  const handleSubmitDaysOff = () => {
    setDaysOff(daysOff.sort())

    let formData = {
      "worker_id": selectedWorker.value,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": moment(monthFirstDay).format("DD-MM-YYYY"),
      "last_day": moment(monthLastDay).format("DD-MM-YYYY"),
      "days_off": `[${daysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${daysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "worker_turn_id": selectedWorkerInfo.turn_id,
      "worker_function_id": selectedWorkerInfo.function_id
    }

    api
      .post(`/scales`, formData)
      .then((response) => {
        setCalendarPopupOpen(false)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => setScalesList(response.data))

        api
          .post("/logs/scales", {
            user_id: userSession.id,
            worker_id: selectedWorker.value,
            inserted_at: new Date().toLocaleDateString('pt-BR'),
            at_time: new Date().toLocaleTimeString('pt-BR')
          })
      })
      .catch((error) => {
        // console.error(error.response.data.detail)

        Swal.fire({
          icon: "error",
          title: "Erro",
          text: `${error.response.data.detail}`
        })
      })
  }

  const translateWeekday = (weekday) => {
    const days = {
      Monday: "Segunda-Feira",
      Tuesday: "Terça-Feira",
      Wednesday: "Quarta-Feira",
      Thursday: "Quinta-Feira",
      Friday: "Sexta-Feira",
      Saturday: "Sábado",
      Sunday: "Domingo",
    }

    return days[weekday] || "";
  }

  const setTour = () => {
    let driverObj = mountTour('/scale')

    driverObj.drive()
  }

  const handlePrintScale = async () => {
    const printableContent = `
      <html>
        <head>
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
          ${ReactDOMServer.renderToStaticMarkup(printContent(scalesList))}
        </body>
      </html>
    `

    printJS({
      printable: printableContent,
      type: 'raw-html',
    })
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mb-3">
          <ReactSelect
            id="workers-select"
            placeholder="Colaboradores"
            options={workersOptions}
            onChange={(value) => {
              setDaysOff([])

              setSelectedTemplate([])

              setSelectedWorker(value)

              api
                .get(`/workers/${value.value}`)
                .then((response) => {
                  setSelectedWorkerInfo(response.data)
                })

              api
                .get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${value.value}`)
                .then((response) => {
                  let scales = response.data

                  let options = []

                  scales.days_off?.map((scale) => {
                    options.push(scale.date)
                  })

                  setDaysOff(options)
                })
            }}
          />
        </div>

        <div id="scale-calendar">
          <Calendar
            className="calendar-container w-100 rounded"
            tileClassName={handleTitleClassname}
            showNeighboringMonth={false}
            onClickDay={(value) => {
              setSelectedDate(value)

              let isAlreadyDayOff = daysOff.some((dayOff) => dayOff == moment(value).format("DD-MM-YYYY"))

              if (isAlreadyDayOff) {
                setDeleteScaleModalOpen(true)
              } else {
                setCalendarPopupOpen(true)
              }
            }}
          />

        </div>

        <div>
          <button
            id="print-days"
            className="btn btn-light mt-3 me-3"
            onClick={handlePrintScale}
            title="Botão para impressão"
          >
            <Printer />
          </button>

          <button
            className="btn btn-danger mt-3 me-3"
            title="Relatório de dias de folga"
            onClick={() => setDaysOffModalOpen(true)}
          >
            <BuildingDash />
          </button>

          <button
            className="btn btn-success mt-3 me-3"
            onClick={() => setScaleHistoryModalOpen(true)}
            title="Relatório de dias de trabalho"
          >
            <BuildingCheck />
          </button>

          <button
            id="save-scale"
            className="btn btn-primary mt-3"
            onClick={handleSubmitDaysOff}
            title="Salvar dias de folga"
          >
            <Check2All />
          </button>
        </div>


        <div className="table-responsive mt-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Colaborador</th>

                <th>Trabalho</th>

                <th>Folga</th>

                <th>Proporção</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                scalesList && scalesList.map((scale) => (
                  <tr id="scale-table" key={scale.id}>
                    <td>
                      {scale.worker.name} | {scale.worker.function.name} | {scale.worker.turn.start_time} - {scale.worker.turn.end_time}
                    </td>

                    <td>
                      <div className="badge-container">
                        {scale.days_on?.map((dayOn, index) => (
                          dayOn.date && dayOn.weekday ? (
                            <span key={index} className="badge text-bg-success">
                              {`${dayOn.date} (${translateWeekday(dayOn.weekday)})`}
                            </span>
                          ) : null
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="badge-container">
                        {scale.days_off?.map((dayOff, index) => (
                          <span key={index} className="badge text-bg-danger">
                            {`${dayOff.date} (${translateWeekday(dayOff.weekday)})`}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="text-center">
                      <div className="badge-container">
                        {JSON.parse(scale.proportion).map((item, index) => (
                          <span key={index} className="badge text-bg-primary">
                            {`${item.data} (${translateWeekday(item.weekday)}): ${item.proporcao}`}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="d-inline-flex">
                        <button
                          id="delete-scale"
                          className="btn btn-danger mt-2 me-2"
                          onClick={() => {
                            api
                              .delete(`/scales/${scale.id}/subsidiaries/${selectedSubsdiarie.value}`)
                              .then(() => {
                                api
                                  .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
                                  .then((response) => setScalesList(response.data))

                                setDaysOff([])

                                api
                                  .get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${selectedWorker.value}`)
                                  .then((response) => {
                                    let scales = response.data

                                    let options = []

                                    scales.days_off?.map((scale) => {
                                      options.push(scale.date)
                                    })

                                    setDaysOff(options)
                                  })
                              })
                          }}
                          title="Excluir escala"
                        >
                          <Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <CalendarPopup
        calendarPopupOpen={calendarPopupOpen}
        setCalendarPopupOpen={setCalendarPopupOpen}
        handleOnclickDay={handleOnclickDay}
        selectedDate={selectedDate}
        daysOff={daysOff}
        selectedWorker={selectedWorker}
        setScalesList={setScalesList}
        setDaysOff={setDaysOff}
      // handleOnClickCalendar={handleOnClickCalendar}
      // allDaysOff={allDaysOff}
      />

      <DeleteScaleModal
        deleteScaleModalOpen={deleteScaleModalOpen}
        setDeleteScaleModalOpen={setDeleteScaleModalOpen}
        selectedDate={selectedDate}
        daysOff={daysOff}
        selectedWorker={selectedWorker}
        setScalesList={setScalesList}
        setDaysOff={setDaysOff}
        selectedWorkerInfo={selectedWorkerInfo}
      />

      {/* <ScaleHistoryModal
        scaleHistoryModalOpen={scaleHistoryModalOpen}
        setScaleHistoryModalOpen={setScaleHistoryModalOpen}
      /> */}

      <DaysOnReportModal
        show={scaleHistoryModalOpen}
        onHide={() => setScaleHistoryModalOpen(false)}
      />

      <DaysOffReportModal
        show={daysOffModalOpen}
        onHide={() => setDaysOffModalOpen(false)}
      />

      <PrintModal
        printModalOpen={printModalOpen}
        setPrintModalOpen={setPrintModalOpen}
        handlePrintScale={handlePrintScale}
        scalesList={scalesList}
      />

      <style>
        {`
          .calendar-container {
            background-color: #fff;
            border: 1px solid #dee2e6;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 10px;
          }

          .calendar-container .day-column {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            border-radius: 0.25rem;
            padding: 0.5rem;
            margin: 0.2rem;
            transition: background-color 0.3s, color 0.3s;
          }

          .calendar-container .day-column:hover {
            background-color: #f8f9fa;
            color: #333;
          }

          .calendar-container .react-calendar__tile--active {
            background-color: #007bff;
            color: white;
          }

          .calendar-container .react-calendar__tile--active:hover {
            background-color: #0056b3;
          }

          .calendar-container .react-calendar__navigation button {
            color: #007bff;
          }

          .calendar-container .react-calendar__navigation button:hover {
            background-color: #e9ecef;
          }

          .calendar-container .react-calendar__tile--now {
            background-color: #ffc107;
            color: #333;
          }
        `}
      </style>
    </>
  )
}

export default Scale
