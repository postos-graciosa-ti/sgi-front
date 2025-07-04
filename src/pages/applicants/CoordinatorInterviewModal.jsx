import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const CoordinatorInterviewModal = (props) => {
  const {
    coordinatorInterviewModalOpen,
    setCoordinatorInterviewModalOpen,
    selectedApplicant,
    setSelectiveProcessModalOpen,
    setApplicantsList,
    applicantToSearch
  } = props

  const [coordinatorObservation, setCoordinatorObservation] = useState()

  const [personalLife, setPersonalLife] = useState()

  const [gasStationExperience, setGasStationExperience] = useState()

  const [lifeStructure, setLifeStructure] = useState()

  const [workingHereObjectives, setWorkingHereObjectives] = useState()

  const [expectWorkingHere, setExpectWorkingHere] = useState()

  const [applicantCriteria, setApplicantCriteria] = useState()

  const [wageInfo, setWageInfo] = useState()

  const [targetGoals, setTargetGoals] = useState()

  const [claimedGoals, setClaimedGoals] = useState()

  const [clientFidelity, setClientFidelity] = useState()

  const [hardSituations, setHardSituations] = useState()

  const [badReputation, setBadReputation] = useState()

  const [boringConsumer, setBoringConsumer] = useState()

  const [rageAtWorkplace, setRageAtWorkplace] = useState()

  const [ecorpChanges, setEcorpChanges] = useState()

  const [teamWork, setTeamWork] = useState()

  const [workRelationships, setWorkRelationships] = useState()

  const [usersOptions, setUsersOptions] = useState()

  const [selectUser, setSelectedUser] = useState()

  const [workersDocs, setWorkersDocs] = useState()

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.user_id, label: option.user_name }))

        setUsersOptions(options)
      })
  }, [])

  useEffect(() => {
    if (coordinatorInterviewModalOpen) {
      api
        .get(`/applicants-docs/${selectedApplicant?.id}`)
        .then((response) => {
          setWorkersDocs(response.data)
        })
    }
  }, [coordinatorInterviewModalOpen])

  const handleClose = () => {
    if (applicantToSearch) {
      api
        .get("/applicants")
        .then((response) => {
          const newApplicantsList = response.data.filter((applicant) => {
            const firstName = applicant.name.split(" ")[0].toLowerCase()
            return firstName === applicantToSearch.toLowerCase()
          })

          setApplicantsList(newApplicantsList)
        })
    } else {
      api
        .get("/applicants")
        .then((response) => setApplicantsList(response.data))
    }

    setSelectiveProcessModalOpen(false)

    setCoordinatorInterviewModalOpen(false)
  }

  const handleSubmit = () => {
    let requestBody = {
      personal_life: personalLife,
      gas_station_experience: gasStationExperience,
      life_structure: lifeStructure,
      working_here_objectives: workingHereObjectives,
      expect_working_here: expectWorkingHere,
      applicant_criteria: applicantCriteria,
      wage_info: wageInfo,
      target_goals: targetGoals,
      claimed_goals: claimedGoals,
      client_fidelity: clientFidelity,
      hard_situations: hardSituations,
      bad_reputation: badReputation,
      boring_consumer: boringConsumer,
      rage_at_workplace: rageAtWorkplace,
      ecorp_changes: ecorpChanges,
      team_work: teamWork,
      work_relationships: workRelationships,

      coordinator_observations: coordinatorObservation,
      coordinator_interview_complete: true,

      redirect_to: selectUser?.value
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  return (
    <Modal
      show={coordinatorInterviewModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Entrevista com coordenador de {selectedApplicant?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {
          workersDocs && workersDocs.resume_available && (
            <div className="mb-3">
              <h4 className="mb-3">Currículo:</h4>

              <iframe
                src={`${import.meta.env.VITE_API_URL}/applicants-docs/file/${workersDocs.id}/resume`}
                width="100%"
                height="600px"
                title="Visualizador de PDF"
                style={{ border: "none" }}
              ></iframe>
            </div>
          )
        }

        {
          workersDocs && workersDocs.workcard_available && (
            <div className="mb-3">
              <h4 className="mb-3">CTPS:</h4>

              <iframe
                src={`${import.meta.env.VITE_API_URL}/applicants-docs/file/${workersDocs.id}/workcard`}
                width="100%"
                height="600px"
                title="Visualizador de PDF"
                style={{ border: "none" }}
              ></iframe>
            </div>
          )
        }

        <div className="mb-3">
          <h4>Perguntas para gerente fazer aos candidatos</h4>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Conte-me um pouco sobre sua vida (pessoal e profissional), o que achar importante eu saber
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setPersonalLife(e.target.value)}
            defaultValue={selectedApplicant?.personal_life}
            disabled={selectedApplicant?.personal_life && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Já possui experiência com postos de gasolina?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setGasStationExperience(e.target.value)}
            defaultValue={selectedApplicant?.gas_station_experience}
            disabled={selectedApplicant?.gas_station_experience && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Como sua vida está estruturada hoje? É casado? Tem filhos? Mora onde?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setLifeStructure(e.target.value)}
            defaultValue={selectedApplicant?.life_structure}
            disabled={selectedApplicant?.life_structure && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Quais seus planos e objetivos trabalhando aqui?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setWorkingHereObjectives(e.target.value)}
            defaultValue={selectedApplicant?.working_here_objectives}
            disabled={selectedApplicant?.working_here_objectives && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            O que você espera trabalhando aqui?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setExpectWorkingHere(e.target.value)}
            defaultValue={selectedApplicant?.expect_working_here}
            disabled={selectedApplicant?.expect_working_here && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Quando você se inscreveu para a vaga, quais foram os critérios que você considerou para continuar no processo de seleção e fazer a segunda entrevista?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setApplicantCriteria(e.target.value)}
            defaultValue={selectedApplicant?.applicant_criteria}
            disabled={selectedApplicant?.applicant_criteria && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Você tem alguma dúvida em relação ao pacote de remuneração? Quais informações você possui?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setWageInfo(e.target.value)}
            defaultValue={selectedApplicant?.wage_info}
            disabled={selectedApplicant?.wage_info && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Observações de coordenador
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setCoordinatorObservation(e.target.value)}
            defaultValue={selectedApplicant?.coordinator_observations}
            disabled={selectedApplicant?.coordinator_observations && true}
          />
        </div>

        <div className="mb-3">
          <h4>Perguntas situacionais</h4>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Você lida bem com a cobrança de metas? Por que nós trabalhamos com vendas e isso faz parte da nossa rotina, vender!
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setTargetGoals(e.target.value)}
            defaultValue={selectedApplicant?.target_goals}
            disabled={selectedApplicant?.target_goals && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Me descreva um momento em que você atingiu as metas que foram estipuladas e como você trabalhou para que isso acontecesse?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setClaimedGoals(e.target.value)}
            defaultValue={selectedApplicant?.claimed_goals}
            disabled={selectedApplicant?.claimed_goals && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            De um exemplo de quando você conseguiu fidelizar um cliente e como você fez isso?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setClientFidelity(e.target.value)}
            defaultValue={selectedApplicant?.client_fidelity}
            disabled={selectedApplicant?.client_fidelity && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Qual o cliente mais difícil você já teve que lidar? O que você fazia para contornar as situações dificeís?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setHardSituations(e.target.value)}
            defaultValue={selectedApplicant?.hard_situations}
            disabled={selectedApplicant?.hard_situations && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Você já ajudou a reverter uma má impressão que o cliente tinha da empresa? Conte como foi
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setBadReputation(e.target.value)}
            defaultValue={selectedApplicant?.bad_reputation}
            disabled={selectedApplicant?.bad_reputation && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Descreva uma situação em que você teve que lidar com um cliente insatisfeito
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setBoringConsumer(e.target.value)}
            defaultValue={selectedApplicant?.boring_consumer}
            disabled={selectedApplicant?.boring_consumer && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            O que te deixa com raiva no ambiente profissional
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setRageAtWorkplace(e.target.value)}
            defaultValue={selectedApplicant?.rage_at_workplace}
            disabled={selectedApplicant?.rage_at_workplace && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Como você reage a mudanças repentinas na empresa? Cite um exemplo
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setEcorpChanges(e.target.value)}
            defaultValue={selectedApplicant?.ecorp_changes}
            disabled={selectedApplicant?.ecorp_changes && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Conte uma experiência positiva que você teve trabalhando em equipe?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setTeamWork(e.target.value)}
            defaultValue={selectedApplicant?.team_work}
            disabled={selectedApplicant?.team_work && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Nas suas últimas experiências, como era o seu relacionamento com os superiores e os colegas de tabalho?
          </label>

          <textarea
            className="form-control"
            rows={4}
            onChange={(e) => setWorkRelationships(e.target.value)}
            defaultValue={selectedApplicant?.work_relationships}
            disabled={selectedApplicant?.work_relationships && true}
          />
        </div>

        <div className="mb-3">
          <ReactSelect
            options={usersOptions}
            onChange={(value) => setSelectedUser(value)}
            defaultValue={usersOptions?.find((option) => option.value == selectedApplicant?.redirect_to)}
            isDisabled={selectedApplicant?.redirect_to && true}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Concluir</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CoordinatorInterviewModal