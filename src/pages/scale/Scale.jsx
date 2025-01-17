import moment from "moment"
import { useEffect, useState } from "react"
import { Check2All, ExclamationOctagon, FileEarmarkBreak, Printer, Trash } from "react-bootstrap-icons"
import Calendar from "react-calendar"
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import mountTour from "../../functions/mountTour"
import CalendarPopup from "../../pages/scale/CalendarPopup"
import api from "../../services/api"
import DeleteScaleModal from "./DeleteScaleModal"
import addDaysOffValidations from "./functions/addDaysOffValidations"
import printContent from "./printContent"
import PrintModal from "./PrintModal"
import ScaleHistoryModal from "./ScaleHistoryModal"

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

  useEffect(() => {
    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
      .then((response) => setScalesList(response.data))

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
  }, [])

  const handleTitleClassname = ({ date, view }) => {
    if (view == "month") {
      let isDayOff = daysOff.some((dayOff) => dayOff == moment(date).format("DD-MM-YYYY"))

      return isDayOff && 'highlight' || null
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
                  console.log(response)

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
            className="w-100 rounded"
            tileClassName={handleTitleClassname}
            showNeighboringMonth={false}
            // onClickDay={handleOnclickDay}
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
          <div className="mt-1 text-danger fst-italic">
            <b>*os dias que aparecem em verde no calendário são dias de folga</b>
          </div>

          <button
            id="print-days"
            className="btn btn-light mt-3 me-3"
            onClick={() => {
              setPrintModalOpen(true)
            }}
          >
            <Printer />
          </button>

          <button className="btn btn-danger mt-3 me-3" onClick={() => setScaleHistoryModalOpen(true)}>
            <FileEarmarkBreak />
          </button>

          <button id="help" className="btn btn-warning mt-3 me-3" onClick={setTour}>
            <ExclamationOctagon />
          </button>

          <button id="save-scale" className="btn btn-success mt-3" onClick={handleSubmitDaysOff}>
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
                                    console.log(response)

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

      <ScaleHistoryModal
        scaleHistoryModalOpen={scaleHistoryModalOpen}
        setScaleHistoryModalOpen={setScaleHistoryModalOpen}
      />

      <PrintModal
        printModalOpen={printModalOpen}
        setPrintModalOpen={setPrintModalOpen}
        handlePrintScale={handlePrintScale}
        scalesList={scalesList}
      />

      <style>
        {`
          .highlight {
            background-color: green;
            color: white;
          }
        `}
      </style>
    </>
  )
}

export default Scale