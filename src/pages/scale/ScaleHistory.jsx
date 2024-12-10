import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Printer } from 'react-bootstrap-icons'
import 'react-calendar/dist/Calendar.css'
import ReactSelect from "react-select"
import Swal from 'sweetalert2'
import Nav from "../../components/Nav"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const ScaleHistory = () => {

  const [scales, setScales] = useState()

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  useEffect(() => {
    api
      .get(`/scales/subsidiarie/${selectedSubsdiarie.value}`)
      .then((response) => {
        setScales(response.data)
      })
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        {
          scales && scales.map((scale) => (
            <div className='card mb-3 p-2' key={scale.date}>
              <p>
                <b>
                  {scale.date}
                </b>
              </p>

              {scale.workers && scale.workers.map((worker) => (
                <>
                  <div className="row">
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

export default ScaleHistory
