import moment from 'moment'
import { useEffect, useState } from 'react'
import { Printer } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import ReactSelect from "react-select"
import useUserSessionStore from '../../data/userSession'
import useWorkersExperienceTimeStore from '../../data/workersExperienceTime'
import api from '../../services/api'
import FirstReviewPrintContent from './FirstReviewPrintContent'
import { approvedOptions, attendanceOptions, cooperationOptions, hierarchyOptions, initiativeOptions, interpersonalRelationshipsOptions, knowledgeOptions, learningOptions, personalPresentationOptions, productivityOptions, punctualityOptions } from "./reviewsOptionsEnum"

const hasGoodAvaliation = (criteria) => {
  if (criteria && criteria.value == 1 || criteria && criteria.value == 2) {
    return true
  } else {
    return false
  }
}

const FirstReviewModal = (props) => {
  const { firstReviewModalOpen, setFirstReviewModalOpen, selectedWorker, setSelectedWorker, setExperienceTimeModalOpen } = props

  const userSession = useUserSessionStore((state) => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const setWorkersFirstReview = useWorkersExperienceTimeStore(state => state.setWorkersFirstReview)

  const setWorkersSecondReview = useWorkersExperienceTimeStore(state => state.setWorkersSecondReview)

  const [subsidiarieManager, setSubsidiarieManager] = useState()

  const [subsidiarieCoordinator, setSubsidiarieCoordinator] = useState()

  const [firstReviewResponses, setFirstReviewResponses] = useState()

  const [selectedPersonalPresentation, setSelectedPersonalPresentation] = useState()

  const [selectedProductivity, setSelectedProductivity] = useState()

  const [selectedKnowledge, setSelectedKnowledge] = useState()

  const [selectedCooperation, setSelectedCooperation] = useState()

  const [selectedInitiative, setSelectedInitiative] = useState()

  const [selectedInterpersonalRelationship, setSelectedInterpersonalRelationship] = useState()

  const [selectedLearning, setSelectedLearning] = useState()

  const [selectedHierarchy, setSelectedHierarchy] = useState()

  const [selectedPunctuality, setSelectedPunctuality] = useState()

  const [selectedAttendance, setSelectedAttendance] = useState()

  const [selectedApproved, setSelectedApproved] = useState()

  const [hasGoodPersonalPresentation, setHasGoodPersonalPresentation] = useState(false)

  const [hasGoodProductivity, setHasGoodProductivity] = useState(false)

  const [hasGoodKnowledge, setHasGoodKnowledge] = useState(false)

  const [hasGoodCooperation, setHasGoodCooperation] = useState(false)

  const [hasGoodInitiative, setHasGoodInitiative] = useState(false)

  const [hasGoodInterpersonalRelationship, setHasGoodInterpersonalRelationship] = useState(false)

  const [hasGoodLearning, setHasGoodLearning] = useState(false)

  const [hasGoodHierarchy, setHasGoodHierarchy] = useState(false)

  const [hasGoodPunctuality, setHasGoodPunctuality] = useState(false)

  const [hasGoodAttendance, setHasGoodAttendance] = useState(false)

  useEffect(() => {
    if (firstReviewModalOpen) {
      api
        .get(`/workers/${selectedWorker?.worker_id}/first-review`)
        .then((response) => {
          setHasGoodPersonalPresentation(
            hasGoodAvaliation(
              personalPresentationOptions.find((option) => option.label == response.data.personal_presentation)
            )
          )

          setHasGoodProductivity(
            hasGoodAvaliation(
              productivityOptions.find((option) => option.label === response.data.productivity)
            )
          )

          setHasGoodKnowledge(
            hasGoodAvaliation(
              knowledgeOptions.find((option) => option.label === response.data.knowledge)
            )
          )

          setHasGoodCooperation(
            hasGoodAvaliation(
              cooperationOptions.find((option) => option.label === response.data.cooperation)
            )
          )

          setHasGoodInitiative(
            hasGoodAvaliation(
              initiativeOptions.find((option) => option.label === response.data.initiative)
            )
          )

          setHasGoodInterpersonalRelationship(
            hasGoodAvaliation(
              interpersonalRelationshipsOptions.find((option) => option.label === response.data.interpersonal_relationships)
            )
          )

          setHasGoodLearning(
            hasGoodAvaliation(
              learningOptions.find((option) => option.label === response.data.learning)
            )
          )

          setHasGoodHierarchy(
            hasGoodAvaliation(
              hierarchyOptions.find((option) => option.label === response.data.hierarchy)
            )
          )

          setHasGoodPunctuality(
            hasGoodAvaliation(
              punctualityOptions.find((option) => option.label === response.data.punctuality)
            )
          )

          setHasGoodAttendance(
            hasGoodAvaliation(
              attendanceOptions.find((option) => option.label === response.data.attendance)
            )
          )

          setFirstReviewResponses(response.data)
        })
    }

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

  useEffect(() => {
    setHasGoodPersonalPresentation(hasGoodAvaliation(selectedPersonalPresentation))

    setHasGoodProductivity(hasGoodAvaliation(selectedProductivity))

    setHasGoodKnowledge(hasGoodAvaliation(selectedKnowledge))

    setHasGoodCooperation(hasGoodAvaliation(selectedCooperation))

    setHasGoodInitiative(hasGoodAvaliation(selectedInitiative))

    setHasGoodInterpersonalRelationship(hasGoodAvaliation(selectedInterpersonalRelationship))

    setHasGoodLearning(hasGoodAvaliation(selectedLearning))

    setHasGoodHierarchy(hasGoodAvaliation(selectedHierarchy))

    setHasGoodPunctuality(hasGoodAvaliation(selectedPunctuality))

    setHasGoodAttendance(hasGoodAvaliation(selectedAttendance))

  }, [
    selectedPersonalPresentation,
    selectedProductivity,
    selectedKnowledge,
    selectedCooperation,
    selectedInitiative,
    selectedInterpersonalRelationship,
    selectedLearning,
    selectedHierarchy,
    selectedPunctuality,
    selectedAttendance,
  ])

  const handleClose = () => {
    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/workers/experience-time-no-first-review`)
      .then((response) => setWorkersFirstReview(response?.data))

    api
      .get(`/subsidiaries/${selectedSubsdiarie?.value}/workers/experience-time-no-second-review`)
      .then((response) => setWorkersSecondReview(response?.data))

    setSelectedWorker()

    setFirstReviewResponses()

    setSelectedPersonalPresentation()

    setSelectedProductivity()

    setSelectedKnowledge()

    setSelectedCooperation()

    setSelectedInitiative()

    setSelectedInterpersonalRelationship()

    setSelectedLearning()

    setSelectedHierarchy()

    setSelectedPunctuality()

    setSelectedAttendance()

    setSelectedApproved()

    setFirstReviewModalOpen(false)

    setExperienceTimeModalOpen(false)

    setHasGoodPersonalPresentation(false)

    setHasGoodProductivity(false)

    setHasGoodKnowledge(false)

    setHasGoodCooperation(false)

    setHasGoodInitiative(false)

    setHasGoodInterpersonalRelationship(false)

    setHasGoodLearning(false)

    setHasGoodHierarchy(false)

    setHasGoodPunctuality(false)

    setHasGoodAttendance(false)
  }

  const handleSubmit = () => {
    let formData = {
      personal_presentation: selectedPersonalPresentation?.label,
      productivity: selectedProductivity?.label,
      knowledge: selectedKnowledge?.label,
      cooperation: selectedCooperation?.label,
      initiative: selectedInitiative?.label,
      interpersonal_relationships: selectedInterpersonalRelationship?.label,
      learning: selectedLearning?.label,
      hierarchy: selectedHierarchy?.label,
      punctuality: selectedPunctuality?.label,
      attendance: selectedAttendance?.label,
      approved: selectedApproved?.label,
      realized_by: userSession?.id,
      realized_in: moment().format("YYYY-MM-DD"),
    }

    api
      .post(`/workers/${selectedWorker.worker_id}/first-review`, formData)
      .then(() => handleClose())
  }

  const handlePrintFirstReview = () => {
    let assinature = selectedSubsdiarie?.value == 2 && "Daniel Ireno Souza" || selectedSubsdiarie?.value == 3 && "Roberto Rudnick" || "Michel Jacob Brique"

    const printableContent = ReactDOMServer.renderToString(
      <FirstReviewPrintContent
        selectedSubsdiarie={selectedSubsdiarie}
        selectedWorker={selectedWorker}
        subsidiarieManager={subsidiarieManager}
        subsidiarieCoordinator={subsidiarieCoordinator}
        personalPresentationOptions={personalPresentationOptions}
        firstReviewResponses={firstReviewResponses}
        assinature={assinature}
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
        <button
          className="btn btn-primary mb-3"
          title="Imprimir avaliação de primeiro período de experiência"
          onClick={handlePrintFirstReview}
        >
          <Printer />
        </button>

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

        <div className="mb-3">
          <div>
            <span><b>01. Apresentação pessoal</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Impressão que  o colaborador transmite em relação a postura profissional e maneira de se vestir, uso  correto de identificação, uniforme e outros.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.personal_presentation && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.personal_presentation}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={personalPresentationOptions}
                onChange={(value) => setSelectedPersonalPresentation(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>02. Produtividade / Qualidade de trabalho</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Volume de trabalho realizado em determinado tempo (Eficiência/Eficácia).</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.productivity && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.productivity}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={productivityOptions}
                onChange={(value) => setSelectedProductivity(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>03. Conhecimento do trabalho</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>‘Expertise”, perícia na função exercida.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.knowledge && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.knowledge}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={knowledgeOptions}
                onChange={(value) => setSelectedKnowledge(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>04. Cooperação</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Presteza e capacidade de ajudar e se relacionar com os colegas de equipe.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.cooperation && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.cooperation}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={cooperationOptions}
                onChange={(value) => setSelectedCooperation(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>05. Iniciativa</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Capacidade de identificar novas tarefas, projetos e problemas e se prontificar a assumi-los.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.initiative && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.initiative}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={initiativeOptions}
                onChange={(value) => setSelectedInitiative(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>06. Relacionamento interpessoal</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Capacidade de se relacionar bem com os colegas, promovendo um bom ambiente de trabalho.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.interpersonal_relationships && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.interpersonal_relationships}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={interpersonalRelationshipsOptions}
                onChange={(value) => setSelectedInterpersonalRelationship(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>07. Aprendizagem</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Facilidade de aprender novos métodos de trabalho.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.learning && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.learning}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={learningOptions}
                onChange={(value) => setSelectedLearning(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>08. Hierarquia e disciplina</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Capacidade de respeitar e cumprir ordens que lhe são transmitidas.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.hierarchy && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.hierarchy}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={hierarchyOptions}
                onChange={(value) => setSelectedHierarchy(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>09. Assiduidade e pontualidade</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Diz respeito à frequência e regularidade com que alguém cumpre suas tarefa e à capacidade de chegar no horário estabelecido para compromissos e atividades.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.punctuality && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.punctuality}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={punctualityOptions}
                onChange={(value) => setSelectedPunctuality(value)}
              />
            )
          }
        </div>

        <div className="mb-3">
          <div>
            <span><b>10. Atendimento ao cliente</b></span>
          </div>

          <div className="mt-1 mb-1">
            <span>Maneira como lida com os clientes da unidade de negócio.</span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.attendance && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.attendance}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={attendanceOptions}
                onChange={(value) => setSelectedAttendance(value)}
              />
            )
          }
        </div>

        <div className="mt-4 mb-4">
          <h4>Situação do colaborador</h4>

          <div className="row">
            <div className="col">
              <div>
                <b>Apresentação pessoal</b>: <span className={hasGoodPersonalPresentation ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodPersonalPresentation ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Produtividade</b>: <span className={hasGoodProductivity ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodProductivity ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Conhecimento do trabalho</b>: <span className={hasGoodKnowledge ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodKnowledge ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Cooperação</b>: <span className={hasGoodCooperation ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodCooperation ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Iniciativa</b>: <span className={hasGoodInitiative ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodInitiative ? "Bom" : "Precisa melhorar"}</span>
              </div>
            </div>

            <div className="col">
              <div>
                <b>Relacionamento interpessoal</b>: <span className={hasGoodInterpersonalRelationship ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodInterpersonalRelationship ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Aprendizado</b>: <span className={hasGoodLearning ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodLearning ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Hierarquia e disciplina</b>: <span className={hasGoodHierarchy ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodHierarchy ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Assiduidade e pontualidade</b>: <span className={hasGoodPunctuality ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodPunctuality ? "Bom" : "Precisa melhorar"}</span>
              </div>

              <div>
                <b>Atendimento ao cliente</b>: <span className={hasGoodAttendance ? "text-success fw-bold" : "text-danger fw-bold"}>{hasGoodAttendance ? "Bom" : "Precisa melhorar"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div>
            <span><b>Aprovado ou reprovado</b></span>
          </div>

          {
            firstReviewResponses &&
            firstReviewResponses.approved && (
              <ReactSelect
                isDisabled={true}
                placeholder={firstReviewResponses.approved}
              />
            ) || (
              <ReactSelect
                placeholder="Selecione a opção que mais se aplica"
                options={approvedOptions}
                onChange={(value) => setSelectedApproved(value)}
              />
            )
          }
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        {
          firstReviewResponses && (
            <Button variant="success" disabled={true}>Salvar</Button>
          ) || (
            <Button variant="success" onClick={handleSubmit}>Salvar</Button>
          )
        }
      </Modal.Footer>
    </Modal>
  )
}

export default FirstReviewModal