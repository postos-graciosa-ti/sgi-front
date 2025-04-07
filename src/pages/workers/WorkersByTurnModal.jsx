import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"
import { Printer } from "react-bootstrap-icons"
import ReactDOMServer from 'react-dom/server'
import WorkersByTurnPrintContent from "./WorkersByTurnPrintContent"
import { fieldsOptions } from "./fieldsOptions"

const WorkersByTurnModal = (props) => {
  const { workersByTurnModalOpen, setWorkersByTurnModalOpen } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [turnsOptions, setTurnsOptions] = useState()

  const [functionsOptions, setFunctionsOptions] = useState()

  // const fieldsOptions = [
  //   { value: "esocial", label: "E-social" },
  //   { value: "enrolment", label: "Matrícula" },
  //   { value: "sales_code", label: "Código de vendas" },
  //   { value: "timecode", label: "Código de ponto" },
  //   { value: "worker_name", label: "Nome" },
  //   { value: "function_name", label: "Função" },
  //   { value: "turn_name", label: "Turno" },
  //   { value: "cost_center_name", label: "Centro de custo" },
  //   { value: "department_name", label: "Setor" },
  //   { value: "admission_date", label: "Data de admissão" },
  //   { value: "gender", label: "Gênero" },
  //   { value: "civil_status", label: "Estado civil" },
  //   { value: "street", label: "Logradouro" },
  //   { value: "street_number", label: "Número" },
  //   { value: "street_complement", label: "Complemento" },
  //   { value: "neighborhood", label: "Bairro" },
  //   { value: "cep", label: "CEP" },
  //   { value: "city", label: "Cidade" },
  //   { value: "state", label: "estado" },
  //   { value: "phone", label: "Telefone" },
  //   { value: "mobile", label: "Celular" },
  //   { value: "emergency_number", label: "Número de emergência" },
  //   { value: "bank", label: "Banco" },
  //   { value: "bank_agency", label: "Agência do banco" },
  //   { value: "bank_account", label: "Conta bancária" },
  //   { value: "resignation_date", label: "Data de desligamento" },
  //   { value: "resignation_reason_id", label: "Motivo do desligamento" },
  //   { value: "picture", label: "Foto" },
  //   { value: "has_children", label: "Possui filhos" },
  //   { value: "children_data", label: "Dados dos filhos" },
  //   { value: "military_cert_number", label: "Certificado militar" },
  //   { value: "votant_title", label: "Título de eleitor" },
  //   { value: "votant_zone", label: "Zona eleitoral" },
  //   { value: "votant_session", label: "Sessão eleitoral" },
  //   { value: "cnh", label: "CNH" },
  //   { value: "cnh_category", label: "Categoria CNH" },
  //   { value: "cnh_emition_date", label: "Data de emissão da CNH" },
  //   { value: "cnh_valid_date", label: "Validade da CNH" },
  //   { value: "first_job", label: "Primeiro emprego" },
  //   { value: "was_employee", label: "Já foi colaborador" },
  //   { value: "union_contribute_current_year", label: "Contribuição sindical (ano atual)" },
  //   { value: "receiving_unemployment_insurance", label: "Recebendo seguro-desemprego" },
  //   { value: "previous_experience", label: "Experiência anterior" },
  //   { value: "month_wage", label: "Salário mensal" },
  //   { value: "hour_wage", label: "Salário por hora" },
  //   { value: "journey_wage", label: "Salário por jornada" },
  //   { value: "transport_voucher", label: "Vale transporte" },
  //   { value: "transport_voucher_quantity", label: "Qtd. vale transporte" },
  //   { value: "diary_workjourney", label: "Jornada diária" },
  //   { value: "week_workjourney", label: "Jornada semanal" },
  //   { value: "month_workjourney", label: "Jornada mensal" },
  //   { value: "experience_time", label: "Tempo de experiência" },
  //   { value: "nocturne_hours", label: "Horas noturnas" },
  //   { value: "dangerousness", label: "Periculosidade" },
  //   { value: "unhealthy", label: "Insalubridade" },
  //   { value: "wage_payment_method", label: "Forma de pagamento" },
  // ]

  const [selectedTurn, setSelectedTurn] = useState()

  const [selectedFunction, setSelectedFunction] = useState()

  const [selectedFields, setSelectedFields] = useState()

  const [workersByTurnAndFunction, setWorkersByTurnAndFunction] = useState()

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/turns`)
      .then((response) => {
        let options = response?.data.map((turn) => ({ label: turn.name, value: turn.id }))

        setTurnsOptions(options)
      })

    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/functions`)
      .then((response) => {
        let options = response?.data.map((func) => ({ label: func.name, value: func.id }))

        setFunctionsOptions(options)
      })
  }, [])

  const handleClose = () => {
    setSelectedTurn()

    setSelectedFunction()

    setWorkersByTurnAndFunction()

    setWorkersByTurnModalOpen(false)
  }

  const handleSubmit = () => {
    api
      .get(`/workers/subsidiarie/${selectedSubsdiarie?.value}`)
      .then((response) => {
        let result = []

        selectedTurn?.map((turn) => {
          selectedFunction?.map((func) => {
            response?.data?.map((worker) => {
              if (worker.function_id == func.value && worker.turn_id == turn.value) {
                result.push(worker)
              }
            })
          })
        })

        setWorkersByTurnAndFunction(result)
      })
  }

  const handlePrintWorkersByTurn = () => {
    const printableContent = ReactDOMServer.renderToString(
      <WorkersByTurnPrintContent
        workersByTurnAndFunction={workersByTurnAndFunction}
        selectedFields={selectedFields}
      />
    )

    printJS({
      printable: printableContent,
      type: 'raw-html',
      header: null,
    })
  }

  return (
    <Modal
      show={workersByTurnModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filtrar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <ReactSelect
            placeholder="Turno"
            options={turnsOptions}
            isMulti
            onChange={(value) => setSelectedTurn(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder="Function"
            options={functionsOptions}
            isMulti
            onChange={(value) => setSelectedFunction(value)}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            placeholder="Campos selecionados"
            options={fieldsOptions}
            isMulti
            onChange={(value) => setSelectedFields(value)}
          />
        </div>

        {
          workersByTurnAndFunction && (
            <>
              <div>
                <button className="btn btn-primary" onClick={handlePrintWorkersByTurn}>
                  <Printer />
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {
                        selectedFields?.map((field) => (
                          <th key={field.value}>
                            {field.label}
                          </th>
                        ))
                      }
                    </tr>
                  </thead>

                  <tbody>
                    {
                      workersByTurnAndFunction?.map((worker, index) => (
                        <tr key={index}>
                          {
                            selectedFields?.map((field) => (
                              <td key={field.value}>
                                {worker && worker[field.value]?.name || worker && worker[field.value]}
                              </td>
                            ))
                          }
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Buscar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkersByTurnModal