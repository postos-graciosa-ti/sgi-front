import { useEffect, useState } from "react"
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

  useEffect(() => {
    const fetchData = async () => {
      api
        .get("/workers-status")
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          throw new Error(`${error}`)
        })
    }

    fetchData()
  }, [])

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

  return (
    <>
      <Nav />

      <div className="container mt-4">
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

        <div className="alert alert-warning">
          <strong>Total geral de funcionários:</strong> {data.total_geral}
        </div>

        {ordemDesejada.map((nome, idx) => {
          const subsidiary = data.por_subsidiaria.find((s) => s.subsidiaria === nome)
          if (!subsidiary) return null

          return (
            <div key={idx} className="mb-4">
              <div className="alert alert-warning">
                <h5 className="mb-1">{subsidiary.subsidiaria}</h5>
                <p className="mb-2">
                  <strong>Total no posto:</strong> {subsidiary.total}
                </p>

                {subsidiary.turnos.map((turno, tIdx) => (
                  <div key={tIdx} className="mb-2 ps-3">
                    <strong>{turno.turno}</strong>
                    <ul className="ms-3">
                      {turno.funções.map((funcao, fIdx) => (
                        <li key={fIdx}>
                          <strong>{funcao.função}:</strong>{" "}
                          {funcao.funcionários.join(", ")}
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
