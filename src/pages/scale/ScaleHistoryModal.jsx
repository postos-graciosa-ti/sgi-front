import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import { format } from "date-fns"

const ScaleHistoryModal = (props) => {
  const { scaleHistoryModalOpen, setScaleHistoryModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  let today = new Date()

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  const [validationResults, setValidationResults] = useState([])

  const [report, setReport] = useState({})

  useEffect(() => {
    if (scaleHistoryModalOpen) {
      api
        .post(`/validate_monthly_scale/${selectedSubsdiarie.value}`, {
          "first_day": moment(today).format("DD-MM-YYYY"),
          "last_day": moment(monthLastDay).format("DD-MM-YYYY")
        })
        .then((response) => {
          setValidationResults(response.data.validation_results)
        })

      api
        .post(`/subsidiaries/${selectedSubsdiarie.value}/scales/report`, {
          "initial_date": moment(today).format("DD-MM-YYYY"),
          "final_date": moment(monthLastDay).format("DD-MM-YYYY")
        })
        .then((response) => {
          setReport(response.data)
        })

    }
  }, [scaleHistoryModalOpen])

  return (
    <Modal
      show={scaleHistoryModalOpen}
      onHide={() => setScaleHistoryModalOpen(false)}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Relatório de dias {selectedSubsdiarie.label}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col">
            {
              report &&
              report.primeiro_turno_report &&
              report.primeiro_turno_report.map((firstTurnReport, index) => (
                <>
                  <h5>
                    {
                      firstTurnReport.turno_info &&
                      `Turno 01 (${firstTurnReport.turno_info.start_time.replace(/:\d{2}$/, '')} - ${firstTurnReport.turno_info.end_time.replace(/:\d{2}$/, '')})`
                    }
                  </h5>

                  {
                    !firstTurnReport.turno_info && (
                      <div className="card mb-3">
                        <div className="card-body">
                          <div>
                            <b>{firstTurnReport.date && `Data: ${firstTurnReport.date}`}</b>
                          </div>

                          <div>
                            <i>
                              {
                                firstTurnReport.quantidade_frentistas == 0 && "Quantidade de frentistas: 0"
                                || firstTurnReport.quantidade_frentistas > 0 && `Quantidade de frentistas: ${firstTurnReport.quantidade_frentistas}`
                              }
                            </i>
                          </div>

                          <div>
                            <i>
                              {
                                firstTurnReport.quantidade_trocadores == 0 && "Quantidade de trocadores: 0"
                                || firstTurnReport.quantidade_trocadores > 0 && `Quantidade de trocadores de óleo: ${firstTurnReport.quantidade_trocadores}`
                              }
                            </i>
                          </div>

                          <div>
                            <i>{firstTurnReport.status && `Status: ${firstTurnReport.status}`}</i>
                          </div>

                          {
                            firstTurnReport.dados_frentistas.length > 0 && (
                              <div>
                                <span>
                                  <i>
                                    <b>
                                      Frentistas:
                                    </b>
                                  </i>
                                </span>

                                <ul>
                                  {firstTurnReport.dados_frentistas.map((frentista) => (
                                    <li key={frentista.dados.name}>{frentista.dados.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }

                          {
                            firstTurnReport.dados_trocadores.length > 0 && (
                              <div>
                                <span>
                                  <i>
                                    <b>
                                      Trocadores:
                                    </b>
                                  </i>
                                </span>

                                <ul>
                                  {firstTurnReport.dados_trocadores.map((trocador) => (
                                    <li key={trocador.dados.name}>{trocador.dados.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>

          <div className="col">
            {
              report &&
              report.segundo_turno_report &&
              report.segundo_turno_report.map((secondTurnReport, index) => (
                <>
                  <h5>
                    {
                      secondTurnReport.turno_info &&
                      `Turno 02 (${secondTurnReport.turno_info.start_time.replace(/:\d{2}$/, '')} - ${secondTurnReport.turno_info.end_time.replace(/:\d{2}$/, '')})`
                    }
                  </h5>

                  {
                    !secondTurnReport.turno_info && (
                      <div className="card mb-3">
                        <div className="card-body">
                          <div>
                            <b>
                              {secondTurnReport.date && `Data: ${secondTurnReport.date}`}
                            </b>
                          </div>

                          <div>
                            <i>
                              {
                                secondTurnReport.quantidade_frentistas == 0 && "Quantidade de frentistas: 0"
                                || secondTurnReport.quantidade_frentistas > 0 && `Quantidade de frentistas: ${secondTurnReport.quantidade_frentistas}`
                              }
                            </i>
                          </div>

                          <div>
                            <i>
                              {
                                secondTurnReport.quantidade_trocadores == 0 && "Quantidade de trocadores de óleo: 0"
                                || secondTurnReport.quantidade_trocadores > 0 && `Quantidade de trocadores de óleo: ${secondTurnReport.quantidade_trocadores}`
                              }
                            </i>
                          </div>

                          <div>
                            <i>
                              {secondTurnReport.status && `Status: ${secondTurnReport.status}`}
                            </i>
                          </div>

                          {
                            secondTurnReport.dados_frentistas.length > 0 && (
                              <div>
                                <span>
                                  <i>
                                    <b>
                                      Frentistas:
                                    </b>
                                  </i>
                                </span>

                                <ul>
                                  {secondTurnReport.dados_frentistas.map((frentista) => (
                                    <li key={frentista.dados.name}>{frentista.dados.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }

                          {
                            secondTurnReport.dados_trocadores.length > 0 && (
                              <div>
                                <span>
                                  <i>
                                    <b>
                                      Trocadores:
                                    </b>
                                  </i>
                                </span>

                                <ul>
                                  {secondTurnReport.dados_trocadores.map((trocador) => (
                                    <li key={trocador.dados.name}>{trocador.dados.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>

          <div className="col">
            {
              report &&
              report.terceiro_turno_report &&
              report.terceiro_turno_report.map((thirdTurnReport, index) => (
                <>
                  <h5>
                    {thirdTurnReport.turno_info && `Turno 03 (${thirdTurnReport.turno_info.start_time.replace(/:\d{2}$/, '')} - ${thirdTurnReport.turno_info.end_time.replace(/:\d{2}$/, '')})`}
                  </h5>

                  {
                    !thirdTurnReport.turno_info && (
                      <div className="card mb-3">
                        <div className="card-body">
                          <div>
                            <b>
                              {thirdTurnReport.date && `Data: ${thirdTurnReport.date}`}
                            </b>
                          </div>

                          <div>
                            <i>
                              {
                                thirdTurnReport.quantidade_frentistas == 0 && "Quantidade de frentistas: 0"
                                || thirdTurnReport.quantidade_frentistas > 0 && `Quantidade de frentistas: ${thirdTurnReport.quantidade_frentistas}`
                              }
                            </i>
                          </div>

                          <div>
                            <i>
                              {
                                thirdTurnReport.quantidade_trocadores == 0 && "Quantidade de trocadores de óleo: 0"
                                || thirdTurnReport.quantidade_trocadores > 0 && `Quantidade de trocadores de óleo: ${thirdTurnReport.quantidade_trocadores}`
                              }
                            </i>
                          </div>

                          <div>
                            <i>
                              {thirdTurnReport.status && `Status: ${thirdTurnReport.status}`}
                            </i>
                          </div>

                          {
                            thirdTurnReport.dados_frentistas.length > 0 && (
                              <div>
                                <span>
                                  <i>
                                    <b>
                                      Frentistas:
                                    </b>
                                  </i>
                                </span>

                                <ul>
                                  {thirdTurnReport.dados_frentistas.map((frentista) => (
                                    <li key={frentista.dados.name}>{frentista.dados.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }

                          {
                            thirdTurnReport.dados_trocadores.length > 0 && (
                              <div>
                                <span>
                                  <i>
                                    <b>
                                      Trocadores:
                                    </b>
                                  </i>
                                </span>

                                <ul>
                                  {thirdTurnReport.dados_trocadores.map((trocador) => (
                                    <li key={trocador.dados.name}>{trocador.dados.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={() => setScaleHistoryModalOpen(false)}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScaleHistoryModal 
