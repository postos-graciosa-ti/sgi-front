import { useEffect, useState } from "react"
import { Printer } from "react-bootstrap-icons"
import Select from "react-select"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import Nav from "../../components/Nav"
import api from "../../services/api"

const WorkersStatus = () => {
  const [data, setData] = useState(null)
  const [turnoFiltro, setTurnoFiltro] = useState([])
  const [funcaoFiltro, setFuncaoFiltro] = useState([])

  useEffect(() => {
    api.get("/workers-status")
      .then((response) => setData(response.data))
      .catch((error) => {
        throw new Error(`${error}`)
      })
  }, [])

  const turnoValues = turnoFiltro.map(option => option.value)
  const funcaoValues = funcaoFiltro.map(option => option.value)

  const printSubsidiary = (subsidiary) => {
    const turnosFiltrados = subsidiary.turnos
      .filter(turno => turnoValues.length === 0 || turnoValues.includes(turno.turno))
      .map(turno => ({
        ...turno,
        funções: turno.funções.filter(funcao => funcaoValues.length === 0 || funcaoValues.includes(funcao.função))
      }))
      .filter(turno => turno.funções.length > 0)

    const content = `
      <html>
        <head>
          <title>${subsidiary.subsidiaria}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #333; }
            strong { display: inline-block; margin-top: 10px; }
            ul { margin-left: 20px; }
          </style>
        </head>
        <body>
          <h2>${subsidiary.subsidiaria}</h2>
          <p><strong>Total no posto:</strong> ${subsidiary.total}</p>
          ${turnosFiltrados.map(turno => `
            <div>
              <strong>${turno.turno}</strong>
              <ul>
                ${turno.funções.map(funcao => `
                  <li>
                    <strong>${funcao.função} (${funcao.funcionários.length}):</strong>
                    ${funcao.funcionários.join(", ")}
                  </li>
                `).join("")}
              </ul>
            </div>
          `).join("")}
        </body>
      </html>
    `
    const printWindow = window.open("", "", "width=800,height=600")
    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  if (!data) {
    return <div className="container mt-4">Carregando...</div>
  }

  const ordemDesejada = [
    "Posto Graciosa - Matriz",
    "Auto Posto Fátima",
    "Posto Bemer",
    "Posto Jariva",
    "Posto Graciosa V",
    "Auto Posto Piraí"
  ]

  const apelidos = {
    "Posto Graciosa - Matriz": "Graciosa",
    "Auto Posto Fátima": "Fátima",
    "Posto Bemer": "Bemer",
    "Posto Jariva": "Jariva",
    "Posto Graciosa V": "Graciosa V",
    "Auto Posto Piraí": "Piraí"
  }

  const chartSubsidiarias = ordemDesejada
    .map((nome) => {
      const item = data.por_subsidiaria.find((s) => s.subsidiaria === nome)
      return item ? { name: apelidos[nome], total: item.total } : null
    })
    .filter(Boolean)

  const turnosUnicos = Array.from(
    new Set(data.por_subsidiaria.flatMap(s => s.turnos.map(t => t.turno)))
  )

  const funcoesUnicas = Array.from(
    new Set(data.por_subsidiaria.flatMap(s =>
      s.turnos.flatMap(t => t.funções.map(f => f.função))
    ))
  )

  const turnoOptions = turnosUnicos.map(t => ({ value: t, label: t }))
  const funcaoOptions = funcoesUnicas.map(f => ({ value: f, label: f }))

  return (
    <>
      <Nav />

      <div className="container mt-4">
        <div className="alert alert-warning">
          <strong>Total geral de funcionários:</strong> {data.total_geral}
        </div>

        <div style={{ width: "100%", height: 300 }} className="mb-4">
          <ResponsiveContainer>
            <BarChart data={chartSubsidiarias}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#f0ad4e" name="Funcionários" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="row mb-3">
          <div className="col">
            <Select
              options={turnoOptions}
              value={turnoFiltro}
              onChange={setTurnoFiltro}
              isClearable
              isMulti
              placeholder="Turnos"
            />
          </div>
          <div className="col">
            <Select
              options={funcaoOptions}
              value={funcaoFiltro}
              onChange={setFuncaoFiltro}
              isClearable
              isMulti
              placeholder="Funções"
            />
          </div>
        </div>

        {ordemDesejada.map((nome, idx) => {
          const subsidiary = data.por_subsidiaria.find((s) => s.subsidiaria === nome)
          if (!subsidiary) return null

          const turnosFiltrados = subsidiary.turnos
            .filter(turno => turnoValues.length === 0 || turnoValues.includes(turno.turno))
            .map(turno => ({
              ...turno,
              funções: turno.funções.filter(funcao => funcaoValues.length === 0 || funcaoValues.includes(funcao.função))
            }))
            .filter(turno => turno.funções.length > 0)

          if (turnosFiltrados.length === 0) return null

          return (
            <div key={idx} className="mb-4">
              <div className="alert alert-warning">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-1">{subsidiary.subsidiaria}</h5>
                  <button
                    className="btn btn-light"
                    onClick={() => printSubsidiary({ ...subsidiary, turnos: turnosFiltrados })}
                    title="Imprimir"
                  >
                    <Printer />
                  </button>
                </div>

                <p className="mb-2">
                  <strong>Total no posto:</strong> {subsidiary.total}
                </p>

                {turnosFiltrados.map((turno, tIdx) => (
                  <div key={tIdx} className="mb-2 ps-3">
                    <strong>{turno.turno}</strong>
                    <ul className="ms-3">
                      {turno.funções.map((funcao, fIdx) => (
                        <li key={fIdx}>
                          <strong>{funcao.função} ({funcao.funcionários.length}):</strong>{" "}
                          <span>{funcao.funcionários.join(", ")}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default WorkersStatus
