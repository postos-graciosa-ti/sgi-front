import moment from "moment"

const WorkerDataPrintContent = ({ selectedWorker, cityData, parentsData }) => {
  return (
    <>
      <div>
        <img src="/logo.png" style={{ width: '80px' }} />
      </div>

      <div>
        <h4>Dados pessoais</h4>
      </div>

      <div style={{ "display": "grid", "gridTemplateColumns": "1fr 1fr 1fr" }}>
        <div>
          <span><b>Nome</b>: {selectedWorker?.worker_name || 'não informado'}</span>
        </div>

        <div>
          <span><b>Gênero</b>: {selectedWorker?.gender?.name || 'não informado'}</span>
        </div>

        <div>
          <span><b>Estado civil</b>: {selectedWorker?.civil_status?.id || 'não informado'}</span>
        </div>
      </div>

      <div style={{ "display": "grid", "gridTemplateColumns": "1fr 1fr 1fr 1fr" }}>
        <div>
          <span><b>Número de emergência</b>: {selectedWorker?.emergency_number || 'não informado'}</span>
        </div>

        <div>
          <span><b>E-social</b>: {selectedWorker?.esocial || 'não informado'}</span>
        </div>

        <div>
          <span><b>Código de acesso</b>: {selectedWorker?.worker_enrolment || 'não informado'}</span>
        </div>

        <div>
          <span><b>Código de ponto</b>: {selectedWorker?.timecode || 'não informado'}</span>
        </div>
      </div>

      <div>
        <h4>Endereço residencial</h4>
      </div>

      <div style={{ "display": "grid", "gridTemplateColumns": "1fr 1fr 1fr" }}>
        <div>
          <span><b>Logradouro</b>: {selectedWorker?.street || 'não informado'}</span>
        </div>

        <div>
          <span><b>Número</b>: {selectedWorker?.street_number || 'não informado'}</span>
        </div>

        <div>
          <span><b>Complemento</b>: {selectedWorker?.street_complement || 'não informado'}</span>
        </div>
      </div>

      <div style={{ "display": "grid", "gridTemplateColumns": "repeat(3, 1fr)" }}>
        <div>
          <span><b>CEP</b>: {selectedWorker?.cep || 'não informado'}</span>
        </div>

        <div>
          <span><b>Cidade</b>: {cityData.name || 'não informado'}</span>
        </div>

        <div>
          <span><b>Bairro</b>: {selectedWorker?.neighborhood?.name || 'não informado'}</span>
        </div>
      </div>

      <h4>Dados pessoais</h4>

      <div style={{ "display": "grid", "gridTemplateColumns": "repeat(4, 1fr)" }}>
        <div>
          <span><b>Telefone fixo</b>: {selectedWorker?.phone || 'não informado'}</span>
        </div>

        <div>
          <span><b>Celular</b>: {selectedWorker?.mobile || 'não informado'}</span>
        </div>

        <div>
          <span><b>E-mail</b>: {selectedWorker?.email || 'não informado'}</span>
        </div>

        <div>
          <span><b>Etnia</b>: {selectedWorker?.ethnicity?.name || 'não informado'}</span>
        </div>
      </div>

      <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 1fr)" }}>
        <div>
          <span><b>Data de nascimento</b>: {selectedWorker?.birthdate || 'não informado'}</span>
        </div>

        <div>
          <span><b>Cidade</b>: {selectedWorker?.city?.name || 'não informado'}</span>
        </div>
      </div>

      <div style={{ "display": "grid", "gridTemplateColumns": "repeat(2, 1fr)" }}>
        <div>
          <span><b>Nome da mãe</b>: {selectedWorker?.mothername || 'não informado'}</span>
        </div>

        <div>
          <span><b>Nome do pai</b>: {selectedWorker?.fathername || 'não informado'}</span>
        </div>
      </div>

      {
        parentsData?.map((parent) => {
          <>
            ${parent?.name} / ${parent.cpf} / ${moment(parent.birthdate).format("DD/MM/YYYY")} / ${parent.books && parent.books || "Não"} / ${parent.papers && parent.papers || "Não"}
          </>
        })
      }

      <h4>Documentos</h4>

      <div>
        <span><b>CPF</b>: {selectedWorker?.cpf || 'não informado'}</span>
      </div>
    </>
  )
}

export default WorkerDataPrintContent