import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

const FirstReviewModal = (props) => {
  const { firstReviewModalOpen, setFirstReviewModalOpen, selectedWorker } = props

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [subsidiarieManager, setSubsidiarieManager] = useState()

  const [subsidiarieCoordinator, setSubsidiarieCoordinator] = useState()

  const personalPresentationOptions = [
    { value: 1, label: "Possui excelente apresentação pessoal e postura profissional, conforme parâmetros estabelecidos para a profissão." },
    { value: 2, label: "Porta-se adequadamente aos  parâmetros estabelecidos para a profissão quanto à apresentação pessoal e postura profissional." },
    { value: 3, label: "Dificilmente se porta adequadamente aos parâmetros estabelecidos para a profissão quanto à apresentação pessoal e postura profissional." },
    { value: 4, label: "Porta-se sempre de maneira inadequada quanto aos  parâmetros estabelecidos para a profissão em  relação  à apresentação pessoal e postura profissional." },
  ]

  const productivityOptions = [
    { value: 1, label: "Executa grande volume de trabalho em pouco tempo e com elevada Qualidade." },
    { value: 2, label: "Executa com qualidade o trabalho dentro do prazo estipulado." },
    { value: 3, label: "Executa o trabalho dentro do prazo, mas com pouca qualidade." },
    { value: 4, label: "Não executa o trabalho no prazo e a qualidade deixa a desejar." },
  ]

  const knowledgeOptions = [
    { value: 1, label: "Domina os conhecimentos sobre o trabalho." },
    { value: 2, label: "Tem conhecimento Suficiente sobre o trabalho" },
    { value: 3, label: "As vezes lhe faltam conhecimentos sobre o trabalho" },
    { value: 4, label: "Frequentemente demonstra ter pouco conhecimento sobre o trabalho" },
  ]

  const cooperationOptions = [
    { value: 1, label: "Tem excelente desempenho em equipe e sempre se oferece para ajudar os colegas." },
    { value: 2, label: "Trabalha bem em equipe e colabora normalmente com os colegas." },
    { value: 3, label: "Não costuma trabalhar bem em equipe ou ajudar os colegas." },
    { value: 4, label: "Nunca trabalha bem em equipe ou se dispõe a ajudar os colegas." },
  ]

  const initiativeOptions = [
    { value: 1, label: "Está sempre procurando novas soluções para os problemas e projetos a desenvolver." },
    { value: 2, label: "Às vezes procura desenvolver novos projetos ou solucionar problemas." },
    { value: 3, label: "Raramente tem iniciativa de buscar novos projetos ou identificar problemas." },
    { value: 4, label: "Nunca procura desenvolver novos projetos ou identificar problemas que possa solucionar." },
  ]

  const interpersonalRelationships = [
    { value: 1, label: "Sempre se relaciona muito bem com os colegas e contribui enormemente para o bom ambiente de trabalho." },
    { value: 2, label: "Relaciona-se normalmente com os colegas e não  costuma se envolver em  conflitos." },
    { value: 3, label: "Tem relacionamento razoável com os colegas, mas às vezes se envolve em conflitos." },
    { value: 4, label: "Nunca se relaciona bem com  os colegas e frequentemente se envolve em  conflitos." },
  ]

  const learningOptions = [
    { value: 1, label: "Demonstra excepcional facilidade em  aprender e dominar rapidamente novos métodos de trabalho." },
    { value: 2, label: "Aprende normalmente novos métodos de trabalho." },
    { value: 3, label: "Às vezes apresenta dificuldade em aprender novos métodos de trabalho." },
    { value: 4, label: "Sempre apresenta grandes dificuldades no aprendizado de novos métodos de trabalho." },
  ]

  const hierarchyOptions = [
    { value: 1, label: "Sempre cumpre com respeito e dedicação as ordens que lhe são transmitidas." },
    { value: 2, label: "Cumpre normalmente e a contento as ordens que lhe são transmitidas." },
    { value: 3, label: "Às vezes apresenta dificuldade em lidar com seu superior hierárquico e em cumprir suas ordens." },
    { value: 4, label: "Nunca cumpre as ordens e frequentemente desrespeita seu  superior hierárquico." },
  ]

  const punctualityOptions = [
    { value: 1, label: "Apresenta ótimos índices de assiduidade no trabalho e é pontual nos compromissos." },
    { value: 2, label: "Raramente falta ao trabalho, sendo as raras ausências justificadas, e é geralmente pontual nos compromissos." },
    { value: 3, label: "Frequentemente falta ao trabalho sem justificar sua ausência e raramente é pontual nos compromissos." },
    { value: 4, label: "Quase nunca está presente no trabalho, não justifica suas faltas e nunca é pontual nos compromissos." },
  ]

  const attendanceOptions = [
    { value: 1, label: "Atende o cliente de maneira humanizada com presteza enaltecendo a imagem da unidade de negócio junto ao cliente." },
    { value: 2, label: "Atende o cliente de maneira profissional com presteza e dedicação sem ocorrência de reclamações por parte do cliente." },
    { value: 3, label: "Atende o cliente com pouco profissionalismo gerando, às vezes, reclamações por parte do cliente." },
    { value: 4, label: "Atende o cliente de forma desrespeitosa, desinteressada e sem profissionalismo, gerando muitas reclamações por parte do cliente." },
  ]

  const [selectedPersonalPresentationOption, setSelectedPersonalPresentationOption] = useState()

  const [selectedProductivityOption, setSelectedProductivityOption] = useState()

  const [selectedKnowledgeOption, setSelectedKnowledgeOption] = useState()

  const [selectedCooperationOption, setSelectedCooperationOption] = useState()

  const [selectedInitiativeOption, setSelectedInitiativeOption] = useState()

  const [selectedInterpersonalRelationshipsOption, setSelectedInterpersonalRelationshipsOption] = useState()

  const [selectedLearningOption, setSelectedLearningOption] = useState()

  const [selectedHierarchyOption, setSelectedHierarchyOption] = useState()

  const [selectedPunctualityOption, setSelectedPunctualityOption] = useState()

  const [selectedAttendanceOption, setSelectedAttendanceOption] = useState()

  const [selectedWorkerReviewData, setSelectedWorkerReviewData] = useState()

  useEffect(() => {
    api
      .get(`/workers/${selectedWorker?.worker_id}/first-review`)
      .then((response) => {
        setSelectedWorkerReviewData(response.data)
      })
  }, [firstReviewModalOpen])

  useEffect(() => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}`)
      .then((response) => {
        let subsidiarieData = response?.data

        api
          .get(`/users/${subsidiarieData?.manager}`)
          .then((response) => {
            setSubsidiarieManager(response.data)
          })

        api
          .get(`/users/${subsidiarieData?.coordinator}`)
          .then((response) => {
            setSubsidiarieCoordinator(response.data)
          })
      })
  }, [])

  const handleClose = () => {
    setSelectedWorkerReviewData()

    setSelectedPersonalPresentationOption()

    setFirstReviewModalOpen(false)
  }

  const handleSubmit = () => {
    let formData = {
      worker_id: selectedWorker?.worker_id,
      personal_presentation: selectedPersonalPresentationOption?.label,
      productivity: selectedProductivityOption?.label,
      knowledge: selectedKnowledgeOption?.label,
      cooperation: selectedCooperationOption?.label,
      initiative: selectedInitiativeOption?.label,
      interpersonal_relationships: selectedInterpersonalRelationshipsOption?.label,
      learning: selectedLearningOption?.label,
      hierarchy: selectedHierarchyOption?.label,
      punctuality: selectedPunctualityOption?.label,
      attendance: selectedAttendanceOption?.label,
    }

    api
      .post(`/workers/${selectedWorker?.worker_id}/first-review`, formData)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={firstReviewModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Avaliação de primeiro período de experiência</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-2">
          <div><b>Filial</b>: {selectedSubsdiarie?.label}</div>

          <div><b>Colaborador</b>: {selectedWorker?.worker_name}</div>

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
        </div>

        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <p><b>01. Apresentação pessoal</b></p>

              <p>Impressão que  o colaborador transmite em relação a postura profissional e maneira de se vestir, uso  correto de identificação, uniforme e outros.</p>

              <ReactSelect
                options={personalPresentationOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedPersonalPresentationOption(value)}
                defaultValue={personalPresentationOptions.find((option) => option.label === selectedWorkerReviewData?.personal_presentation)}
              />
            </div>

            <div className="mb-3">
              <p><b>02. Produtividade / Qualidade de trabalho</b></p>

              <p>Volume de trabalho realizado em determinado tempo (Eficiência/Eficácia).</p>

              <ReactSelect
                options={productivityOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedProductivityOption(value)}
                defaultValue={{ value: 0, label: selectedWorkerReviewData?.productivity }}
              />
            </div>

            {/* <ReviewFields
              title={"03. Conhecimento do trabalho"}
              description={"‘Expertise”, perícia na função exercida."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>03. Conhecimento do trabalho</b></p>

              <p>‘Expertise”, perícia na função exercida.</p>

              <ReactSelect
                options={knowledgeOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedKnowledgeOption(value)}
              />
            </div>

            {/* <ReviewFields
              title={"04. Cooperação"}
              description={"Presteza e capacidade de ajudar e se relacionar com os colegas de equipe."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>04. Cooperação</b></p>

              <p>Presteza e capacidade de ajudar e se relacionar com os colegas de equipe.</p>

              <ReactSelect
                options={cooperationOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedCooperationOption(value)}
              />
            </div>

            {/* <ReviewFields
              title={"05. Iniciativa"}
              description={"Capacidade de identificar novas tarefas, projetos e problemas e se prontificar a assumi-los."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>05. Iniciativa</b></p>

              <p>Capacidade de identificar novas tarefas, projetos e problemas e se prontificar a assumi-los.</p>

              <ReactSelect
                options={initiativeOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedInitiativeOption(value)}
              />
            </div>
          </div>

          <div className="col-6">
            {/* <ReviewFields
              title={"06. Relacionamento interpessoal"}
              description={"Capacidade de se relacionar bem com os colegas, promovendo um bom ambiente de trabalho."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>06. Relacionamento interpessoal</b></p>

              <p>Capacidade de se relacionar bem com os colegas, promovendo um bom ambiente de trabalho.</p>

              <ReactSelect
                options={interpersonalRelationships}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedInterpersonalRelationshipsOption(value)}
              />
            </div>

            {/* <ReviewFields
              title={"07. Aprendizagem"}
              description={"Facilidade de aprender novos métodos de trabalho."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>07. Aprendizagem</b></p>

              <p>Facilidade de aprender novos métodos de trabalho.</p>

              <ReactSelect
                options={learningOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedLearningOption(value)}
              />
            </div>

            {/* <ReviewFields
              title={"08. Hierarquia e disciplina"}
              description={"Capacidade de respeitar e cumprir ordens que lhe são transmitidas."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>08. Hierarquia e disciplina</b></p>

              <p>Capacidade de respeitar e cumprir ordens que lhe são transmitidas.</p>

              <ReactSelect
                options={hierarchyOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedHierarchyOption(value)}
              />
            </div>

            {/* <ReviewFields
              title={"09. Assiduidade e pontualidade"}
              description={"Diz respeito à frequência e regularidade com que alguém cumpre suas tarefa e à capacidade de chegar no horário estabelecido para compromissos e atividades."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>09. Assiduidade e pontualidade</b></p>

              <p>Diz respeito à frequência e regularidade com que alguém cumpre suas tarefa e à capacidade de chegar no horário estabelecido para compromissos e atividades.</p>

              <ReactSelect
                options={punctualityOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedPunctualityOption(value)}
              />
            </div>

            {/* <ReviewFields
              title={"10. Atendimento ao cliente"}
              description={"Maneira como lida com os clientes da unidade de negócio."}
              options={productivityOptions}
            /> */}

            <div className="mb-3">
              <p><b>10. Atendimento ao cliente</b></p>

              <p>Maneira como lida com os clientes da unidade de negócio.</p>

              <ReactSelect
                options={attendanceOptions}
                placeholder="Selecione a resposta que melhor se aplica"
                onChange={(value) => setSelectedAttendanceOption(value)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit} disabled={selectedWorkerReviewData && true || false}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FirstReviewModal