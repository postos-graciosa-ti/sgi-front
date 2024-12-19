import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Printer, Question, Trash } from 'react-bootstrap-icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import ReactSelect from 'react-select'
import Nav from "../../components/Nav"
import useUserSessionStore from '../../data/userSession'
import mountTour from '../../functions/mountTour'
import api from '../../services/api'
import DeleteScaleModal from './DeleteScaleModal'
import SignatureScaleModal from './SignatureScaleModal'

// const Scale = () => {
//   const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

//   const [allScales, setAllScales] = useState()

//   const [workersTurnList, setWorkersTurnList] = useState()

//   const [selectedTurn, setSelectedTurn] = useState()

//   const [workersList, setWorkersList] = useState()

//   const [selectedWorker, setSelectedWorker] = useState()

//   const [monthsList, setMonthsList] = useState()

//   const [selectedDates, setSelectedDates] = useState()

//   const [seeButton, setSeeButton] = useState(false)

//   const [selectedMonth, setSelectedMonth] = useState()

//   const [scales, setScales] = useState([])

//   const [selectedScale, setSelectedScale] = useState()

//   const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(new Date(2024, 11, 1))

//   const [lastDayCurrentMonth, setLastDayCurrentMonth] = useState(new Date(2024, 11, 31))

//   const [turnWorkersOnTrack, setTurnWorkersOnTrack] = useState([])

//   const [workersOnTrack, setWorkersOnTrack] = useState([])

//   useEffect(() => {
//     getAllScales()

//     getWorkersTurns()
//   }, [])

//   useEffect(() => {
//     GetWorkersByTurnAndSubsidiarie()

//     GetMonths()
//   }, [selectedTurn])

//   useEffect(() => {
//     if (selectedTurn && selectedWorker && selectedMonth && scales) {
//       getWorkerScalesByMonth()
//     }
//   }, [selectedMonth])

//   useEffect(() => {
//     console.log("teste")

//     console.log(selectedMonth)

//     setFirstDayCurrentMonth(new Date(2024, selectedMonth - 1, 1))

//     setLastDayCurrentMonth(new Date(2024, selectedMonth, 0))
//   }, [selectedMonth])

//   const getAllScales = () => {
//     api
//       .get('/scales')
//       .then((response) => {
//         response.data && response.data.map((scale) => {
//           console.log(JSON.parse(scale.scale.date.replace(/'/g, '"')))
//         })

//         setAllScales(response.data)
//       })
//   }

//   const getWorkersTurns = () => {
//     getTurns()
//       .then((response) => {
//         let workerTurnsData = response.data

//         let workersTurnsOptions = []

//         workerTurnsData && workerTurnsData.map((turn) => {
//           workersTurnsOptions.push({ "label": turn.name, "value": turn.id })
//         })

//         setWorkersTurnList(workersTurnsOptions)
//       })
//   }

//   const GetWorkersByTurnAndSubsidiarie = () => {
//     getWorkersByTurnAndSubsidiarie(selectedTurn, selectedSubsdiarie.value)
//       .then((response) => {
//         let workersData = response.data

//         let workersDataOptions = []

//         workersData && workersData.map((worker) => {
//           workersDataOptions.push({ "label": worker.name, "value": worker.id })
//         })

//         setWorkersList(workersDataOptions)
//       })
//   }

//   const GetMonths = () => {
//     getMonths()
//       .then((response) => {
//         let monthsData = response.data

//         let monthsDataOptions = []

//         monthsData && monthsData.map((month) => {
//           monthsDataOptions.push({ "label": month.name, "value": month.id })
//         })

//         setMonthsList(monthsDataOptions)
//       })
//   }

//   const handleOnChangeDates = (value) => {
//     setSeeButton(true)

//     setSelectedDates((prevState) => {
//       return (
//         prevState ? [...prevState, moment(value).format("DD-MM-YYYY")]
//           : [moment(value).format("DD-MM-YYYY")]
//       )
//     })
//   }

//   const getWorkerScalesByMonth = () => {
//     api
//       .get(`/scale/worker/${selectedWorker}/month/${selectedMonth}`)
//       .then((response) => {
//         let options = []

//         let scales = eval(response.data.date)

//         scales.map((scale) => {
//           options.push(scale)
//         })

//         setScales(options)

//         setSelectedScale(response.data.id)
//       })
//       .catch((error) => console.error(error))
//   }

//   const handleFindWorkersOnTrack = () => {
//     api
//       .get(`/workers/on-track/turn/${turnWorkersOnTrack}/subsidiarie/${selectedSubsdiarie.value}`)
//       .then((response) => {
//         console.log(response.data)

//         setWorkersOnTrack(response.data)
//       })
//   }

//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//       const day = moment(date).format("DD-MM-YYYY")

//       return scales.some(scale => scale === day) ? 'highlight' : null
//     }

//     return null
//   }

//   const handleSaveDates = () => {
//     let needPutMethod = scales.length > 0 && true || false

//     if (needPutMethod) {
//       let dates = [...scales, ...selectedDates]

//       let formData = {
//         date: `[${dates.map(date => `'${date}'`).join(',')}]`,
//         worker_id: selectedWorker,
//         month_id: selectedMonth
//       }

//       putScale(selectedScale, formData)
//         .then(() => {
//           getWorkerScalesByMonth()

//           handleFindWorkersOnTrack()

//           getAllScales()

//           setSeeButton(false)
//         })

//     } else {
//       let formData = {
//         date: `[${selectedDates.map(date => `'${date}'`).join(',')}]`,
//         worker_id: selectedWorker,
//         month_id: selectedMonth
//       }

//       postScale(formData)
//         .then(() => {
//           getWorkerScalesByMonth()

//           handleFindWorkersOnTrack()

//           getAllScales()

//           setSeeButton(false)
//         })
//     }
//   }

//   // const [turnWorkersOnTrack, setTurnWorkersOnTrack] = useState([])

//   // const [workersOnTrack, setWorkersOnTrack] = useState([])

//   // const handleFindWorkersOnTrack = () => {
//   //   api
//   //     .get(`/workers/on-track/turn/${turnWorkersOnTrack}/subsidiarie/${selectedSubsdiarie.value}`)
//   //     .then((response) => {
//   //       console.log(response.data)

//   //       setWorkersOnTrack(response.data)
//   //     })
//   // }

//   const setTour = () => {
//     let route = location.pathname

//     let driverObj = mountTour(route)

//     driverObj.drive()
//   }

//   const handleResetScale = () => {
//     resetScale(selectedWorker, selectedMonth)
//       .then(() => {
//         getWorkerScalesByMonth()

//         handleFindWorkersOnTrack()

//         getAllScales()

//         setSeeButton(false)

//         api
//           .get(`/scale/worker/${selectedWorker}/month/${selectedMonth}`)
//           .then((response) => {
//             let scalesData = response.data

//             let scalesDataOptions = []

//             scalesData && scalesData.map((scale) => {
//               scalesDataOptions.push(scale.date)
//             })

//             setScales(scalesDataOptions)
//           })
//           .catch((error) => console.error(error))
//       })
//   }

//   return (
//     <>
//       <Nav />

//       <div className="container">
//         <button id="help" className="btn btn-warning mb-3 me-2" onClick={setTour}>
//           <Question />
//         </button>

//         {
//           seeButton && (
//             <>
//               <button
//                 className="btn btn-success mb-3 me-2"
//                 onClick={handleSaveDates}
//               >
//                 Salvar
//               </button>

//               <button className='btn btn-danger mb-3' onClick={handleResetScale}>
//                 Resetar escala
//               </button>
//             </>
//           )
//         }

//         <div className="row">
//           <div className="col">

//             <div id="scale-container">
//               <div className="row mb-3">
//                 <div className="col">
//                   <ReactSelect
//                     className="disable"
//                     placeholder="Filial"
//                     value={{ "value": selectedSubsdiarie.value, "label": selectedSubsdiarie.label }}
//                   />
//                 </div>

//                 <div className="col">
//                   <ReactSelect
//                     placeholder="Turnos"
//                     options={workersTurnList}
//                     onChange={(e) => {
//                       setScales([])
//                       setSelectedTurn(e.value)
//                     }}
//                   />
//                 </div>

//                 <div className="col">
//                   <ReactSelect
//                     placeholder="Colaborador"
//                     options={workersList}
//                     onChange={(e) => {
//                       setScales([])
//                       setSelectedWorker(e.value)
//                     }}
//                   />
//                 </div>

//                 <div className="col">
//                   <ReactSelect
//                     placeholder="Mês"
//                     options={monthsList}
//                     onChange={(e) => {
//                       setScales([])
//                       setSelectedMonth(e.value)
//                     }}
//                   />
//                 </div>
//               </div>

//               <Calendar
//                 value={selectedDates}
//                 onChange={(value) => handleOnChangeDates(value)}
//                 className="w-100 rounded-3"
//                 tileClassName={tileClassName}
//                 minDate={firstDayCurrentMonth}
//                 maxDate={lastDayCurrentMonth}
//               />
//             </div>

//             {/* <div id="scale-table" className="mt-3">
//               <div className="table-responsive">
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th>Mês</th>
//                       <th>Colaborador</th>
//                       <th>Folgas</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {allScales && allScales.map((scale, index) => (
//                       <tr key={index}>
//                         <td>{scale.month.name}</td>
//                         <td>{scale.worker.name}</td>
//                         <td>
//                           <div className="badge-container">
//                             {scale.scale.date && JSON.parse(scale.scale.date.replace(/'/g, '"')).map((date, dateIndex) => (
//                               <>
//                                 <span key={dateIndex} className="badge text-bg-primary">
//                                   {date}&nbsp;
//                                 </span>
//                               </>
//                             ))}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div> */}
//           </div >

//           <div id="scale-track" className="col">
//             <h4 className="mb-4">Funcionários na pista neste turno</h4>

//             <div className="row">
//               <div className="col">
//                 <div>
//                   <ReactSelect
//                     placeholder="Turno"
//                     options={workersTurnList}
//                     onChange={(e) => {
//                       setTurnWorkersOnTrack(e.value)
//                     }}
//                   />
//                 </div>

//                 <div className="table-responsive mt-3">
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>Nome do colaborador</th>

//                         <th>Função</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {
//                         workersOnTrack?.map((onTrack) => (
//                           <tr>
//                             <td>{onTrack.worker_name}</td>

//                             <td>{onTrack.function_name}</td>
//                           </tr>
//                         ))
//                       }
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="col">
//                 <button className="btn btn-success" onClick={handleFindWorkersOnTrack}>
//                   Buscar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           .highlight {
//             background-color: #ECFFDC;
//             color: grey;
//             // border-radius: 50%;
//           }
//         `}
//       </style>

//     </>
//   )
// }

// export default Scale

const Scales = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [scalesList, setScalesList] = useState()

  const [selectedScale, setSelectedScale] = useState()

  const [selectedDate, setSelectedDate] = useState()

  const [workersOptions, setWorkersOptions] = useState()

  const [selectedWorkersOn, setSelectedWorkersOn] = useState()

  const [selectedWorkersOff, setSelectedWorkersOff] = useState()

  const [seeButton, setSeeButton] = useState(false)

  const [deleteScaleModalOpen, setDeleteScaleModalOpen] = useState(false)

  const [signatureScaleModalOpen, setSignatureScaleModalOpen] = useState(false)

  useEffect(() => {
    api
      .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
      .then((response) => setScalesList(response.data))

    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        let workersData = response.data

        let workersOptions = []

        workersData && workersData.map((worker) => {
          workersOptions.push({ "label": worker.name, "value": worker.id })
        })

        setWorkersOptions(workersOptions)
      })
  }, [])

  const handleOnChangeWorkersOn = (workers) => {
    let workersOnIds = []

    workers?.map((worker) => {
      workersOnIds.push(worker.value)
    })

    setSelectedWorkersOn(workersOnIds)
  }

  const handleOnChangeWorkersOff = (workers) => {
    let workersOffIds = []

    workers?.map((worker) => {
      workersOffIds.push(worker.value)
    })

    setSelectedWorkersOff(workersOffIds)
  }

  const handleSubmitScales = () => {
    let formData = {
      date: moment(selectedDate).format("DD/MM/YYYY"),
      subsidiarie_id: selectedSubsdiarie.value,
      workers_on: `[${selectedWorkersOn.join(',')}]`,
      workers_off: `[${selectedWorkersOff.join(',')}]`
    }

    console.log(formData)

    api
      .post("/scales", formData)
      .then(() => {
        setSeeButton(false)

        api
          .get(`/scales/subsidiaries/${selectedSubsdiarie.value}`)
          .then((response) => setScalesList(response.data))
      })
  }

  const setTour = () => {
    let route = location.pathname

    let driverObj = mountTour(route)

    driverObj.drive()
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div id="scale-container" className="row">
          <div className="col">
            <ReactSelect
              isDisabled={true}
              value={{ "label": moment(selectedDate).format("DD-MM-YYYY"), "value": moment(selectedDate).format("DD-MM-YYYY") }}
            />
          </div>

          <div className="col">
            <ReactSelect
              placeholder="Funcionários de folga"
              options={workersOptions}
              onChange={(e) => handleOnChangeWorkersOn(e)}
              isMulti={true}
            />
          </div>

          <div className="col">
            <ReactSelect
              placeholder="Funcionários trabalhando"
              options={workersOptions}
              onChange={(e) => handleOnChangeWorkersOff(e)}
              isMulti={true}
            />
          </div>
        </div>

        <div id="scale-calendar" className="row">
        <Calendar
          className="w-100 rounded-3 mt-3"
          onChange={(value) => {
            setSelectedDate(value)

            setSeeButton(true)
          }}
        />
        </div>

        <div className='d-inline-flex mb-3 mt-3'>
          <button id="help" className='btn btn-warning me-2' onClick={setTour}>
            <Question />
          </button>

          <button id="print" className='btn btn-light' onClick={() => setSignatureScaleModalOpen(true)}>
            <Printer />
          </button>

          {
            seeButton && (
              <div className="ms-2">
                <button className="btn btn-success" onClick={handleSubmitScales}>Salvar</button>
              </div>
            )
          }
        </div>

        <div id="scale-table" className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Data</th>

                <th>Funcionários de folga</th>

                <th>Funcionários trabalhando</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                scalesList?.map((scale) => (
                  <tr>
                    <td>{moment(scale.date).format('DD/MM/YYYY')}</td>

                    <td>
                      {
                        scale.workers_on.map((worker) => (
                          <span className="badge text-bg-primary" key={worker.id}>{worker.name}</span>
                        ))
                      }
                    </td>

                    <td>
                      {
                        scale.workers_off.map((worker) => (
                          <span className="badge text-bg-primary" key={worker.id}>{worker.name}</span>
                        ))
                      }
                    </td>

                    <td>
                      {/* <button
                        className="btn btn-warning mt-2 me-2"
                        onClick={() => {
                          setSelectedScale(scale)

                          setSignatureScaleModalOpen(true)
                        }}
                      >
                        <Pencil />
                      </button> */}

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setSelectedScale(scale)

                          setDeleteScaleModalOpen(true)
                        }}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <SignatureScaleModal
        signatureScaleModalOpen={signatureScaleModalOpen}
        setSignatureScaleModalOpen={setSignatureScaleModalOpen}
        selectedScale={selectedScale}
      />

      <DeleteScaleModal
        deleteScaleModalOpen={deleteScaleModalOpen}
        setDeleteScaleModalOpen={setDeleteScaleModalOpen}
        selectedScale={selectedScale}
        setScalesList={setScalesList}
      />
    </>
  )
}

export default Scales
