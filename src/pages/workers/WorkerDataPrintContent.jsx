import dayjs from 'dayjs';

const WorkerDataPrintContent = ({ selectedWorker, selectedSubsdiarie }) => {
  const labelMap = {
    subsidiarie_id: "Filial",
    away_reason_id: "Motivo de Afastamento",
    function_id: "Função",
    cost_center_id: "Centro de Custo",
    hierarchy_structure: "Estrutura Hierárquica",
    department_id: "Departamento",
    gender_id: "Gênero",
    ctps_state: "UF CTPS",
    rg_state: "UF RG",
    birthcity: "Cidade de Nascimento",
    birthstate: "Estado de Nascimento",
    turn_id: "Turno",
    ethnicity_id: "Etnia",
    civil_status_id: "Estado Civil",
    school_level: "Escolaridade",
    neighborhood_id: "Bairro",
    city: "Cidade",
    state: "Estado",
    bank: "Banco",
    resignation_reason_id: "Motivo de Demissão",
    cnh_category: "Categoria CNH",
    wage_payment_method: "Forma de Pagamento",

    enrolment: "Matrícula",
    name: "Nome",
    is_active: "Ativo",
    is_away: "Afastado",
    away_start_date: "Início do Afastamento",
    away_end_date: "Fim do Afastamento",
    time_away: "Tempo Afastado",
    esocial: "E-social",
    cbo: "CBO",
    general_function_code: "Código da Função",
    ctps: "CTPS",
    ctps_serie: "Série CTPS",
    ctps_emission_date: "Data de Emissão da CTPS",
    pis: "PIS",
    pis_register_date: "Data de Registro do PIS",
    cpf: "CPF",
    rg: "RG",
    rg_issuing_agency: "Órgão Expedidor do RG",
    rg_expedition_date: "Data de Expedição do RG",
    fathername: "Nome do Pai",
    mothername: "Nome da Mãe",
    birthdate: "Data de Nascimento",
    nationality: "Nacionalidade",
    admission_date: "Data de Admissão",
    enterprise_time: "Tempo de Empresa",
    wage: "Salário",
    first_review_date: "1ª Avaliação",
    second_review_date: "2ª Avaliação",
    last_function_date: "Data da Última Função",
    current_function_time: "Tempo na Função Atual",
    email: "E-mail",
    street: "Rua",
    street_number: "Número",
    street_complement: "Complemento",
    cep: "CEP",
    phone: "Telefone",
    mobile: "Celular",
    emergency_number: "Telefone de Emergência",
    bank_agency: "Agência Bancária",
    bank_account: "Conta Bancária",
    resignation_date: "Data de Demissão",
    sales_code: "Código de Vendas",
    picture: "Foto",
    timecode: "Código de Ponto",
    has_children: "Tem Filhos?",
    children_data: "Dados dos Filhos",
    military_cert_number: "Número do Certificado Militar",
    votant_title: "Título de Eleitor",
    votant_zone: "Zona Eleitoral",
    votant_session: "Sessão Eleitoral",
    cnh: "CNH",
    cnh_emition_date: "Data de Emissão da CNH",
    cnh_valid_date: "Validade da CNH",
    first_job: "Primeiro Emprego?",
    was_employee: "Já foi Funcionário?",
    union_contribute_current_year: "Contribuição Sindical no Ano",
    receiving_unemployment_insurance: "Recebendo Seguro-Desemprego",
    previous_experience: "Experiência Anterior",
    month_wage: "Salário Mensal",
    hour_wage: "Salário por Hora",
    journey_wage: "Salário por Jornada",
    transport_voucher: "Vale Transporte",
    transport_voucher_quantity: "Qtd. VT",
    diary_workjourney: "Jornada Diária",
    week_workjourney: "Jornada Semanal",
    month_workjourney: "Jornada Mensal",
    experience_time: "Tempo de Experiência",
    nocturne_hours: "Horas Noturnas",
    dangerousness: "Periculosidade",
    unhealthy: "Insalubridade",
    early_payment: "Antecipação Salarial",
    harmfull_exposition: "Exposição Nociva",
    has_experience_time: "Tem Tempo de Experiência?",
    has_nocturne_hours: "Tem Horas Noturnas?",
    propotional_payment: "Pagamento Proporcional",
    total_nocturne_workjourney: "Total de Jornada Noturna",
    twenty_five_workjourney: "Jornada 25%",
    twenty_two_to_five_week_workjourney: "Jornada 22h-5h Semanal",
    twenty_two_to_five_month_workjourney: "Jornada 22h-5h Mensal",
    twenty_two_to_five_effective_diary_workjourney: "22h-5h Efetiva Diária",
    healthcare_plan: "Plano de Saúde",
    healthcare_plan_discount: "Desconto do Plano de Saúde",
    life_insurance: "Seguro de Vida",
    life_insurance_discount: "Desconto do Seguro de Vida",
    ag: "Agência",
    cc: "Conta Corrente",
    early_payment_discount: "Desconto da Antecipação",
  };

  const formatValue = (key, value) => {
    if (!value) return "-";

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return value.map((v) => formatValue(key, v)).join(", ");
      }
      return value.name || JSON.stringify(value);
    }

    if (key === 'birthdate' || key === 'admission_date') {
      return dayjs(value).format("DD/MM/YYYY");
    }

    return value;
  };

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>
        <div style={{ marginLeft: '8px' }}>
          {selectedSubsdiarie?.label}
        </div>
      </div>

      <div style={{ margin: "20px" }}>
        <h4>Ficha de colaborador</h4>
      </div>

      {Object.entries(selectedWorker || {}).map(([key, value]) => (
        <div key={key} style={{ margin: "20px" }}>
          <span>
            <b>{labelMap[key] || capitalize(key)}</b>: {formatValue(key, value)}
          </span>
        </div>
      ))}
    </>
  );
};

export default WorkerDataPrintContent;
