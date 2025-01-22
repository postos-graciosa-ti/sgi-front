import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Printer, Question } from 'react-bootstrap-icons'
import 'react-calendar/dist/Calendar.css'
import { Link } from 'react-router-dom'
import ReactSelect from "react-select"
import Swal from 'sweetalert2'
import Nav from "../../components/Nav"
import useUserSessionStore from '../../data/userSession'
import driverObj from "../../functions/driverObj"
import api from '../../services/api'

const SeeScale = () => {
  const today = new Date();

  const currentMonth = today.getMonth()

  const currentYear = today.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const [scales, setScales] = useState()

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [seeButton, setSeeButton] = useState(false)

  const [rowsToUpdate, setRowsToUpdate] = useState([])

  const todayMoment = moment();

  const startOfWeek = todayMoment.clone().startOf('week').format('YYYY-MM-DD');

  const endOfWeek = todayMoment.clone().endOf('week').format('YYYY-MM-DD');

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then(() => {
        api
          .get(`/scales/subsidiarie/${selectedSubsdiarie.value}`)
          .then((response) => {
            let scales = response.data

            let hasCurrentMonthScale = scales.some((scale) => moment(scale.date).isSame(today, 'month'))

            if (hasCurrentMonthScale) {
              let weekScales = scales.filter((scale) => {
                const scaleDate = new Date(scale.date)

                const start = new Date(startOfWeek)

                const end = new Date(endOfWeek)

                return scaleDate >= start && scaleDate <= end
              })

              setScales(weekScales);
            } else {
              handleGenerateScale()
                .then(() => {
                  api
                    .get(`/scales/subsidiarie/${selectedSubsdiarie.value}`)
                    .then((response) => setScales(response.data))
                })
            }
          })
          .catch(() => {
            handleGenerateScale()
              .then(() => {
                api
                  .get(`/scales/subsidiarie/${selectedSubsdiarie.value}`)
                  .then((response) => setScales(response.data))
              })
          })
      })
      .catch(() => {
        return Swal.fire({
          "title": "Erro",
          "text": "Não foi possível gerar escala pois não há trabalhadores cadastrados",
          "icon": "error"
        })
      })

  }, [])

  const handleGenerateScale = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        const workersData = response.data

        const workers = []

        workersData && workersData.map((worker) => {
          workers.push({
            "id": worker.id,
            "name": worker.name,
            "status": "trabalhando",
          })
        })

        const scales = []

        for (let day = 1; day <= daysInMonth; day++) {
          scales.push({
            "date": moment(new Date(currentYear, currentMonth, day)).format("YYYY-MM-DD"),
            "subsidiarie_id": selectedSubsdiarie.value,
            "workers": JSON.stringify(workers)
          })
        }

        api
          .post(`/scale`, scales)
      })
  }

  const handleUpdateRows = () => {
    api
      .post("/shifts/", rowsToUpdate)
      .then((response) => {
        setSeeButton(false)
      })
      .catch((error) => console.error(error))
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDriveObj = () => {
    driverObj.drive()
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button 
          id="help"
          className="btn btn-warning me-2"
          onClick={handleDriveObj}
          >
            <Question />
          </button>
          
          <button id="printer" onClick={handlePrint} className="btn btn-light">
            <Printer />
          </button>

          <Link to="/scale-history" id="scaleHistory" className="btn btn-primary ms-2">
            Histórico de escalas
          </Link>
        </div>

        <div className="row mt-3 mb-3">
          <div className="col">
            <h4>
              <b>
                Planejamento de escala semanal
              </b>
            </h4>
          </div>

          <div className="col text-end">
            {
              seeButton && (
                <button
                  id="save"
                  className="btn btn-success"
                  onClick={(e) => handleUpdateRows(e)}
                >
                  Salvar
                </button>
              )
            }
          </div>
        </div>

        {
          scales && scales.map((scale) => (
            <div id="weekScale" className='card mb-3 p-2' key={scale.date}>
              <p>
                <b>
                  {scale.date}
                </b>
              </p>

              {scale.workers && scale.workers.map((worker) => (
                <>
                  <div key={worker.id} className="row">
                    <div className="col">
                      {worker.name}
                    </div>

                    <div className="col">
                      <ReactSelect
                        className="mb-1"
                        defaultValue={{ label: worker.status, value: worker.status }}
                        options={[
                          { label: "folgando", value: "folgando" },
                          { label: "trabalhando", value: "trabalhando" }
                        ]}
                        onChange={(e) => {
                          setSeeButton(true)
                          setRowsToUpdate((prevState) => {
                            return (
                              prevState ? [...prevState, {
                                "scale_id": scale.id,
                                "worker_id": worker.id,
                                "status": e.value
                              }]
                                :
                                [{
                                  "scale_id": scale.id,
                                  "worker_id": worker.id,
                                  "status": e.value
                                }]
                            )
                          })
                        }}
                      />
                    </div>
                  </div>
                </>
              ))}
            </div>
          ))}
      </div>
      
    </>
  )
}

export default SeeScale
