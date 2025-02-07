import { Trash } from "react-bootstrap-icons"
import useUserSessionStore from "../../../data/userSession"
import api from "../../../services/api"

const ScaleRow = (props) => {
  const {
    title,
    scalesList,
    functionId,
    selectedWorker,
    setScalesList,
    setDaysOff
  } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

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
    <div className="row">
      <div className="col-12">
        <>
          <div>
            <h4>{title}</h4>
          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Colaborador</th>

                  <th>Dias de trabalho</th>

                  <th>Dias de folga</th>

                  <th></th>
                </tr>
              </thead>

              <tbody>
                {
                  scalesList && scalesList.map((scale) => (
                    <>
                      {
                        scale.worker.function.id == functionId && (
                          <tr>
                            <td>
                              <div>{scale.worker.name} | {scale.worker.function.name} | {scale.worker.turn.start_time} - {scale.worker.turn.end_time}</div>
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
                                {JSON.parse(scale.proportion).map((item, index) => (
                                  <span key={index} className="badge text-bg-danger">
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
                        )
                      }
                    </>
                  ))
                }
              </tbody>
            </table>
          </div>
        </>
      </div>
    </div>
  )
}

export default ScaleRow