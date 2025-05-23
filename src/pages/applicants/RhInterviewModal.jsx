import moment from 'moment'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

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
    setApplicantsList
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

  // const videoRef = useRef(null)

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
        .get(`/subsidiaries/${selectedSubsidiarie.value}/metrics`)
        .then((response) => setSubsidiarieMetrics(response.data))
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

  const handleClose = () => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))

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
    }

    api
      .patch(`/applicants/${selectedApplicant?.id}`, requestBody)
      .then(() => handleClose())
  }

  // Function to check if all fields have their default values (no new input)
  const areAllFieldsDefault = () => {
    return (
      (!natural || natural === selectedApplicant?.natural) &&
      (!tempo || tempo === selectedApplicant?.tempo) &&
      (!vagaInteresse || vagaInteresse === selectedApplicant?.vaga_interesse) &&
      (!experienciaFuncao || experienciaFuncao === selectedApplicant?.experiencia_funcao) &&
      (!dataNascimento || dataNascimento === selectedApplicant?.data_nascimento) &&
      (!nomePai || nomePai === selectedApplicant?.nome_pai) &&
      (!nomeMae || nomeMae === selectedApplicant?.nome_mae) &&
      (!rg || rg === selectedApplicant?.rg) &&
      (!cpf || cpf === selectedApplicant?.cpf) &&
      (!estadoCivil || estadoCivil === selectedApplicant?.estado_civil) &&
      (!filhos || filhos === selectedApplicant?.filhos) &&
      (!fumante || fumante === selectedApplicant?.fumante) &&
      (!bairro || bairro === selectedApplicant?.bairro) &&
      (!ondeViuVaga || ondeViuVaga === selectedApplicant?.onde_viu_vaga) &&
      (!indicacao || indicacao === selectedApplicant?.indicacao) &&
      (!disponibilidadeHorario || disponibilidadeHorario === selectedApplicant?.disponibilidade_horario) &&
      (!moradia || moradia === selectedApplicant?.moradia) &&
      (!transporte || transporte === selectedApplicant?.transporte) &&
      (!ultimoSalario || ultimoSalario === selectedApplicant?.ultimo_salario) &&
      (!apresentacaoPessoal || apresentacaoPessoal === selectedApplicant?.apresentacao_pessoal) &&
      (!comunicativo || comunicativo === selectedApplicant?.comunicativo) &&
      (!postura || postura === selectedApplicant?.postura) &&
      (!simpatia || simpatia === selectedApplicant?.simpatia) &&
      (!observacoes || observacoes === selectedApplicant?.observacoes) &&
      (!simNaoTalvez || simNaoTalvez === selectedApplicant?.sim_nao_talvez) &&
      (!contato || contato === selectedApplicant?.contato) &&
      (!retornoWhatsapp || retornoWhatsapp === selectedApplicant?.retorno_whatsapp) &&
      (!primeiraEntrevista || primeiraEntrevista === selectedApplicant?.primeira_entrevista) &&
      (!segundaEntrevista || segundaEntrevista === selectedApplicant?.segunda_entrevista) &&
      (!encaminhadoAdmissional || encaminhadoAdmissional === selectedApplicant?.encaminhado_admissional) &&
      (!dataPrevistaAdmissao || dataPrevistaAdmissao === selectedApplicant?.data_prevista_admissao) &&
      (!filial || filial === selectedApplicant?.filial) &&
      (!horario || horario === selectedApplicant?.horario) &&
      !selectedUser
    )
  }

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Error accessing camera:', err)
    }
  }

  console.log(selectedApplicant)

  return (
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

        <div className="mb-3">
          <label className="form-label fw-bold">Natural:</label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setNatural(e.target.value)}
            defaultValue={selectedApplicant?.natural}
            disabled={selectedApplicant?.natural && true}
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
            disabled={selectedApplicant?.email && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Quanto tempo:</label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setTempo(e.target.value)}
            defaultValue={selectedApplicant?.tempo}
            disabled={selectedApplicant?.tempo && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Vaga de interesse:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setVagaInteresse(e.target.value)}
            defaultValue={selectedApplicant?.vaga_interesse}
            disabled={selectedApplicant?.vaga_interesse && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Possui experiência na função:</label>

          <ReactSelect
            options={yesNoOptions}
            onChange={(option) => setExperienciaFuncao(option.value)}
            isDisabled={selectedApplicant?.experiencia_funcao && true}
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
            disabled={selectedApplicant?.data_nascimento && true}
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
            disabled={selectedApplicant?.nome_pai && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Nome da mãe:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setNomeMae(e.target.value)}
            defaultValue={selectedApplicant?.nome_mae}
            disabled={selectedApplicant?.nome_mae && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">RG:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setRg(e.target.value)}
            defaultValue={selectedApplicant?.rg}
            disabled={selectedApplicant?.rg && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">CPF:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setCpf(e.target.value)}
            defaultValue={selectedApplicant?.cpf}
            disabled={selectedApplicant?.cpf && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Estado civil:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEstadoCivil(e.target.value)}
            defaultValue={selectedApplicant?.estado_civil}
            disabled={selectedApplicant?.estado_civil && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Filhos:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFilhos(e.target.value)}
            defaultValue={selectedApplicant?.filhos}
            disabled={selectedApplicant?.filhos && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Fumante:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFumante(e.target.value)}
            defaultValue={selectedApplicant?.fumante}
            disabled={selectedApplicant?.fumante && true}
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
            isDisabled={selectedApplicant?.bairro && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Onde viu a vaga:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setOndeViuVaga(e.target.value)}
            defaultValue={selectedApplicant?.onde_viu_vaga}
            disabled={selectedApplicant?.onde_viu_vaga && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Indicação:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setIndicacao(e.target.value)}
            defaultValue={selectedApplicant?.indicacao}
            disabled={selectedApplicant?.indicacao && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Disponibilidade de horário:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDisponibilidadeHorario(e.target.value)}
            defaultValue={selectedApplicant?.disponibilidade_horario}
            disabled={selectedApplicant?.disponibilidade_horario && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Moradia:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setMoradia(e.target.value)}
            defaultValue={selectedApplicant?.moradia}
            disabled={selectedApplicant?.moradia && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Meio de transporte:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTransporte(e.target.value)}
            defaultValue={selectedApplicant?.transporte}
            disabled={selectedApplicant?.transporte && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Último salário:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUltimoSalario(e.target.value)}
            defaultValue={selectedApplicant?.ultimo_salario}
            disabled={selectedApplicant?.ultimo_salario && true}
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
            isDisabled={selectedApplicant?.apresentacao_pessoal && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Comunicativo:</label>

          {/* <input
            type="text"
            className="form-control"
            onChange={(e) => setComunicativo(e.target.value)}
            defaultValue={selectedApplicant?.comunicativo}
            disabled={selectedApplicant?.comunicativo && true}
          /> */}

          <ReactSelect
            options={recruitCriteria}
            onChange={(option) => setComunicativo(option.value)}
            defaultValue={recruitCriteria?.find((option) => option.value == selectedApplicant?.comunicativo)}
            isDisabled={selectedApplicant?.comunicativo && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Postura:</label>

          {/* <input
            type="text"
            className="form-control"
            onChange={(e) => setPostura(e.target.value)}
            defaultValue={selectedApplicant?.postura}
            disabled={selectedApplicant?.postura && true}
          /> */}

          <ReactSelect
            options={recruitCriteria}
            onChange={(option) => setPostura(option.value)}
            defaultValue={recruitCriteria?.find((option) => option.value == selectedApplicant?.postura)}
            isDisabled={selectedApplicant?.postura && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Simpatia:</label>

          {/* <input
            type="text"
            className="form-control"
            onChange={(e) => setSimpatia(e.target.value)}
            defaultValue={selectedApplicant?.simpatia}
            disabled={selectedApplicant?.simpatia && true}
          /> */}

          <ReactSelect
            options={recruitCriteria}
            onChange={(option) => setSimpatia(option.value)}
            defaultValue={recruitCriteria?.find((option) => option.value == selectedApplicant?.simpatia)}
            isDisabled={selectedApplicant?.simpatia && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Observações:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setObservacoes(e.target.value)}
            defaultValue={selectedApplicant?.observacoes}
            disabled={selectedApplicant?.observacoes && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">SIM/NÃO/TALVEZ:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSimNaoTalvez(e.target.value)}
            defaultValue={selectedApplicant?.sim_nao_talvez}
            disabled={selectedApplicant?.sim_nao_talvez && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Contato:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setContato(e.target.value)}
            defaultValue={selectedApplicant?.contato}
            disabled={selectedApplicant?.contato && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Retorno pelo WhatsApp:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setRetornoWhatsapp(e.target.value)}
            defaultValue={selectedApplicant?.retorno_whatsapp}
            disabled={selectedApplicant?.retorno_whatsapp && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">1° Entrevista:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPrimeiraEntrevista(e.target.value)}
            defaultValue={selectedApplicant?.primeira_entrevista}
            disabled={selectedApplicant?.primeira_entrevista && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">2° Entrevista:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSegundaEntrevista(e.target.value)}
            defaultValue={selectedApplicant?.segunda_entrevista}
            disabled={selectedApplicant?.segunda_entrevista && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Encaminhado para admissional:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEncaminhadoAdmissional(e.target.value)}
            defaultValue={selectedApplicant?.encaminhado_admissional}
            disabled={selectedApplicant?.encaminhado_admissional && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Data prevista de admissão:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDataPrevistaAdmissao(e.target.value)}
            defaultValue={selectedApplicant?.data_prevista_admissao}
            disabled={selectedApplicant?.data_prevista_admissao && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Filial:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFilial(e.target.value)}
            defaultValue={selectedApplicant?.filial}
            disabled={selectedApplicant?.filial && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mb-3">Horário:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setHorario(e.target.value)}
            defaultValue={selectedApplicant?.horario}
            disabled={selectedApplicant?.horario && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            última experiência
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setUltimaExperiencia(e.target.value)}
            defaultValue={selectedApplicant?.ultima_experiencia}
            disabled={selectedApplicant?.ultima_experiencia && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Penúltima experiência
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setPenultimaExperiencia(e.target.value)}
            defaultValue={selectedApplicant?.penultima_experiencia}
            disabled={selectedApplicant?.penultima_experiencia && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Antepenúltima experiência
          </label>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setAntepenultimaExperiencia(e.target.value)}
            defaultValue={selectedApplicant?.antepenultima_experiencia}
            disabled={selectedApplicant?.antepenultima_experiencia && true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">
            Escolaridade
          </label>

          <ReactSelect
            options={schoolLevelsOptions}
            onChange={(option) => setSelectedSchoolLevel(option.value)}
            defaultValue={schoolLevelsOptions?.find((option) => option.value == selectedApplicant?.escolaridade)}
            isDisabled={selectedApplicant?.escolaridade && true}
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
            isDisabled={!!selectedApplicant?.redirect_to}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={areAllFieldsDefault()}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RhInterviewModal