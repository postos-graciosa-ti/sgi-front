import moment from "moment"

const FirstReviewPrintContent = ({ selectedSubsdiarie, selectedWorker, subsidiarieManager, subsidiarieCoordinator, personalPresentationOptions, firstReviewResponses, assinature }) => {
  return (
    <>
      <div>
        <img
          src="/logo.png"
          style={{ "width": "100px" }}
        />
      </div>

      <div>
        <h4>Avaliação de primeiro período de experiência de {selectedWorker?.worker_name}</h4>
      </div>

      <div><b>Filial</b>: {selectedSubsdiarie?.label}</div>

      <div><b>Data de admissão</b>: {moment(selectedWorker?.admission_date).format("DD-MM-YYYY")}</div>

      <div><b>Cargo</b>: {selectedWorker?.function_name}</div>

      <div><b>Centro de custos:</b> {selectedWorker?.cost_center}</div>

      <div><b>Setor</b>: {selectedWorker?.department}</div>

      <div><b>Gerente</b>: {subsidiarieManager?.name}</div>

      {
        subsidiarieCoordinator && (
          <div><b>Coordenador</b>: {subsidiarieCoordinator.name}</div>
        )
      }

      <div>
        <h4>Critérios de avaliação</h4>
      </div>

      <div>
        <span><b>01. Apresentação pessoal</b></span>
      </div>

      <div>
        {firstReviewResponses.personal_presentation || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>02. Produtividade / Qualidade de trabalho</b></span>
      </div>

      <div>
        {firstReviewResponses.productivity || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>03. Conhecimento do trabalho</b></span>
      </div>

      <div>
        {firstReviewResponses.knowledge || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>04. Cooperação</b></span>
      </div>

      <div>
        {firstReviewResponses.cooperation || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>05. Iniciativa</b></span>
      </div>

      <div>
        {firstReviewResponses.initiative || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>06. Relacionamento interpessoal</b></span>
      </div>

      <div>
        {firstReviewResponses.interpersonal_relationships || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>07. Aprendizagem</b></span>
      </div>

      <div>
        {firstReviewResponses.learning || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>08. Hierarquia e disciplina</b></span>
      </div>

      <div>
        {firstReviewResponses.hierarchy || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>09. Assiduidade e pontualidade</b></span>
      </div>

      <div>
        {firstReviewResponses.punctuality || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>10. Atendimento ao cliente</b></span>
      </div>

      <div>
        {firstReviewResponses.attendance || `Não avaliado`}
      </div>

      <div style={{ "marginTop": "10px" }}>
        <span><b>Aprovado ou reprovado</b></span>
      </div>

      <div>
        {firstReviewResponses.approved || `Não avaliado`}
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <div>Assinatura por ilustração (superior hierarquico):</div>

          <div>
            {assinature}
          </div>
        </div>

        <div className="grid-item">
          <div>Assinatura por ilustração (recursos humanos):</div>

          <div>Reigiane Souza / Mariele Sambrana Vera</div>
        </div>
      </div>

      <style>
        {
          `
            .grid-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-top: 50px;
            }
          `
        }
      </style>
    </>
  )
}

export default FirstReviewPrintContent