import moment from "moment"
import { useEffect, useState } from "react"
import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import ScaleConfigModal from "./ScaleConfigModal"
import Calendar from "react-calendar"
import SundayModal from "./modals/SundayModal"

const Scale = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [scaleConfiOpen, setScaleConfiOpen] = useState(false)

  const [dateMonths, setDateMonths] = useState([])

  const [scalesList, setScalesList] = useState([])

  const [frentistasOptions, setFrentistasOptions] = useState([])

  const [caixasOptions, setCaixasOptions] = useState([])

  const [trocadoresDeOleo, setTrocadoresDeOleo] = useState([])

  console.log(scalesList)

  useEffect(() => {
    const monthFirstDay = moment().startOf("month")

    const monthLastDay = moment().endOf("month")

    const datesOptions = []

    for (let i = moment(monthFirstDay); i.isBefore(monthLastDay); i.add(1, "day")) {
      datesOptions.push({
        date: i.format("DD-MM-YYYY"),
        dayOfWeek: i.format("dddd"),
      })
    }

    setDateMonths(datesOptions)

    api
      .get(`subsidiaries/${selectedSubsdiarie.value}/frentistas`)
      .then((response) => {
        let options = []

        {
          response.data && response.data.map((frentista) => {
            options.push({ "label": frentista.name, "value": frentista.id })
          })
        }

        setFrentistasOptions(options)
      })

    api
      .get(`subsidiaries/${selectedSubsdiarie.value}/caixas`)
      .then((response) => {
        let options = []

        {
          response.data && response.data.map((caixa) => {
            options.push({ "label": caixa.name, "value": caixa.id })
          })
        }

        setCaixasOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/trocadores-de-oleo`)
      .then((response) => {
        let options = []

        {
          response.data && response.data.map((trocadorDeOleo) => {
            options.push({ "label": trocadorDeOleo.name, "value": trocadorDeOleo.id })
          })
        }

        setTrocadoresDeOleo(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie.value}/sla-scale`)
      .then((response) => setScalesList(response.data))

  }, [])

  const translateDayOfWeek = (day) => {
    const translations = {
      sunday: "domingo",
      Sunday: "domingo",
      Monday: "segunda-feira",
      Tuesday: "terça-feira",
      Wednesday: "quarta-feira",
      Thursday: "quinta-feira",
      Friday: "sexta-feira",
      Saturday: "sábado",
    }

    return translations[day] || day
  }

  return (
    <>
      <Nav />

      <div id="init" className="container">
        <h1>Versão ainda não funcional, somente tela para fins de protótipo</h1>

        <div className="row">
          <div className="col">
            <button className="btn btn-primary mb-3" onClick={() => setScaleConfiOpen(true)}>
              Configurar Escala
            </button>
          </div>

          <div className="col">
            <button className="btn btn-success">salvar</button>
          </div>
        </div>

        {
          dateMonths.map(({ date, dayOfWeek }) => (
            <div className="card mb-3" key={date}>
              <div className="card-body">


                <h5 className="card-title">{`${date} - ${translateDayOfWeek(dayOfWeek)}`}</h5>

                {/* <h6 className="card-subtitle mb-2 text-body-secondary">Selecionar</h6> */}

                {
                  translateDayOfWeek(dayOfWeek) == "domingo" && (
                    <>

                      <div className="mb-3">
                        <h5 className="card-title">Turno 01 (06h:00 - 14h:00):</h5>

                        <div className="row">
                          <div className="col">
                            <label>Frentista 01:</label>

                            <ReactSelect
                              options={frentistasOptions}
                            />

                            <label>Frentista 02:</label>

                            <ReactSelect
                              options={frentistasOptions}
                            />

                            <label>Frentista 03:</label>

                            <ReactSelect
                              options={frentistasOptions}
                            />
                          </div>

                          <div className="col">
                            <label>Caixa 01:</label>

                            <ReactSelect
                              options={caixasOptions}
                            />

                            <label>Caixa 02:</label>

                            <ReactSelect
                              options={caixasOptions}
                            />

                            <label>Caixa 03:</label>

                            <ReactSelect
                              options={caixasOptions}
                            />
                          </div>

                          <div className="col">
                            <label>Trocador de óleo:</label>
                            <ReactSelect
                              options={trocadoresDeOleo}
                            />
                          </div>

                          <div className="col">
                            <label>Folgando:</label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="card-title">Turno 02 (14h:00 - 22h:00):</h5>

                        <div className="row">
                          <div className="col">
                            <label>Frentista 01:</label>

                            <ReactSelect
                              options={frentistasOptions}
                            />

                            <label>Frentista 02:</label>

                            <ReactSelect
                              options={frentistasOptions}
                            />

                            <label>Frentista 03:</label>

                            <ReactSelect
                              options={frentistasOptions}
                            />
                          </div>

                          <div className="col">
                            <label>Caixa 01:</label>

                            <ReactSelect
                              options={caixasOptions}
                            />

                            <label>Caixa 02:</label>

                            <ReactSelect
                              options={caixasOptions}
                            />

                            <label>Caixa 03:</label>

                            <ReactSelect
                              options={caixasOptions}
                            />
                          </div>

                          <div className="col">
                            <label>Trocador de óleo:</label>
                            <ReactSelect
                              options={trocadoresDeOleo}
                            />
                          </div>

                          <div className="col">
                            <label>Folgando:</label>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>

      <ScaleConfigModal
        scaleConfiOpen={scaleConfiOpen}
        setScaleConfigOpen={setScaleConfiOpen}
      />
    </>
  );
};

export default Scale;