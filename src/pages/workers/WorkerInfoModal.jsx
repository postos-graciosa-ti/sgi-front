import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Select from '../../components/form/Select'

const WorkerInfoModal = (props) => {
  const { workerInfoModalOpen, setWorkerInfoModalOpen, selectedWorker, setSelectedWorker } = props

  const fieldsOptions = [
    { value: "esocial", label: "E-social" },
    { value: "enrolment", label: "Matrícula" },
    { value: "sales_code", label: "Código de vendas" },
    { value: "timecode", label: "Código de ponto" },
    { value: "worker_name", label: "Nome" },
    { value: "function_name", label: "Função" },
    { value: "turn_name", label: "Turno" },
    { value: "cost_center", label: "Centro de custo" },
    { value: "department", label: "Setor" },
    { value: "admission_date", label: "Data de admissão" },
  ]

  const [selectedFields, setSelectedFields] = useState()

  const handleClose = () => {
    setSelectedFields()

    setSelectedWorker()

    setWorkerInfoModalOpen(false)
  }

  return (
    <Modal
      show={workerInfoModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Informações de colaborador</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <Select
            options={fieldsOptions}
            placeholder={"Buscar campos"}
            isMulti={true}
            setSelectedValue={setSelectedFields}
          />
        </div>

        {
          selectedFields?.map((field) => (
            <div className="input-group mb-3">
              <span className="input-group-text fw-bold">{field.label}</span>

              <textarea
                className="form-control"
                aria-label="With textarea"
                rows={1}
                value={selectedWorker && selectedWorker[field.value] || "Não consta registro"}
                disabled
              />
            </div>
          ))
        }

        {
          !selectedFields && (
            <>
              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">E-social</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.esocial || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Matrícula</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.worker_enrolment || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Código de vendas</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.worker_sales_code || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Código de ponto</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.timecode || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Nome</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.worker_name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Função</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.function_name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Turno</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.turn_name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Centro de custo</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.cost_center || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Setor</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.department || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de admissão</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={moment(selectedWorker?.admission_date).format("DD-MM-YYYY") || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Gênero</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.gender?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Estado civil</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.civil_status?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Logradouro</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.street || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Número</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.street_number || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Complemento</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.street_complement || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Bairro</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.neighborhood?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">CEP</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.cep || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Cidade</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.city?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Estado</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.state?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Telefone</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.phone || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Celular</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.mobile || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">E-mail</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.email || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Etnia</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.ethnicity?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de nascimento</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker && moment(selectedWorker?.birthdate).format("DD-MM-YYYY") || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Cidade de nascimento</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.birthcity?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Estado de nascimento</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.birthstate?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Nome do pai</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.fathername || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Nome da mãe</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.mothername || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">CPF</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.cpf || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">RG</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.rg || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Órgão emissor de RG</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.rg_issuing_agency || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Estado de RG</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.rg_state || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de expedição de RG</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={moment(selectedWorker?.rg_expedition_date).format("DD-MM-YYYY") || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Certificado de reservista</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.military_cert_number || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">PIS</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.pis || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de cadastro de PIS</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.pis_register_date || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Título de eleitor</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.votant_title || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Zona eleitoral</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.votant_zone || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Sessão eleitoral</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.votant_session || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">CTPS</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.ctps || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Série de CTPS</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.ctps_serie || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Estado de CTPS</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.ctps_state?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de emissão de CTPS</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={moment(selectedWorker?.ctps_emission_date).format("DD-MM-YYYY") || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">CNH</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.cnh || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Categoria de CNH</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.cnh_category || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de emissão de CNH</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={moment(selectedWorker?.cnh_emition_date).format("DD-MM-YYYY") || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Validade de CNH</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={moment(selectedWorker?.cnh_valid_date).format("DD-MM-YYYY") || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Primeiro emprego?</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.first_job && "Sim" || "Não"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Já foi funcionário da empresa?</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.was_employee && "Sim" || "Não"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Deu contribuição sindical nesse ano?</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.union_contribute_current_year && "Sim" || "Não"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Recebendo seguro desemprego?</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.receiving_unemployment_insurance && "Sim" || "Não"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Experiência prévia na função?</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.previous_experience && "Sim" || "Não"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Salário mensal</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.month_wage || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Salário por hora</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.hour_wage || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Salário proporcional à jornada</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.journey_wage || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Vale transporte</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.transport_voucher || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Quantidade de vale transporte</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.transport_voucher_quantity || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Jornada de trabalho diária</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.diary_workjourney || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Jornada de trabalho semanal</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.week_workjourney || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Jornada de trabalho mensal</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.month_workjourney || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Tempo de experiência</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.experience_time || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Horas noturnas</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.nocturne_hours || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Periculosidade</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.dangerousness || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Insalubridade</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.unhealthy || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Método de pagamento</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.wage_payment_method || "Não consta registro"}
                  disabled
                />
              </div>
            </>
          )
        }

        {
          !selectedWorker?.worker_is_active && (
            <div className="bg-danger p-4 rounded">
              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Razão de demissão</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.resignation_reason_name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de demissão</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.resignation_date || "Não consta registro"}
                  disabled
                />
              </div>
            </div>
          )
        }

        {
          selectedWorker?.is_away && (
            <div className="bg-warning p-3 rounded">
              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Razão de afastamento</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.away_reason?.name || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de afastamento</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.away_start_date || "Não consta registro"}
                  disabled
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text fw-bold">Data de retorno</span>

                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  rows={1}
                  value={selectedWorker?.away_end_date || "Não consta registro"}
                  disabled
                />
              </div>
            </div>
          )
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WorkerInfoModal