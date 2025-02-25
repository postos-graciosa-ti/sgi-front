import axios from "axios"
import moment from "moment"
import printJS from "print-js"
import { useEffect, useState } from "react"
import { Check2All, Clipboard2Check, Clipboard2X, PersonAdd, Printer } from "react-bootstrap-icons"
import Calendar from "react-calendar"
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import CalendarPopup from "../../pages/scale/CalendarPopup"
import api from "../../services/api"
import AddSomeWorkersModal from "./AddSomeWorkers"
import ScaleRow from "./components/ScaleRow"
import DaysOffReportModal from "./DaysOffReportModal"
import DaysOnReportModal from "./DaysOnReportModal"
import DeleteScaleModal from "./DeleteScaleModal"
import HollidaysModal from "./HollidaysModal"
import printContent from "./printContent"
import PrintModal from "./PrintModal"
import ScaleLogsModal from "./ScaleLogsModal"

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

  const [addSomeWorkersModalOpen, setAddSomeWorkersModalOpen] = useState(false)

  const [caixasId, setCaixasId] = useState()

  const [frentistasId, setFrentistasId] = useState()

  const [frentistasCaixaId, setFrentistasCaixaId] = useState()

  const [trocadoresId, setTrocadoresId] = useState()

  const [scaleLogsModalOpen, setScaleLogsModalOpen] = useState()

  const [hollidaysModalOpen, setHollidaysModalOpen] = useState(false)

  const [hollidays, setHollidays] = useState()

  const currentYear = new Date().getFullYear()

  const [holidayMessage, setHolidayMessage] = useState('');

  useEffect(() => {
    const checkHoliday = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Months are from 0 to 11, so we add 1
      const currentYear = currentDate.getFullYear();

      // Making a GET request to the brasilapi API
      axios.get(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`)
        .then(response => {
          // Filtering holidays of the current month
          const holidaysInMonth = response.data.filter(holiday => {
            const holidayMonth = new Date(holiday.date).getMonth() + 1;
            return holidayMonth === currentMonth;
          });

          // Check if there are holidays in the current month
          if (holidaysInMonth.length > 0) {
            const holidayList = holidaysInMonth
              .map(holiday => `${holiday.date} - ${holiday.name}`)
              .join('\n');
            setHolidayMessage(`Feriados em ${currentDate.toLocaleString('default', { month: 'long' })} de ${currentYear}:\n${holidayList}`);
          } else {
            setHolidayMessage(`Não há feriados em ${currentDate.toLocaleString('default', { month: 'long' })} de ${currentYear}.`);
          }
        })
        .catch(error => {
          setHolidayMessage('Erro ao buscar feriados.')

          console.error('Error fetching holidays:', error)

        })
    }

    checkHoliday()

  }, [])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/functions`)
      .then((response) => {
        let functions = response.data

        setCaixasId(functions.find((func) => func.name == "Operador(a) de Caixa I"))

        setFrentistasId(functions.find((func) => func.name == "Frentista I"))

        setFrentistasCaixaId(functions.find((func) => func.name == "Frentista / Caixa II"))

        setTrocadoresId(functions.find((func) => func.name == "Trocador de Óleo / Frentista II"))

        let functionsOptions = []

        functions && functions.map((func) => {
          let inScaleFunctions = (
            func.name == "Operador(a) de Caixa I" ||
            func.name == "Frentista I" ||
            func.name == "Frentista / Caixa II" ||
            func.name == "Trocador de Óleo / Frentista II"
          )

          if (inScaleFunctions)
            functionsOptions.push({ "label": func.name, "value": func.id })
        })

        setFunctionsOptions(functionsOptions)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/turns`)
      .then((response) => {
        const sortedTurns = response.data.sort((a, b) => {
          const startA = moment(a.start_time, "HH:mm")

          const startB = moment(b.start_time, "HH:mm")

          return startA.diff(startB)
        })

        let options = []

        sortedTurns && sortedTurns.map((turn) => {
          options.push({ "label": `${turn.start_time} - ${turn.end_time}`, "value": turn.id })
        })

        setTurnsOptions(options)
      })

    api
      .get("/scales/day-off/quantity")
      .then((response) => {
        setMessage(`*Quantidade ideal de dias de folga do mês atual (uma por semana): ${response.data}`)
      })

    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
      .then((response) => setScalesList(response.data))

    api
      .get(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`)
      .then((response) => setHollidays(response.data))

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

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day); // Mês no JS é 0-based (Janeiro = 0)
  };

  const isGreaterThanSevenDays = (datesArray) => {
    const parsedDates = datesArray.map(parseDate);

    for (let i = 0; i < parsedDates.length - 1; i++) {
      const diffInMs = Math.abs(parsedDates[i + 1] - parsedDates[i]);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 7) {
        return true;
      }
    }
    return false;
  };

  const handleOnclickDay = (date) => {
    let worker = allWorkers.find(worker => worker.worker_id == selectedWorker.value)

    scalesList?.map((scale) => {
      if (scale.worker.turn.id == worker.turn_id && scale.worker.function.id == worker.function_id) {
        scale?.days_off.map((dayOff) => {
          if (dayOff.date == moment(date).format("DD-MM-YYYY")) {
            setCalendarPopupOpen(false)

            Swal.fire({
              icon: "error",
              title: "Erro",
              text: "_Já existe um colaborador do mesmo turno e função de folga nesse dia_",
            })

            throw new Error("_Já existe um colaborador do mesmo turno e função de folga nesse dia_")
          }
        })
      }
    })

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
    const sortedDaysOff = [...daysOff].sort((a, b) => {
      const dataA = new Date(a.split("-").reverse().join("-"))

      const dataB = new Date(b.split("-").reverse().join("-"))

      return dataA - dataB
    })

    const primeiraData = new Date(sortedDaysOff[0].split("-").reverse().join("-"))

    const ultimaData = new Date(sortedDaysOff[sortedDaysOff.length - 1].split("-").reverse().join("-"))

    primeiraData.setDate(1)

    ultimaData.setMonth(ultimaData.getMonth() + 1)

    ultimaData.setDate(0)

    const formatarData = (data) =>
      String(data.getDate()).padStart(2, "0") + "-" +

      String(data.getMonth() + 1).padStart(2, "0") + "-" +

      data.getFullYear();

    let count = 0

    let ahuashua = []

    for (let currentDate = new Date(primeiraData); currentDate <= ultimaData; currentDate.setDate(currentDate.getDate() + 1)) {
      count++

      sortedDaysOff.forEach((dayOff) => {
        if (moment(currentDate).format("DD-MM-YYYY") === dayOff) {
          ahuashua.push({ date: dayOff, proportion: `${count - 1}x1` })

          count = 0
        }
      })
    }

    const formData = {
      worker_id: selectedWorker.value,
      subsidiarie_id: selectedSubsdiarie.value,
      first_day: formatarData(primeiraData),
      last_day: formatarData(ultimaData),
      days_off: `[${sortedDaysOff.map(dayOff => `'${dayOff}'`).join(",")}]`,
      ilegal_dates: `[${sortedDaysOff.map(dayOff => `'${dayOff}'`).join(",")}]`,
      worker_turn_id: selectedWorkerInfo.turn_id,
      worker_function_id: selectedWorkerInfo.function_id
    }

    api
      .post(`/scales`, formData)
      .then((response) => {
        setCalendarPopupOpen(false)

        api.get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => setScalesList(response.data))

        api.post("/logs/scales", {
          user_id: userSession.id,
          worker_id: selectedWorker.value,
          inserted_at: new Date().toLocaleDateString("pt-BR"),
          at_time: new Date().toLocaleTimeString("pt-BR"),
          subsidiarie_id: selectedSubsdiarie.value,
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: error.response.data.detail
        })
      })
  }

  const handlePrintScale = async () => {
    await api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/scales/print`)
      .then((response) => {
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
              ${ReactDOMServer.renderToStaticMarkup(printContent(response.data))}
            </body>
          </html> 
        `

        printJS({
          printable: printableContent,
          type: 'raw-html',
        })
      })
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mb-3">
          <ReactSelect
            placeholder="Selecione um turno"
            options={turnsOptions}
            onChange={(value) => setSelectedTurn(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder="Selecione uma função"
            options={functionsOptions}
            onChange={(value) => setSelectedFunction(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            id="workers-select"
            placeholder="Selecione um colaborador"
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

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <button className="btn btn-primary" onClick={() => setHollidaysModalOpen(true)}>Feriados</button>
          </div>

          <div className="text-end mt-2 mb-2 text-danger">
            *{holidayMessage}
          </div>
        </div>


        <div id="scale-calendar">
          <Calendar
            className="calendar-container w-100 rounded"
            tileClassName={handleTitleClassname}
            showNeighboringMonth={false}
            tileDisabled={() => {
              if (selectedWorkerInfo && !selectedWorkerInfo?.is_active)
                return true
              else
                return false
            }}
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

        <div className="text-end">
          <button
            id="print-days"
            className="btn btn-light mt-3 me-3"
            // onClick={handlePrintScale}
            onClick={() => setPrintModalOpen(true)}
            title="Botão para impressão"
          >
            <Printer />
          </button>

          {/* <Link to="/scales-logs" className="btn btn-warning me-3 mt-3">Logs</Link> */}

          <button
            onClick={() => setScaleLogsModalOpen(true)}
            className="btn btn-warning me-3 mt-3"
          >
            Logs
          </button>

          <button
            className="btn btn-danger mt-3 me-3"
            title="Relatório de dias de folga"
            onClick={() => setDaysOffModalOpen(true)}
          >
            <Clipboard2X />
          </button>

          <button
            className="btn btn-success mt-3 me-3"
            onClick={() => setScaleHistoryModalOpen(true)}
            title="Relatório de dias de trabalho"
          >
            <Clipboard2Check />
          </button>

          <button
            className="btn btn-primary me-3 mt-3"
            onClick={() => setAddSomeWorkersModalOpen(true)}
            title="Adicionar escala de trabalho para vários colaboradores"
          >
            <PersonAdd />
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

        <ScaleRow
          title="Escala de caixas"
          scalesList={scalesList}
          functionId={caixasId?.id}
          selectedWorker={selectedWorker}
          setScalesList={setScalesList}
          setDaysOff={setDaysOff}
        />

        <ScaleRow
          title={"Escala de frentistas"}
          scalesList={scalesList}
          functionId={frentistasId?.id}
          selectedWorker={selectedWorker}
          setScalesList={setScalesList}
          setDaysOff={setDaysOff}
        />

        <ScaleRow
          title={"Escala de frentistas-caixas"}
          scalesList={scalesList}
          functionId={frentistasCaixaId?.id}
          selectedWorker={selectedWorker}
          setScalesList={setScalesList}
          setDaysOff={setDaysOff}
        />

        <ScaleRow
          title={"Escala de trocadores de óleo"}
          scalesList={scalesList}
          functionId={trocadoresId?.id}
          selectedWorker={selectedWorker}
          setScalesList={setScalesList}
          setDaysOff={setDaysOff}
        />
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
        hollidays={hollidays}
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

      <AddSomeWorkersModal
        addSomeWorkersModalOpen={addSomeWorkersModalOpen}
        setAddSomeWorkersModalOpen={setAddSomeWorkersModalOpen}
        workersOptions={workersOptions}
        selectedWorker={selectedWorker}
        selectedWorkerInfo={selectedWorkerInfo}
        setScalesList={setScalesList}
        scalesList={scalesList}
        allWorkers={allWorkers}
      />

      <ScaleLogsModal
        scaleLogsModalOpen={scaleLogsModalOpen}
        setScaleLogsModalOpen={setScaleLogsModalOpen}
      />

      <HollidaysModal
        hollidaysModalOpen={hollidaysModalOpen}
        setHollidaysModalOpen={setHollidaysModalOpen}
        hollidays={hollidays}
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