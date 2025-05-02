import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import moment from "moment"
import { useEffect, useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import ReactSelect from "react-select"
import Swal from "sweetalert2"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"

const getWorkschedulesList = async (selectedSubsidiarie, month, year, setWorkschedulesList) => {
  let workschedules = await api.get(`/workschedule/subsidiaries/${selectedSubsidiarie?.value}/${month}/${year}`).then((response) => response.data)

  setWorkschedulesList(workschedules)
}

const getWorkersList = async (selectedSubsidiarie, setWorkersOptions) => {
  let workers = await api.get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`).then((response) => response.data)

  let options = workers.map((option) => ({ value: option.worker_id, label: option.worker_name }))

  setWorkersOptions(options)
}

const getTurnsList = async (selectedSubsidiarie, setTurnsOptions) => {
  let turns = await api.get(`/subsidiaries/${selectedSubsidiarie?.value}/turns`).then((response) => response.data)

  let options = turns.map((option) => ({ value: option.id, label: option.name }))

  setTurnsOptions(options)
}

const Workschedule = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workschedulesList, setWorkschedulesList] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [turnsOptions, setTurnsOptions] = useState()

  const [selectedWorker, setSelectedWorker] = useState()

  const [selectedTurn, setSelectedTurn] = useState()

  const [daysOff, setDaysOff] = useState()

  useEffect(() => {
    getWorkschedulesList(selectedSubsidiarie, format(new Date(), "MM"), format(new Date(), "yyyy"), setWorkschedulesList)

    getWorkersList(selectedSubsidiarie, setWorkersOptions)

    getTurnsList(selectedSubsidiarie, setTurnsOptions)
  }, [])

  const handleTileClassName = ({ date, view }) => {
    if (view == "month") {
      const isDayOff = daysOff?.some((dayOff) => dayOff == moment(date).format("YYYY-MM-DD"))

      if (isDayOff) {
        return "bg-danger text-white"
      }
    }
  }

  const handleOnclickDay = (day) => {
    day = moment(day).format("YYYY-MM-DD")

    setDaysOff(prev => {
      if (prev?.includes(day)) {
        return prev.filter(dayOff => dayOff !== day)
      } else {
        return [...(prev || []), day]
      }
    })
  }

  const handleSubmit = async () => {
    const daysOn = (
      eachDayOfInterval({
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      })
        .filter(day => !daysOff.includes(format(day, 'yyyy-MM-dd')))
        .map(day => format(day, 'yyyy-MM-dd'))
    )

    let formData = {
      "subsidiarie_id": selectedSubsidiarie?.value,
      "worker_id": selectedWorker?.value,
      "turn_id": selectedTurn?.value,
      "month": format(new Date(), "MM"),
      "year": format(new Date(), "yyyy"),
      "days_on": daysOn,
      "days_off": daysOff,
    }

    const result = await api.post(`/workschedule`, formData).then((response) => response).catch((error) => error)

    if (result.status == 200) {
      getWorkschedulesList(selectedSubsidiarie, format(new Date(), "MM"), format(new Date(), "yyyy"), setWorkschedulesList)

      Swal.fire("Sucesso", "Escala criada com sucesso", "success")
    } else {
      getWorkschedulesList(selectedSubsidiarie, format(new Date(), "MM"), format(new Date(), "yyyy"), setWorkschedulesList)

      Swal.fire("Erro", "Falha ao criar escala", "error")
    }
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mb-3">
          <ReactSelect
            placeholder={""}
            options={workersOptions}
            onChange={(value) => setSelectedWorker(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder={""}
            options={turnsOptions}
            onChange={(value) => setSelectedTurn(value)}
          />
        </div>

        <div>
          <Calendar
            className={"w-100 rounded"}
            tileClassName={handleTileClassName}
            onClickDay={handleOnclickDay}
          />
        </div>

        <div>
          <button className="btn btn-success mt-3" onClick={handleSubmit}>
            Salvar
          </button>
        </div>

        <div className="table-responsive mt-4">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Colaborador</th>

                <th>Turno</th>

                <th>Data</th>

                <th>Dias de folga</th>

                <th>Dias de trabalho</th>
              </tr>
            </thead>

            <tbody>
              {
                workschedulesList?.map((workschedule) => (
                  <tr>
                    <td>{workschedule.Workers.name}</td>

                    <td>{workschedule.Turn.start_time} {workschedule.Turn.end_time}</td>

                    <td>{workschedule.Workschedule.month}/{workschedule.Workschedule.year}</td>

                    <td>
                      {
                        workschedule.Workschedule.days_off.map((dayOff) => (
                          <span className="badge text-bg-danger me-1">
                            {moment(dayOff).format("DD-MM-YYYY")}
                          </span>
                        ))
                      }
                    </td>

                    <td>
                      {
                        workschedule.Workschedule.days_on.map((dayOn) => (
                          <span className="badge text-bg-success me-1">
                            {moment(dayOn).format("DD-MM-YYYY")}
                          </span>
                        ))
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Workschedule