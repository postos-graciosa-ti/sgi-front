import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ExclamationTriangle, Printer, Question, Trash } from 'react-bootstrap-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ReactDOMServer from 'react-dom/server'
import ReactSelect from 'react-select'
import Swal from 'sweetalert2'
import Nav from "../../components/Nav"
import useDaysOffStore from '../../data/daysOffStore'
import useUserSessionStore from '../../data/userSession'
import mountTour from '../../functions/mountTour'
import api from '../../services/api'
import CalendarPopup from './CalendarPopup'

const printContent = (scalesList) => {
  return (
    <div>
      <h3>Escala de Colaboradores</h3>
      <table>
        <thead>
          <tr>
            <th>Colaborador</th>
            <th>Folga</th>
            <th>Assinatura</th>
          </tr>
        </thead>
        <tbody>
          {scalesList?.map((scale, index) => (
            <tr key={index}>
              <td>{scale.worker.name}</td>
              <td>
                {scale.days_off.map((day, idx) => (
                  <div key={idx}>{day}</div>
                ))}
              </td>
              <td style={{ padding: '20px 0' }}></td> {/* Espaço para assinatura */}
            </tr>
          ))}
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

  let firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  let lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  useEffect(() => {
    getWorkersBySubsidiarie()

    getScalesBySubsidiarie()
  }, [])

  const getWorkersBySubsidiarie = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        let workersData = response.data

        let workersOptions = []

        workersData && workersData.map((worker) => {
          workersOptions.push({ "label": `${worker.worker_name} - ${worker.turn_name} - ${worker.function_name}`, "value": worker.worker_id })
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
    // pega os dias sem folga do mês
    let diasDoMes = []

    let dataAtual = firstDay

    while (dataAtual <= lastDay) {
      diasDoMes.push(moment(dataAtual).format("DD-MM-YYYY"))

      dataAtual.setDate(dataAtual.getDate() + 1)
    }

    let diasSemFolga = diasDoMes.filter(dia => !daysOffStore.some(diaFolga => diaFolga === dia))

    // calcula proporção e verifica se tem mais de 8 dias consecutivos
    let allDates = [...diasSemFolga, ...daysOffStore].sort()

    let options = []

    allDates?.map((date) => {
      if (daysOffStore.includes(date)) {
        options.push({ dayOff: true, value: date })
      } else if (diasSemFolga.includes(date)) {
        options.push({ dayOff: false, value: date })
      }
    })

    let diasConsecutivos = []

    let contador = 0

    let dataFolga = null

    let temMaisDeOitoDiasConsecutivos = false

    options.forEach((dia, index) => {
      if (dia.dayOff === true) {
        diasConsecutivos.push({
          dias: contador,
          dataFolga: dia.value
        })
        contador = 0
      } else {
        contador++
        if (contador > 8) {
          temMaisDeOitoDiasConsecutivos = true
        }
      }
    })

    let proporcoes = diasConsecutivos.map((item, index) => {
      return {
        folga: index + 1,
        data: item.dataFolga,
        proporcao: `${item.dias}x1`
      }
    })

    let formData = {
      worker_id: selectedWorkerId,
      subsidiarie_id: selectedSubsdiarie.value,
      days_on: `[${diasSemFolga.map(dia => `'${dia}'`).join(',')}]`,
      days_off: `[${daysOffStore.map(dia => `'${dia}'`).join(',')}]`,
      need_alert: temMaisDeOitoDiasConsecutivos ? true : false,
      proportion: JSON.stringify(proporcoes)
    }

    console.log(formData)
    debugger

    if (eval(formData.days_off).length == 0) {
      Swal.fire({
        title: "Erro",
        text: "Não é possível salvar sem dias de folga",
        icon: "error",
        confirmButtonText: "OK"
      })

      return
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

      const isDayOff = daysOffStore.some(diaFolga => diaFolga === day)

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
        setExistentWorkerDaysOff(response.data)
      })
  }

  const handlePrintScale = () => {
    const content = ReactDOMServer.renderToString(printContent(scalesList))

    const printWindow = window.open('', '_blank')

    printWindow.document.write(`
      <html>
        <head>
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
        <div className="row">
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
            onChange={(value) => {
              setSelectedDate(value)

              setCalendarPopupOpen(true)
            }}
            minDate={firstDay}
            maxDate={lastDay}
          />
        </div>

        <button id="help" className="btn btn-warning mt-3 me-2" onClick={setTour}><Question /></button>

        <button id="print-scale" className="btn btn-light mt-3 me-2" onClick={handlePrintScale}><Printer /></button>

        <button id="save-scale" className="btn btn-success mt-3" onClick={handleSaveDaysOff}>Salvar</button>

        <div className="table-responsive mt-3">
          <table id="scale-table" className="table table-hover table-bordered table-striped text-center">
            <thead className="table-dark">
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
                    {scale.days_on?.map((dia, index) => (
                      <div key={index}>
                        <span className="badge text-bg-success">{dia}</span>
                      </div>
                    ))}
                  </td>
                  <td>
                    {scale.days_off?.map((dia, index) => (
                      <div key={index}>
                        <span className="badge text-bg-danger">{dia}</span>
                      </div>
                    ))}
                  </td>
                  <td className="text-center">
                    {JSON.parse(scale.proportion).map((item) => (
                      <div key={item.data}>
                        <span className="badge text-bg-primary">
                          {item.data}: {item.proporcao}
                        </span>
                      </div>
                    ))}
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

        {/* <div className="table-responsive mt-3">
          <table id="scale-table" className="table table-hover">
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
                scalesList?.map((scale) => (
                  <tr>
                    <td>{scale.worker.name}</td>

                    <td>
                      {scale.days_on?.map(dia => (
                        <div>
                          <span className="badge text-bg-success">{dia}</span>
                        </div>
                      ))}
                    </td>

                    <td>
                      {scale.days_off?.map(dia => (
                        <div>
                          <span className="badge text-bg-danger">{dia}</span>
                        </div>
                      ))}
                    </td>

                    <td className="text-center">
                      {
                        JSON.parse(scale.proportion).map(item => (
                          <div key={item.data}>
                            <span className="badge text-bg-primary">
                              {item.data}: {item.proporcao}
                            </span>
                          </div>
                        ))
                      }
                    </td>

                    <td>
                      <div className="d-inline-flex">
                        <button id="delete-scale" className="btn btn-danger mt-2 me-2" onClick={() => handleDeleteScale(scale.id)}>
                          <Trash />
                        </button>

                        {
                          scale.need_alert === true && (
                            <>
                              <button id="alert-scale" title="Alerta de usuário com mais de 8 dias consecutivos" className="btn btn-warning mt-2 me-2">
                                <ExclamationTriangle />
                              </button>
                            </>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div> */}
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
      />

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

export default Scales
