import "driver.js/dist/driver.css"
import moment from "moment"
import "moment/locale/pt-br"
import { useEffect, useState } from "react"
import { CheckAll, FileEarmarkText, PersonPlus, Printer, Question } from "react-bootstrap-icons"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import ReactSelect from "react-select"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import initTour from "../../driverjs/initTour"
import scaleSteps from "../../driverjs/scaleSteps"
import CalendarPopup from "../../pages/scale/CalendarPopup"
import api from "../../services/api"
import AddSomeWorkersModal from "./AddSomeWorkers"
import DaysOffReportModal from "./DaysOffReportModal"
import DaysOnReportModal from "./DaysOnReportModal"
import DeleteScaleModal from "./DeleteScaleModal"
import HollidaysModal from "./HollidaysModal"
import PrintModal from "./PrintModal"
import ScaleLogsModal from "./ScaleLogsModal"
import ScaleRow from "./ScaleRow"

const Scale = () => {
  const firstDayOfMonth = moment().startOf('month')

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [selectedDate, setSelectedDate] = useState()

  const [daysOff, setDaysOff] = useState([])

  const [workersOptions, setWorkersOptions] = useState([])

  const [selectedWorker, setSelectedWorker] = useState()

  const [selectedWorkerInfo, setSelectedWorkerInfo] = useState()

  const [calendarPopupOpen, setCalendarPopupOpen] = useState(false)

  const [scalesList, setScalesList] = useState([])

  const [deleteScaleModalOpen, setDeleteScaleModalOpen] = useState(false)

  const [allWorkers, setAllWorkers] = useState([])

  const [scaleHistoryModalOpen, setScaleHistoryModalOpen] = useState(false)

  const [printModalOpen, setPrintModalOpen] = useState(false)

  const userSession = useUserSessionStore((state) => state.userSession)

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

  const [allHollidays, setAllHollidays] = useState()

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
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
      .then((response) => setScalesList(response.data))

    const currentDate = new Date()

    const currentYear = currentDate.getFullYear()

    api
      .get(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`)
      .then((response) => {
        let datesArr = [
          {
            "date": `${currentYear}-09-03`,
            "name": "Aniversário de Joinville",
            "type": "municipal"
          },
          ...response.data
        ].sort((a, b) => new Date(a.date) - new Date(b.date))

        setAllHollidays(datesArr)
      })

  }, [])

  console.log(allHollidays)

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

  const handleOnclickDay = (date) => {
    const validations = [
      { condition: !selectedTurn, message: "Não é possível selecionar sem turno" },
      { condition: !selectedFunction, message: "Não é possível selecionar sem função" },
      { condition: !selectedWorker, message: "Não é possível selecionar sem colaborador" },
    ]

    for (const { condition, message } of validations) {
      if (condition) {
        setCalendarPopupOpen(false)

        Swal.fire({
          icon: "warning",
          title: "Aviso",
          text: `_${message}_`,
        })

        throw new Error(`_${message}_`)
      }
    }

    let allDaysOff = [...daysOff, moment(date).format("DD-MM-YYYY")].sort()

    if (allDaysOff.length > 1) {
      allDaysOff.reduce((prev, curr) => {
        let prevDate = moment(prev, "DD-MM-YYYY")

        let currDate = moment(curr, "DD-MM-YYYY")

        let dateDiff = currDate.diff(prevDate, "days")

        if (dateDiff - 1 >= 7) {
          Swal.fire({
            icon: "warning",
            title: "Aviso",
            text: "_Esse dia ultrapassa os 6 dias permitidos por lei_",
          })
        }

        return currDate
      })
    } else {
      let curr = moment(date).format("DD-MM-YYYY")

      let prevDate = moment(firstDayOfMonth, "DD-MM-YYYY")

      let currDate = moment(curr, "DD-MM-YYYY")

      let dateDiff = currDate.diff(prevDate, "days")

      if (dateDiff >= 7) {
        Swal.fire({
          icon: "warning",
          title: "Aviso",
          text: "_Esse dia ultrapassa os 6 dias permitidos por lei_",
        })
      }
    }

    let worker = allWorkers.find(worker => worker.worker_id == selectedWorker.value)

    scalesList?.map((scale) => {
      if (scale.worker.turn.id == worker.turn_id && scale.worker.function.id == worker.function_id) {
        scale?.days_off.map((dayOff) => {
          if (dayOff.date == moment(date).format("DD-MM-YYYY")) {
            setCalendarPopupOpen(false)

            Swal.fire({
              icon: "error",
              title: "Aviso",
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

  const translateWeekday = (weekday) => ({
    Monday: "Segunda-Feira",
    Tuesday: "Terça-Feira",
    Wednesday: "Quarta-Feira",
    Thursday: "Quinta-Feira",
    Friday: "Sexta-Feira",
    Saturday: "Sábado",
    Sunday: "Domingo",

  })[weekday] || ""

  const handleSubmitDaysOff = () => {
    const validations = [
      { condition: !selectedTurn, message: "Não é possível salvar sem turno selecionado" },
      { condition: !selectedFunction, message: "Não é possível salvar sem função selecionada" },
      { condition: !selectedWorker, message: "Não é possível salvar sem colaborador selecionado" },
      { condition: daysOff.length === 0, message: "Não é possível salvar sem dias de folga selecionados" }
    ]

    for (const { condition, message } of validations) {
      if (condition) {
        Swal.fire({
          icon: "warning",
          title: "Aviso",
          text: `_${message}_`,
        })

        throw new Error(`_${message}_`)
      }
    }

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
        let data = response.data

        setCalendarPopupOpen(false)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie?.value}`)
          .then((response) => setScalesList(response.data))

        let ScalesLogs = {
          "log_str": `${userSession?.name ?? "Usuário desconhecido"} atualizou a escala para ${selectedWorker?.label ?? "Trabalhador não definido"} com dias (${sortedDaysOff?.map(dayOff => `'${dayOff} (${translateWeekday(moment(dayOff, 'DD-MM-YYYY').format('dddd'))})'`).join(", ")})`,
          "happened_at": moment().format("DD-MM-YYYY"),
          "happened_at_time": moment().format("HH:mm"),
          "subsidiarie_id": selectedSubsdiarie?.value,
          "user_id": userSession?.id
        }

        api
          .post(`/subsidiaries/${selectedSubsdiarie.value}/scales/logs`, ScalesLogs)

        let sundaysCountPlusPlus = []

        data && data.days_off.map((dayOff) => {
          let dayOffWeekday = moment(dayOff, "DD-MM-YYYY")

          if (dayOffWeekday.day() == 0) {
            sundaysCountPlusPlus.push(dayOff)
          }
        })

        if (sundaysCountPlusPlus.length == 0) {
          Swal.fire({
            icon: "warning",
            title: "Aviso",
            text: "_O colaborador não possui ao menos um domingo na escala_",
          })
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: error.response.data.detail
        })
      })
  }

  const handleOnChangeWorkersSelect = (worker) => {
    setDaysOff([])

    setSelectedWorker(worker)

    api
      .get(`/workers/${worker.value}`)
      .then((response) => setSelectedWorkerInfo(response.data))

    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}/workers/${worker.value}`)
      .then((response) => {
        let scales = response.data

        let options = []

        scales.days_off?.map((scale) => {
          options.push(scale.date)
        })

        setDaysOff(options)
      })
  }

  const handleTileDisabled = ({ date }) => {
    const isCaixaFunction = selectedFunction?.value == caixasId?.id

    const dayOfWeek = moment(date).format("dddd")

    const formattedDate = moment(date).startOf("day").format("YYYY-MM-DD")

    const isHoliday = allHollidays?.some(holiday => holiday.date === formattedDate)

    if (isHoliday) return true

    if (isCaixaFunction) {
      return !(dayOfWeek === "Tuesday" || dayOfWeek === "Wednesday")
    }

    return false
  }

  const handleOnclickCalendarDay = (value) => {
    setSelectedDate(value)

    let isAlreadyDayOff = daysOff.some(
      (dayOff) => dayOff === moment(value).format("DD-MM-YYYY")
    )

    if (isAlreadyDayOff) {
      setDeleteScaleModalOpen(true)
    } else {
      setCalendarPopupOpen(true)
    }
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div id="turn-select" className="mb-3">
          <ReactSelect
            placeholder="Selecione um turno"
            options={turnsOptions}
            onChange={(value) => setSelectedTurn(value)}
          />
        </div>

        <div id="function-select" className="mb-3">
          <ReactSelect
            placeholder="Selecione uma função"
            options={functionsOptions}
            onChange={(value) => setSelectedFunction(value)}
          />
        </div>

        <div id="workers-select" className="mb-3">
          <ReactSelect
            placeholder="Selecione um colaborador"
            options={workersOptions}
            onChange={(worker) => handleOnChangeWorkersSelect(worker)}
          />
        </div>

        <div className="mt-3">
          <button
            id="print-scale"
            className="btn btn-light mt-3 me-3"
            onClick={() => setPrintModalOpen(true)}
            title="Impressão de escala"
          >
            <Printer />
          </button>

          <button
            id="scale-logs"
            onClick={() => setScaleLogsModalOpen(true)}
            className="btn btn-warning me-3 mt-3"
            title="Logs de escala"
          >
            <FileEarmarkText />
          </button>

          <button
            id="collective-scale"
            className="btn btn-primary me-3 mt-3"
            onClick={() => setAddSomeWorkersModalOpen(true)}
            title="Adicionar colaboradores à escala"
          >
            <PersonPlus />
          </button>

          <button
            id="save"
            className="btn btn-success mt-3"
            onClick={handleSubmitDaysOff}
            title="Salvar dias de folga"
          >
            <CheckAll />
          </button>
        </div>

        <div id="calendar">
          <Calendar
            className="w-100 rounded"
            tileClassName={handleTitleClassname}
            showNeighboringMonth={false}
            tileDisabled={handleTileDisabled}
            onClickDay={handleOnclickCalendarDay}
          />
        </div>

        <div className="mb-2 text-end">
          <button
            className="btn btn-warning me-2"
            onClick={() => initTour(scaleSteps)}
          >
            <Question />
          </button>

          <button
            id="days-on-report"
            className="btn btn-primary me-2"
            onClick={() => setScaleHistoryModalOpen(true)}
          >
            Relatório de dias de trabalho
          </button>

          <button
            id="days-off-report"
            className="btn btn-primary me-2"
            onClick={() => setDaysOffModalOpen(true)}
          >
            Relatório de dias de folga
          </button>

          <button
            id="hollidays-button"
            className="btn btn-primary"
            onClick={() => setHollidaysModalOpen(true)}
          >
            Feriados
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
      />

      <style>
        {
          `
            .calendar-container {
              width: 100%;
              max-width: 600px;
              background: #fff;
              border-radius: 12px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }

            .react-calendar {
              border: none;
              font-family: "Arial", sans-serif;
            }

            .react-calendar__navigation {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }

            .react-calendar__navigation button {
              background: transparent;
              border: none;
              font-size: 16px;
              font-weight: bold;
              color: #333;
              cursor: pointer;
              padding: 8px;
              border-radius: 8px;
              transition: background 0.2s ease-in-out;
            }

            .react-calendar__navigation button:hover {
              background: rgba(0, 0, 0, 0.1);
            }

            .react-calendar__tile {
              border-radius: 8px;
              padding: 10px;
              text-align: center;
              transition: background 0.3s, transform 0.2s ease-in-out;
            }

            .react-calendar__tile--active {
              background: #007bff;
              color: white;
              font-weight: bold;
              transform: scale(1.05);
            }

            .react-calendar__tile:hover {
              background: rgba(0, 123, 255, 0.2);
              transform: scale(1.05);
            }

            .react-calendar__tile--now {
              background: #ffeb3b;
              color: #333;
              font-weight: bold;
            }

            .bg-danger.text-white {
              background: #dc3545 !important;
              color: white !important;
              font-weight: bold;
            }
          `
        }
      </style>
    </>
  )
}

export default Scale