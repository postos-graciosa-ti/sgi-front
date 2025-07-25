import { useEffect, useState } from "react"
import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"

const dailyActivities = [
  { value: 1, label: "Limpeza da boca de descarga de combustível" },
  { value: 2, label: "Limpeza do pátio" },
  { value: 3, label: "Limpeza das bombas de combustível" },
  { value: 4, label: "Limpeza do banheiro clientes (lixo, papel, sabonete)" },
  { value: 5, label: "Limpeza do banheiro (interno loja caixa - manhã)" },
  { value: 6, label: "Limpeza do banheiro (interno loja caixa - tarde)" },
]

const weeklyActivities = [
  { value: 1, label: "Armazenamento do Lixo Contaminante" },
  { value: 2, label: "Drenagem dos Tanques" },
  { value: 3, label: "Sangria do Compressor" },
  { value: 4, label: "Limpeza Troca de Óleo (Carrinho, Rampa, filtros)" },
]

const biweeklyActivities = [
  { value: 1, label: "Inspeção e Limpeza do Sump das Bombas" },
  { value: 2, label: "Inspeção e Limpeza do Sump dos Tanques" },
  { value: 3, label: "Limpeza do Poço de Monitoramento" },
]

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]

const weeks = ["1° semana", "2° semana", "3° semana", "4° semana"]

const biweeks = [{ value: 1, label: "1ª quinzena" }, { value: 2, label: "2ª quinzena" }]

const ActivitiesRange = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [workersOptions, setWorkersOptions] = useState([])

  useEffect(() => {
    api
      .get(`/workers/subsidiarie/${selectedSubsidiarie?.value}`)
      .then((response) => {
        const options = response.data.map((option) => ({
          value: option.worker_id,
          label: option.worker_name.split(" ")[0],
          fullLabel: option.worker_name,
        }))

        setWorkersOptions(options)
      })
  }, [selectedSubsidiarie])

  const handlePrint = () => window.print()

  const renderTable = (title, activities, headers) => (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white fw-bold">{title}</div>

      <div className="card-body p-0">
        <table className="table table-bordered align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ minWidth: "250px" }}>
                {title.includes("Diário")
                  ? "Dia / Atividade"
                  : title.includes("Semanal")
                    ? "Semana / Atividade"
                    : "Quinzena / Atividade"}
              </th>

              {headers.map((header, idx) => (
                <th key={idx}>{header.label || header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity.value}>
                <td className="fw-semibold">{activity.label}</td>

                {headers.map((_, idx) => (
                  <td key={idx}>
                    <ReactSelect
                      options={workersOptions}
                      getOptionLabel={(e) => e.label}
                      formatOptionLabel={(e, { context }) =>
                        context === "value" ? e.label : e.label
                      }
                      className="select-fixed"
                      classNamePrefix="react-select"
                      placeholder="Selecionar"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <>
      <Nav />

      <h3 className="fw-bold mb-4">Escala de Atividades</h3>

      {!workersOptions.length ? (
        <div className="text-muted">Carregando colaboradores...</div>
      ) : (
        <>
          {renderTable("Diário", dailyActivities, days)}
          {renderTable("Semanal", weeklyActivities, weeks)}
          {renderTable("Quinzenal", biweeklyActivities, biweeks)}
        </>
      )}

      <button
        className="btn btn-primary w-100 mt-4 d-print-none"
        onClick={handlePrint}
      >
        Imprimir
      </button>

      <style>{`
        .select-fixed {
          min-width: 140px;
        }

        @media print {
          .btn, nav, .d-print-none {
            display: none !important;
          }

          .react-select__control {
            border: none !important;
            box-shadow: none !important;
          }

          .react-select__input,
          .react-select__indicators {
            display: none !important;
          }

          .react-select__single-value {
            display: block !important;
          }
        }

        .react-select__control {
          min-height: 38px;
          border-radius: 0.25rem;
          border-color: #ced4da;
        }
      `}</style>
    </>
  )
}

export default ActivitiesRange
