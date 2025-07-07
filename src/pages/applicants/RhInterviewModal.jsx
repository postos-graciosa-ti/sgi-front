import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'
import RedirectToModal from './RedirectToModal'

function calcularIdade(dataNascimento) {
  const hoje = new Date()

  const nascimento = new Date(dataNascimento)

  let idade = hoje.getFullYear() - nascimento.getFullYear()

  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--
  }

  return idade
}

const yesNoOptions = [{ value: "sim", label: "sim" }, { value: "não", label: "não" }]

const recruitCriteria = [
  { value: "ruim", label: "ruim" },
  { value: "médio", label: "médio" },
  { value: "bom", label: "bom" },
]

const postosPorBairro = {
  "Adhemar Garcia": ["Jariva", "Bemer"],
  "América": ["Graciosa"],
  "Anita Garibaldi": ["Graciosa"],
  "Atiradores": ["Graciosa"],
  "Aventureiro": ["Fátima", "Graciosa"],
  "Boa Vista": ["Graciosa", "Fátima"],
  "Boehmerwald": ["Bemer", "V"],
  "Bom Retiro": ["Graciosa"],
  "Bucarein": ["Graciosa", "V"],
  "Centro": ["Graciosa"],
  "Comasa": ["Fátima", "Graciosa"],
  "Costa e Silva": ["Graciosa"],
  "Dona Francisca": ["Piraí"],
  "Espinheiros": ["Jariva"],
  "Fátima": ["Fátima", "Graciosa"],
  "Floresta": ["V", "Graciosa"],
  "Glória": ["Graciosa"],
  "Guanabara": ["Graciosa", "Fátima"],
  "Iririú": ["Graciosa", "Fátima"],
  "Itaum": ["Graciosa", "Fátima", "V"],
  "Itinga": ["Jariva"],
  "Jardim Iririú": ["Graciosa", "Fátima"],
  "Jardim Paraíso": ["Fátima"],
  "Jardim Sofia": ["Fátima"],
  "Jarivatuba": ["Jariva"],
  "João Costa": ["Jariva", "Bemer"],
  "Morro do Meio": ["Piraí"],
  "Nova Brasília": ["Fátima", "Jariva"],
  "Paranaguamirim": ["Jariva", "Bemer"],
  "Parque Guarani": ["Bemer"],
  "Petrópolis": ["Fátima", "Bemer"],
  "Pirabeiraba": ["Piraí"],
  "Profipo": ["Piraí"],
  "Rio Bonito": ["Piraí"],
  "Saguaçu": ["Graciosa"],
  "Santa Catarina": ["V", "Graciosa"],
  "Santo Antônio": ["Graciosa"],
  "São Marcos": ["Piraí"],
  "Ulysses Guimarães": ["Jariva", "Bemer"],
  "Vila Cubatão": ["Fátima"],
  "Vila Nova": ["Piraí"],
  "Zona Industrial Norte": ["Piraí"],
  "Zona Industrial Tupy": ["Fátima"],
}

const RhInterviewModal = (props) => {
  const {
    rhInterviewModalOpen,
    setRhInterviewModalOpen,
    selectedApplicant,
    setSelectiveProcessModalOpen,
    setApplicantsList,
    applicantToSearch,
  } = props

  const [usersOptions, setUsersOptions] = useState()

  const [selectedUser, setSelectedUser] = useState()

  const [subsidiariesOptions, setSubsidiariesOptions] = useState()

  const [neighborhoodsOptions, setNeighborhoodsOptions] = useState()

  const [selectedSubsidiarie, setSelectedSubsidiarie] = useState()

  const [subsidiarieMetrics, setSubsidiarieMetrics] = useState()

  const [natural, setNatural] = useState("")

  const [tempo, setTempo] = useState("")

  const [vagaInteresse, setVagaInteresse] = useState("")

  const [experienciaFuncao, setExperienciaFuncao] = useState("")

  const [dataNascimento, setDataNascimento] = useState("")

  const [nomePai, setNomePai] = useState("")

  const [nomeMae, setNomeMae] = useState("")

  const [rg, setRg] = useState("")

  const [cpf, setCpf] = useState("")

  const [estadoCivil, setEstadoCivil] = useState("")

  const [filhos, setFilhos] = useState("")

  const [fumante, setFumante] = useState("")

  const [bairro, setBairro] = useState("")

  const [ondeViuVaga, setOndeViuVaga] = useState("")

  const [indicacao, setIndicacao] = useState("")

  const [disponibilidadeHorario, setDisponibilidadeHorario] = useState("")

  const [moradia, setMoradia] = useState("")

  const [transporte, setTransporte] = useState("")

  const [ultimoSalario, setUltimoSalario] = useState("")

  const [apresentacaoPessoal, setApresentacaoPessoal] = useState("")

  const [comunicativo, setComunicativo] = useState("")

  const [postura, setPostura] = useState("")

  const [simpatia, setSimpatia] = useState("")

  const [observacoes, setObservacoes] = useState("")

  const [simNaoTalvez, setSimNaoTalvez] = useState("")

  const [contato, setContato] = useState("")

  const [retornoWhatsapp, setRetornoWhatsapp] = useState("")

  const [primeiraEntrevista, setPrimeiraEntrevista] = useState("")

  const [segundaEntrevista, setSegundaEntrevista] = useState("")

  const [encaminhadoAdmissional, setEncaminhadoAdmissional] = useState("")

  const [dataPrevistaAdmissao, setDataPrevistaAdmissao] = useState("")

  const [filial, setFilial] = useState("")

  const [horario, setHorario] = useState("")

  const [ultimaExperiencia, setUltimaExperiencia] = useState()

  const [penultimaExperiencia, setPenultimaExperiencia] = useState()

  const [antepenultimaExperiencia, setAntepenultimaExperiencia] = useState()

  const [sugestSubsidiaries, setSugestSubsidiaries] = useState()

  const [age, setAge] = useState()

  const [schoolLevelsOptions, setSchoolLevelsOptions] = useState()

  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState()

  const [email, setEmail] = useState()

  const videoRef = useRef(null)

  const [openPositionsList, setOpenPositionsList] = useState()

  const [redirecToModalOpen, setRedirectToModalOpen] = useState(false)

  const [mobile, setMobile] = useState()

  const [showNewExperience, setShowNewExperience] = useState(false)

  const [newExperienceEnterprise, setNewExperienceEnterprise] = useState()

  const [newExperienceInitialDate, setNewExperienceInitialDate] = useState()

  const [newExperienceFinalDate, setNewExperienceFinalDate] = useState()

  const [newExperienceWage, setNewExperienceWage] = useState()

  const [existExperiences, setExistExperiences] = useState(JSON.parse(selectedApplicant?.work_experiences))

  const [workersDocs, setWorkersDocs] = useState()

  const [coordinatorObservation, setCoordinatorObservation] = useState("")

  const [personalLife, setPersonalLife] = useState("")

  const [gasStationExperience, setGasStationExperience] = useState("")

  const [lifeStructure, setLifeStructure] = useState("")

  const [workingHereObjectives, setWorkingHereObjectives] = useState("")

  const [expectWorkingHere, setExpectWorkingHere] = useState("")

  const [applicantCriteria, setApplicantCriteria] = useState("")

  const [wageInfo, setWageInfo] = useState("")

  const [targetGoals, setTargetGoals] = useState("")

  const [claimedGoals, setClaimedGoals] = useState("")

  const [clientFidelity, setClientFidelity] = useState("")

  const [hardSituations, setHardSituations] = useState("")

  const [badReputation, setBadReputation] = useState("")

  const [boringConsumer, setBoringConsumer] = useState("")

  const [rageAtWorkplace, setRageAtWorkplace] = useState("")

  const [ecorpChanges, setEcorpChanges] = useState("")

  const [teamWork, setTeamWork] = useState("")

  const [workRelationships, setWorkRelationships] = useState("")

  useEffect(() => {
    api
      .get("/users")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.user_id, label: option.user_name }))

        setUsersOptions(options)
      })

    api
      .get("/subsidiaries")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setSubsidiariesOptions(options)
      })

    api
      .get("/neighborhoods")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setNeighborhoodsOptions(options)
      })

    api
      .get("/school-levels")
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setSchoolLevelsOptions(options)
      })
  }, [])

  useEffect(() => {
    if (selectedSubsidiarie) {
      api
        .get(`/subsidiaries/${selectedSubsidiarie.value}/open-positions`)
        .then(({ data }) => setOpenPositionsList(data))
    }
  }, [selectedSubsidiarie])

  useEffect(() => {
    if (dataNascimento) {
      let age = calcularIdade(dataNascimento)

      setAge(age)
    }
  }, [dataNascimento])

  useEffect(() => {
    if (bairro && postosPorBairro[bairro]) {
      setSugestSubsidiaries(postosPorBairro[bairro])
    } else {
      setSugestSubsidiaries([])
    }
  }, [bairro])

  useEffect(() => {
    if (rhInterviewModalOpen) {
      api
        .get(`/applicants-docs/${selectedApplicant?.id}`)
        .then((response) => {
          setWorkersDocs(response.data)
        })
    }
  }, [rhInterviewModalOpen])

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

    setOpenPositionsList()

    setShowNewExperience()

    setNewExperienceEnterprise()

    setNewExperienceInitialDate()

    setNewExperienceFinalDate()

    setNewExperienceWage()

    setExistExperiences()

    setRhInterviewModalOpen(false)

    setSelectiveProcessModalOpen(false)
  }

  const handleSubmit = () => {
    const requestBody = {
      redirect_to: selectedUser?.value,
      natural: natural || selectedApplicant?.natural,
      tempo: tempo || selectedApplicant?.tempo,
      vaga_interesse: vagaInteresse || selectedApplicant?.vaga_interesse,
      experiencia_funcao: experienciaFuncao || selectedApplicant?.experiencia_funcao,
      data_nascimento: dataNascimento || selectedApplicant?.data_nascimento,
      nome_pai: nomePai || selectedApplicant?.nome_pai,
      nome_mae: nomeMae || selectedApplicant?.nome_mae,
      rg: rg || selectedApplicant?.rg,
      cpf: cpf || selectedApplicant?.cpf,
      estado_civil: estadoCivil || selectedApplicant?.estado_civil,
      filhos: filhos || selectedApplicant?.filhos,
      fumante: fumante || selectedApplicant?.fumante,
      bairro: bairro || selectedApplicant?.bairro,
      onde_viu_vaga: ondeViuVaga || selectedApplicant?.onde_viu_vaga,
      indicacao: indicacao || selectedApplicant?.indicacao,
      disponibilidade_horario: disponibilidadeHorario || selectedApplicant?.disponibilidade_horario,
      moradia: moradia || selectedApplicant?.moradia,
      transporte: transporte || selectedApplicant?.transporte,
      ultimo_salario: ultimoSalario || selectedApplicant?.ultimo_salario,
      apresentacao_pessoal: apresentacaoPessoal || selectedApplicant?.apresentacao_pessoal,
      comunicativo: comunicativo || selectedApplicant?.comunicativo,
      postura: postura || selectedApplicant?.postura,
      simpatia: simpatia || selectedApplicant?.simpatia,
      observacoes: observacoes || selectedApplicant?.observacoes,
      sim_nao_talvez: simNaoTalvez || selectedApplicant?.sim_nao_talvez,
      contato: contato || selectedApplicant?.contato,
      retorno_whatsapp: retornoWhatsapp || selectedApplicant?.retorno_whatsapp,
      primeira_entrevista: primeiraEntrevista || selectedApplicant?.primeira_entrevista,
      segunda_entrevista: segundaEntrevista || selectedApplicant?.segunda_entrevista,
      encaminhado_admissional: encaminhadoAdmissional || selectedApplicant?.encaminhado_admissional,
      data_prevista_admissao: dataPrevistaAdmissao || selectedApplicant?.data_prevista_admissao,
      filial: filial || selectedApplicant?.filial,
      horario: horario || selectedApplicant?.horario,
      ultima_experiencia: ultimaExperiencia,
      penultima_experiencia: penultimaExperiencia,
      antepenultima_experiencia: antepenultimaExperiencia,
      escolaridade: selectedSchoolLevel,
      email: email,
      mobile: mobile,
      work_experiences: JSON.stringify(existExperiences),
      rh_interview_complete: true,

      // coordinator_observations: coordinatorObservation || selectedApplicant?.coordinator_observations,
      rh_personal_life: personalLife || selectedApplicant?.personal_life,
      rh_gas_station_experience: gasStationExperience || selectedApplicant?.gas_station_experience,
      rh_life_structure: lifeStructure || selectedApplicant?.life_structure,
      rh_working_here_objectives: workingHereObjectives || selectedApplicant?.working_here_objectives,
      rh_expect_working_here: expectWorkingHere || selectedApplicant?.expect_working_here,
      rh_applicant_criteria: applicantCriteria || selectedApplicant?.applicant_criteria,
      rh_wage_info: wageInfo || selectedApplicant?.wage_info,
      rh_target_goals: targetGoals || selectedApplicant?.target_goals,
      rh_claimed_goals: claimedGoals || selectedApplicant?.claimed_goals,
      rh_client_fidelity: clientFidelity || selectedApplicant?.client_fidelity,
      rh_hard_situations: hardSituations || selectedApplicant?.hard_situations,
      rh_bad_reputation: badReputation || selectedApplicant?.bad_reputation,
      rh_boring_consumer: boringConsumer || selectedApplicant?.boring_consumer,
      rh_rage_at_workplace: rageAtWorkplace || selectedApplicant?.rage_at_workplace,
      rh_ecorp_changes: ecorpChanges || selectedApplicant?.ecorp_changes,
      rh_team_work: teamWork || selectedApplicant?.team_work,
      rh_work_relationships: workRelationships || selectedApplicant?.work_relationships,
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  const hendleOpenRedirectToModal = () => {
    setRedirectToModalOpen(true)
  }

  const handleAddNewExperience = () => {
    setExistExperiences((prev) => {
      if (prev) {
        return [
          ...prev,
          {
            "enterprise": newExperienceEnterprise,
            "initial_date": newExperienceInitialDate,
            "final_date": newExperienceFinalDate,
            "wage": newExperienceWage,
          }
        ]
      } else {
        return [
          {
            "enterprise": newExperienceEnterprise,
            "initial_date": newExperienceInitialDate,
            "final_date": newExperienceFinalDate,
            "wage": newExperienceWage,
          }
        ]
      }
    })

    setShowNewExperience()

    setNewExperienceEnterprise()

    setNewExperienceInitialDate()

    setNewExperienceFinalDate()

    setNewExperienceWage()
  }

  return (
    <>
      <Modal
        show={rhInterviewModalOpen}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Entrevista com Recursos Humanos de {selectedApplicant?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <input type="text" className="form-control text-center fw-bold" value={moment().format("DD/MM/YYYY")} disabled />
          </div>

          <div className="mb-3">
            <input type="text" className="form-control text-center fw-bold" value={selectedApplicant?.name} disabled />
          </div>

          <div className="mb-3 bg-light p-4 rounded">
            <label className="form-label fw-bold">Verificar quadro de vagas</label>

            <ReactSelect
              options={subsidiariesOptions}
              onChange={(value) => setSelectedSubsidiarie(value)}
            />

            {
              openPositionsList?.length > 0 && (
                <>
                  <div className="fw-bold mt-3 mb-3">
                    Vagas em {selectedSubsidiarie?.label}
                  </div>

                  {
                    openPositionsList && openPositionsList.map((openPosition, i) => (
                      <input
                        className="form-control mb-3 fw-bold"
                        value={`${i + 1}. Função: ${openPosition?.function?.name} \\ Turno: ${openPosition?.turn?.name}`}
                        disabled={true}
                      />
                    ))
                  }
                </>
              )
              ||
              <input
                className="form-control mt-3 fw-bold"
                disabled={true}
                value={"Quadro completo para essa filial"}
              />
            }
          </div>

          {/* retomar em outro momento */}

          {/* <div className="mb-3">
          <label className="form-label fw-bold">Verificar quadro de vagas</label>

          <ReactSelect
            placeholder={""}
            options={subsidiariesOptions}
            onChange={(value) => setSelectedSubsidiarie(value)}
          />
        </div>

        {
          subsidiarieMetrics && (
            <div className="card text-center p-4 mb-3">
              <div className={subsidiarieMetrics.has_caixas_ideal_quantity && "text-success fw-bold mb-1" || "text-danger fw-bold mb-1"}>
                Quantidade atual de caixas: {subsidiarieMetrics.caixas_quantity}/{subsidiarieMetrics.caixas_ideal_quantity}
              </div>

              <div className={subsidiarieMetrics.has_frentistas_ideal_quantity && "text-success fw-bold mb-1" || "text-danger fw-bold mb-1"}>
                Quantidade de frentistas: {subsidiarieMetrics.frentistas_quantity}/{subsidiarieMetrics.frentistas_ideal_quantity}
              </div>
            </div>
          )
        } */}

          {/* <div className="mb-3">
          <button className="btn btn-dark" onClick={handleOpenCamera}>
            <PersonVideo2 />
          </button>
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          width="640"
          height="480"
          style={{ display: 'block', marginTop: '1rem' }}
        /> */}

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
            <label className="form-label fw-bold">Natural:</label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setNatural(e.target.value)}
              defaultValue={selectedApplicant?.natural}
            // disabled={selectedApplicant?.natural && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              E-mail
            </label>

            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={selectedApplicant?.email}
            // disabled={selectedApplicant?.email && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Celular
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setMobile(e.target.value)}
              defaultValue={selectedApplicant?.mobile}
            // disabled={selectedApplicant?.mobile && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Quanto tempo:</label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setTempo(e.target.value)}
              defaultValue={selectedApplicant?.tempo}
            // disabled={selectedApplicant?.tempo && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Vaga de interesse:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setVagaInteresse(e.target.value)}
              defaultValue={selectedApplicant?.vaga_interesse}
            // disabled={selectedApplicant?.vaga_interesse && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Possui experiência na função:</label>

            <ReactSelect
              options={yesNoOptions}
              onChange={(option) => setExperienciaFuncao(option.value)}
              // isDisabled={selectedApplicant?.experiencia_funcao && true}
              defaultValue={yesNoOptions?.find((option) => option.value == selectedApplicant?.experiencia_funcao)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Data de nascimento:</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => setDataNascimento(e.target.value)}
              defaultValue={selectedApplicant?.data_nascimento}
            // disabled={selectedApplicant?.data_nascimento && true}
            />
          </div>

          {
            age && (
              <div className="mb-3">
                <label className="form-label fw-bold">Idade:</label>

                <input className="form-control" value={age || ""} disabled />
              </div>
            )
          }

          <div className="mb-3">
            <label className="form-label fw-bold">Nome do pai:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNomePai(e.target.value)}
              defaultValue={selectedApplicant?.nome_pai}
            // disabled={selectedApplicant?.nome_pai && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Nome da mãe:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNomeMae(e.target.value)}
              defaultValue={selectedApplicant?.nome_mae}
            // disabled={selectedApplicant?.nome_mae && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">RG:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setRg(e.target.value)}
              defaultValue={selectedApplicant?.rg}
            // disabled={selectedApplicant?.rg && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">CPF:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCpf(e.target.value)}
              defaultValue={selectedApplicant?.cpf}
            // disabled={selectedApplicant?.cpf && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Estado civil:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEstadoCivil(e.target.value)}
              defaultValue={selectedApplicant?.estado_civil}
            // disabled={selectedApplicant?.estado_civil && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Filhos:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setFilhos(e.target.value)}
              defaultValue={selectedApplicant?.filhos}
            // disabled={selectedApplicant?.filhos && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Fumante:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setFumante(e.target.value)}
              defaultValue={selectedApplicant?.fumante}
            // disabled={selectedApplicant?.fumante && true}
            />
          </div>

          {
            sugestSubsidiaries && (
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Postos recomendados
                </label>

                {
                  sugestSubsidiaries.map((subsidiarie, i) => (
                    <div key={i} className="mb-3">
                      <input
                        className="form-control"
                        value={subsidiarie}
                        disabled={true}
                      />
                    </div>
                  ))
                }
              </div>
            )
          }

          <div className="mb-3">
            <label className="form-label fw-bold">Bairro que mora:</label>

            {/* <input
            type="text"
            className="form-control"
            onChange={(e) => setBairro(e.target.value)}
            defaultValue={selectedApplicant?.bairro}
            disabled={selectedApplicant?.bairro && true}
          /> */}

            <ReactSelect
              options={neighborhoodsOptions}
              onChange={(option) => setBairro(option.label)}
              defaultValue={neighborhoodsOptions?.find((option) => option.label == selectedApplicant?.bairro)}
            // isDisabled={selectedApplicant?.bairro && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Onde viu a vaga:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setOndeViuVaga(e.target.value)}
              defaultValue={selectedApplicant?.onde_viu_vaga}
            // disabled={selectedApplicant?.onde_viu_vaga && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Indicação:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setIndicacao(e.target.value)}
              defaultValue={selectedApplicant?.indicacao}
            // disabled={selectedApplicant?.indicacao && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Disponibilidade de horário:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDisponibilidadeHorario(e.target.value)}
              defaultValue={selectedApplicant?.disponibilidade_horario}
            // disabled={selectedApplicant?.disponibilidade_horario && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Moradia:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMoradia(e.target.value)}
              defaultValue={selectedApplicant?.moradia}
            // disabled={selectedApplicant?.moradia && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Meio de transporte:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setTransporte(e.target.value)}
              defaultValue={selectedApplicant?.transporte}
            // disabled={selectedApplicant?.transporte && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Último salário:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUltimoSalario(e.target.value)}
              defaultValue={selectedApplicant?.ultimo_salario}
            // disabled={selectedApplicant?.ultimo_salario && true}
            />
          </div>

          <div className="text-center fw-bold">
            <h5>Observações do recrutador</h5>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Apresentação pessoal:</label>

            {/* <input
            type="text"
            className="form-control"
            onChange={(e) => setApresentacaoPessoal(e.target.value)}
            defaultValue={selectedApplicant?.apresentacao_pessoal}
            disabled={selectedApplicant?.apresentacao_pessoal && true}
          /> */}

            <ReactSelect
              options={recruitCriteria}
              onChange={(option) => setApresentacaoPessoal(option.value)}
              defaultValue={recruitCriteria?.find((option) => option.value == selectedApplicant?.apresentacao_pessoal)}
            // isDisabled={selectedApplicant?.apresentacao_pessoal && true}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Comunicativo:</label>

            <ReactSelect
              options={recruitCriteria}
              onChange={(option) => setComunicativo(option.value)}
              defaultValue={recruitCriteria?.find((option) => option.value == selectedApplicant?.comunicativo)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Postura:</label>

            <ReactSelect
              options={recruitCriteria}
              onChange={(option) => setPostura(option.value)}
              defaultValue={recruitCriteria?.find((option) => option.value == selectedApplicant?.postura)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Simpatia:</label>

            <ReactSelect
              options={recruitCriteria}
              onChange={(option) => setSimpatia(option.value)}
              defaultValue={recruitCriteria?.find((option) => option.value == selectedApplicant?.simpatia)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Observações:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setObservacoes(e.target.value)}
              defaultValue={selectedApplicant?.observacoes}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">SIM/NÃO/TALVEZ:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSimNaoTalvez(e.target.value)}
              defaultValue={selectedApplicant?.sim_nao_talvez}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">1° Entrevista:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPrimeiraEntrevista(e.target.value)}
              defaultValue={selectedApplicant?.primeira_entrevista}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">2° Entrevista:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSegundaEntrevista(e.target.value)}
              defaultValue={selectedApplicant?.segunda_entrevista}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Encaminhado para admissional:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEncaminhadoAdmissional(e.target.value)}
              defaultValue={selectedApplicant?.encaminhado_admissional}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Data prevista de admissão:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setDataPrevistaAdmissao(e.target.value)}
              defaultValue={selectedApplicant?.data_prevista_admissao}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Filial:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setFilial(e.target.value)}
              defaultValue={selectedApplicant?.filial}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-3">Horário:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setHorario(e.target.value)}
              defaultValue={selectedApplicant?.horario}
            />
          </div>

          {
            existExperiences && (
              existExperiences && existExperiences.map((experience) => (
                <div className="mb-3 mt-3 bg-light p-3 rounded">
                  <label className="form-label fw-bold mt-3">Empresa</label>

                  <input
                    type="text"
                    className="form-control"
                    value={experience?.enterprise}
                    disabled
                  />

                  <label className="form-label fw-bold mt-3">Data inicial</label>

                  <input
                    type="date"
                    className="form-control"
                    value={experience?.initial_date}
                    disabled
                  />

                  <label className="form-label fw-bold mt-3">Data final</label>

                  <input
                    type="date"
                    className="form-control"
                    value={experience?.final_date}
                    disabled
                  />

                  <label className="form-label fw-bold mt-3">Salário</label>

                  <input
                    type="text"
                    className="form-control"
                    value={experience?.wage}
                    disabled
                  />
                </div>
              ))
            )
          }

          <div className="mb-3">
            <button
              className="btn btn-primary w-100"
              onClick={() => setShowNewExperience(true)}
            >
              Adicionar Experiência
            </button>

            {
              showNewExperience && (
                <div className="mb-3 mt-3 bg-light p-3 rounded">
                  <h4>Nova experiência</h4>

                  <label
                    className="form-label fw-bold mt-3"
                  >
                    Empresa
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNewExperienceEnterprise(e.target.value)}
                    value={newExperienceEnterprise}
                  />

                  <label
                    className="form-label fw-bold mt-3"
                  >
                    Data inicial
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setNewExperienceInitialDate(e.target.value)}
                    value={newExperienceInitialDate}
                  />

                  <label
                    className="form-label fw-bold mt-3"
                  >
                    Data final
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => setNewExperienceFinalDate(e.target.value)}
                    value={newExperienceFinalDate}
                  />

                  <label
                    className="form-label fw-bold mt-3"
                  >
                    Salário
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setNewExperienceWage(e.target.value)}
                    value={newExperienceWage}
                  />

                  <button
                    className="btn btn-success mt-3"
                    onClick={handleAddNewExperience}
                  >
                    Salvar
                  </button>
                </div>
              )
            }
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Escolaridade
            </label>

            <ReactSelect
              options={schoolLevelsOptions}
              onChange={(option) => setSelectedSchoolLevel(option.value)}
              defaultValue={schoolLevelsOptions?.find((option) => option.value == selectedApplicant?.escolaridade)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Direcionar para:</label>

            <ReactSelect
              placeholder={""}
              options={usersOptions}
              onChange={(value) => setSelectedUser(value)}
              defaultValue={
                selectedApplicant?.redirect_to
                  ? usersOptions?.find(option => option.value === selectedApplicant.redirect_to)
                  : null
              }
            />
          </div>

          <div className="mb-3 mt-5">
            <h4 className="border-bottom pb-2">Perguntas do Coordenador</h4>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Conte-me um pouco sobre sua vida (pessoal e profissional)
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setPersonalLife(e.target.value)}
              defaultValue={selectedApplicant?.rh_personal_life}
              disabled={selectedApplicant?.rh_personal_life && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Já possui experiência com postos de gasolina?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setGasStationExperience(e.target.value)}
              defaultValue={selectedApplicant?.rh_gas_station_experience}
              disabled={selectedApplicant?.rh_gas_station_experience && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Como sua vida está estruturada hoje? É casado? Tem filhos? Mora onde?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setLifeStructure(e.target.value)}
              defaultValue={selectedApplicant?.rh_life_structure}
              disabled={selectedApplicant?.rh_life_structure && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Quais seus planos e objetivos trabalhando aqui?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setWorkingHereObjectives(e.target.value)}
              defaultValue={selectedApplicant?.rh_working_here_objectives}
              disabled={selectedApplicant?.rh_working_here_objectives && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              O que você espera trabalhando aqui?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setExpectWorkingHere(e.target.value)}
              defaultValue={selectedApplicant?.rh_expect_working_here}
              disabled={selectedApplicant?.rh_expect_working_here && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Quando você se inscreveu para a vaga, quais foram os critérios que você considerou?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setApplicantCriteria(e.target.value)}
              defaultValue={selectedApplicant?.rh_applicant_criteria}
              disabled={selectedApplicant?.rh_applicant_criteria && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Você tem alguma dúvida em relação ao pacote de remuneração?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setWageInfo(e.target.value)}
              defaultValue={selectedApplicant?.rh_wage_info}
              disabled={selectedApplicant?.rh_wage_info && true || false}
            />
          </div>

          {/* <div className="mb-3">
            <label className="form-label fw-bold">
              Observações do coordenador
            </label>
            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setCoordinatorObservation(e.target.value)}
              defaultValue={selectedApplicant?.coordinator_observations}
            />
          </div> */}

          <div className="mb-3 mt-5">
            <h4 className="border-bottom pb-2">Perguntas Situacionais</h4>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Você lida bem com a cobrança de metas?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setTargetGoals(e.target.value)}
              defaultValue={selectedApplicant?.rh_target_goals}
              disabled={selectedApplicant?.rh_target_goals && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Me descreva um momento em que você atingiu as metas
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setClaimedGoals(e.target.value)}
              defaultValue={selectedApplicant?.rh_claimed_goals}
              disabled={selectedApplicant?.rh_target_goals && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              De um exemplo de quando você conseguiu fidelizar um cliente
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setClientFidelity(e.target.value)}
              defaultValue={selectedApplicant?.rh_client_fidelity}
              disabled={selectedApplicant?.rh_client_fidelity && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Qual o cliente mais difícil você já teve que lidar?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setHardSituations(e.target.value)}
              defaultValue={selectedApplicant?.rh_hard_situations}
              disabled={selectedApplicant?.rh_hard_situations && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Você já ajudou a reverter uma má impressão que o cliente tinha da empresa?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setBadReputation(e.target.value)}
              defaultValue={selectedApplicant?.rh_bad_reputation}
              disabled={selectedApplicant?.rh_bad_reputation && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Descreva uma situação em que você teve que lidar com um cliente insatisfeito
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setBoringConsumer(e.target.value)}
              defaultValue={selectedApplicant?.rh_boring_consumer}
              disabled={selectedApplicant?.rh_boring_consumer && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              O que te deixa com raiva no ambiente profissional
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setRageAtWorkplace(e.target.value)}
              defaultValue={selectedApplicant?.rh_rage_at_workplace}
              disabled={selectedApplicant?.rh_rage_at_workplace && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Como você reage a mudanças repentinas na empresa? Cite um exemplo
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setEcorpChanges(e.target.value)}
              defaultValue={selectedApplicant?.rh_ecorp_changes}
              disabled={selectedApplicant?.rh_ecorp_changes && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Conte uma experiência positiva que você teve trabalhando em equipe
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setTeamWork(e.target.value)}
              defaultValue={selectedApplicant?.rh_team_work}
              disabled={selectedApplicant?.rh_team_work && true || false}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Como era seu relacionamento com superiores e colegas em experiências anteriores?
            </label>

            <textarea
              className="form-control"
              rows={3}
              onChange={(e) => setWorkRelationships(e.target.value)}
              defaultValue={selectedApplicant?.rh_work_relationships}
              disabled={selectedApplicant?.rh_work_relationships && true || false}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="light"
            onClick={handleClose}
          >
            Fechar
          </Button>

          <Button
            variant="primary"
            onClick={hendleOpenRedirectToModal}
          >
            Encaminhamento
          </Button>

          <Button
            variant="success"
            onClick={handleSubmit}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <RedirectToModal
        redirectToModalOpen={redirecToModalOpen}
        setRedirectToModalOpen={setRedirectToModalOpen}
        applicant={selectedApplicant}
      />
    </>
  )
}

export default RhInterviewModal