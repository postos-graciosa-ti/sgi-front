import Calendar from "react-calendar"
import Nav from "../../components/Nav"
import { useEffect, useState } from "react"
import moment from "moment"
import { Check2, Check2All, ExclamationTriangle, Trash } from "react-bootstrap-icons"
import api from "../../services/api"
import useUserSessionStore from "../../data/userSession"
import ReactSelect from "react-select"
import CalendarPopup from "../../pages/scale/CalendarPopup"
import Swal from "sweetalert2"

const Scale = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const [selectedDate, setSelectedDate] = useState()

  const [daysOff, setDaysOff] = useState([])

  const [workersOptions, setWorkersOptions] = useState([])

  const [selectedWorker, setSelectedWorker] = useState()

  const [calendarPopupOpen, setCalendarPopupOpen] = useState(false)

  const [scalesList, setScalesList] = useState([])

  useEffect(() => {
    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
      .then((response) => setScalesList(response.data))

    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        let workers = response.data

        let workersOptions = []

        workers?.map((worker) => {
          workersOptions.push({ "label": worker.worker_name, "value": worker.worker_id })
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
    if (daysOff.length == 0) {
      api
        .post("/testing", {
          date_from_calendar: `${moment(monthFirstDay).format("DD-MM-YYYY")}`,
          date_to_compare: `${moment(date).format("DD-MM-YYYY")}`
        })
        .then((response) => {
          let dateDifference = response.data.date_difference

          if (dateDifference >= 6) {
            setCalendarPopupOpen(false)

            // alert("impedido")

            Swal.fire({
              icon: "error",
              title: "Erro",
              text: "O dia que você selecionou ultrapassa os 6 dias permitidos por lei"
            })

            return
          } else {
            setDaysOff((prevState) => {
              if (prevState) {
                return [...prevState, moment(date).format("DD-MM-YYYY")]
              } else {
                return [moment(date).format("DD-MM-YYYY")]
              }
            })
            setCalendarPopupOpen(false)
          }
        })
    } else {
      api
        .post("/testing", {
          date_from_calendar: `${daysOff[daysOff.length - 1]}`,
          date_to_compare: `${moment(date).format("DD-MM-YYYY")}`
        })
        .then((response) => {
          let dateDifference = response.data.date_difference

          if (dateDifference >= 6) {
            setCalendarPopupOpen(false)

            // alert("impedido")

            Swal.fire({
              icon: "error",
              title: "Erro",
              text: "O dia que você selecionou ultrapassa os 6 dias permitidos por lei"
            })

            return
          } else {
            setDaysOff((prevState) => {
              if (prevState) {
                return [...prevState, moment(date).format("DD-MM-YYYY")]
              } else {
                return [moment(date).format("DD-MM-YYYY")]
              }
            })
            setCalendarPopupOpen(false)
          }
        })
    }
  }

  const handleSubmitDaysOff = () => {
    let formData = {
      "worker_id": selectedWorker.value,
      "subsidiarie_id": selectedSubsdiarie.value,
      "first_day": moment(monthFirstDay).format("DD-MM-YYYY"),
      "last_day": moment(monthLastDay).format("DD-MM-YYYY"),
      "days_off": `[${daysOff.map(dayOff => `'${dayOff}'`).join(',')}]`,
      "ilegal_dates": `[${daysOff.map(dayOff => `'${dayOff}'`).join(',')}]`
    }

    api
      .post(`/scales`, formData)
      .then((response) => {
        setCalendarPopupOpen(false)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => setScalesList(response.data))
      })
      .catch((error) => console.error(error))
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

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mb-3">
          <ReactSelect
            placeholder="Colaboradores"
            options={workersOptions}
            onChange={(value) => {
              setDaysOff([])

              setSelectedWorker(value)

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

        <div>
          <Calendar
            className="w-100 rounded"
            tileClassName={handleTitleClassname}
            // onClickDay={handleOnclickDay}
            onClickDay={(value) => {
              setSelectedDate(value)
              setCalendarPopupOpen(true)
            }}
          />
        </div>

        <div>
          <button className="btn btn-success mt-3" onClick={handleSubmitDaysOff}>
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
                    <td>{scale.worker.name}</td>

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