import dayjs from 'dayjs'
import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import Select from '../../components/form/Select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'

export const EthnicityDoc = ({ selectedWorker, selectedSubsidiarie, handDate }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {selectedSubsidiarie?.label}
        </div>
      </div>

      <hr />

      <h4>AUTODECLARAÇÃO ÉTNICO-RACIAL</h4>

      <p>
        Eu, {selectedWorker?.worker_name}, inscrito no CPF sob o nº
        {selectedWorker.cpf}, AUTODECLARO, sob as penas da lei, minha
        raça/etnia sendo:
      </p>

      <p>[  ] <b>Branca</b></p>

      <p>[  ] <b>Preta</b></p>

      <p>[  ] <b>Parda</b></p>

      <p>[  ] <b>Amarela</b></p>

      <p>[  ] <b>Indígena</b></p>

      <p>
        Esta autodeclaração atende a exigência do art. 39, § 8º, da Lei nº
        12.288/2010, alterado pela Lei nº 14.553/2023 e da Portaria MTE nº
        3.784/2023, que obriga a prestação da informação nas inclusões,
        alterações ou retificações cadastrais dos trabalhadores ocorridas a partir
        de 1o de janeiro de 2024, respeitando o critério de autodeclaração do
        trabalhador, em conformidade com a classificação utilizada pelo Instituto
        Brasileiro de Geografia e Estatística - IBGE.
      </p>

      <p>
        Por ser expressão da verdade, firmo e assino a presente para que a
        mesma produza seus efeitos legais e de direito.
      </p>

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <div style={{ "bottom": "0", "position": "fixed" }}>
        <hr />

        Posto Graciosa: Rua Florianópolis, 510 – Itaum – Cep: 89210-085 – Joinville – SC <br />
        Auto Posto Fatima: Rua Fátima, 1730 – Fatima – Cep: 89.229-102 – Joinville – SC <br />
        Posto Bemer: Rua Boehmerwaldt, 675 – Boehmerwaldt – Cep: 89.232-100 – Joinville – SC <br />
        Posto Jariva: Rua Monsenhor Gercino, 5085 – Jarivatuba – Cep: 89.231-000 – Joinville – SC <br />
        Posto Graciosa V: Rua Santa Catarina, 1870 – Floresta – Cep: 89.212-000 – Joinville – SC <br />
        Auto Posto Pirai: Rua XI de Novembro, 5031 – Vila Nova – Cep: 89.237-000 – Joinville - SC
      </div>
    </>
  )
}

export const ResponsabilityDoc = ({ selectedWorker, selectedSubsidiarie, handDate }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {selectedSubsidiarie?.label}
        </div>
      </div>

      <hr />

      <h4>TERMO DE RESPONSABILIDADE</h4>

      <p>
        Eu, {selectedWorker?.worker_name}, {selectedWorker?.function_name}, residente e domiciliado(a) Rua: {selectedWorker?.street},
        Nº {selectedWorker?.street_number} - Bairro: {selectedWorker?.neighborhood?.name}, mediante este instrumento de aceitação, responsabilizo-me pelo uso e
        conservação do caixa {selectedSubsidiarie?.label}, de propriedade da mesma, pelo prazo indeterminado, a
        contar desta data.
      </p>

      <ol>
        <li>
          Comprometo-me a devolver em perfeito estado findo o meu vínculo com a empresa. Em caso
          de extravio e/ou dano, total ou parcial, do dinheiro ou quaisquer outros bens sob minha
          responsabilidade, comprometo-me a ressarcir a empresa pelos prejuízos decorrentes;
        </li>

        <li>
          Estou ciente de que serei responsável pela movimentação de caixa, que inclui registrar vendas,
          receber pagamentos, fornecer recibos aos clientes, processar devoluções de mercadorias e
          trocas, e emitir notas fiscais quando necessário. Além disso, estou ciente de que devo manter
          o caixa e a área circundante limpos e organizados, repondo materiais como rolos de papel para
          recibos e formulários necessários.
        </li>

        <li>
          Caso tenha diferenças entre o valor real em caixa e o valor apurado, essa diferença será
          descontada do adicional de quebra de caixa, limitado aos 10% do valor da quebra de caixa de
          acordo com o Artigo 462 da CLT (Consolidação das Leis do Trabalho).
        </li>
      </ol>

      <p>
        Estou ciente de que devo seguir rigorosamente os procedimentos de segurança, ética e
        confidencialidade da empresa.
      </p>

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <div>
        <p>
          ________________________________________________________________________________________
        </p>

        <p>Assinatura</p>

        <p>{selectedWorker?.worker_name.toUpperCase()}</p>
      </div>

      <div style={{ "bottom": "0", "position": "fixed" }}>
        <hr />

        Posto Graciosa: Rua Florianópolis, 510 – Itaum – Cep: 89210-085 – Joinville – SC <br />
        Auto Posto Fatima: Rua Fátima, 1730 – Fatima – Cep: 89.229-102 – Joinville – SC <br />
        Posto Bemer: Rua Boehmerwaldt, 675 – Boehmerwaldt – Cep: 89.232-100 – Joinville – SC <br />
        Posto Jariva: Rua Monsenhor Gercino, 5085 – Jarivatuba – Cep: 89.231-000 – Joinville – SC <br />
        Posto Graciosa V: Rua Santa Catarina, 1870 – Floresta – Cep: 89.212-000 – Joinville – SC <br />
        Auto Posto Pirai: Rua XI de Novembro, 5031 – Vila Nova – Cep: 89.237-000 – Joinville - SC
      </div>
    </>
  )
}

export const HealthDoc = ({ selectedWorker, selectedSubsidiarie, handDate }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {selectedSubsidiarie?.label}
        </div>
      </div>

      <hr />

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <p>
        {selectedSubsidiarie?.label}
      </p>

      <p>
        Anexo 01
      </p>

      <p>
        TERMO DE CIÊNCIA DO PROTOCOLO DE HOMOLOGAÇÃO DE ATESTADO
      </p>

      <p>
        Eu, {selectedWorker?.worker_name}
      </p>

      <p>
        fui devidamente orientado a respeito das regras de Homologação de Atestados Médicos, NÃO
        RESTANDO DÚVIDAS de que o não cumprimento das regras apresentadas no referido documento
        acarretará nas devidas consequências como falta não justificada.
      </p>

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <p>
        ________________________________________________________________________________________
      </p>

      <p>Assinatura</p>

      <div style={{ "bottom": "0", "position": "fixed" }}>
        <hr />

        Posto Graciosa: Rua Florianópolis, 510 – Itaum – Cep: 89210-085 – Joinville – SC <br />
        Auto Posto Fatima: Rua Fátima, 1730 – Fatima – Cep: 89.229-102 – Joinville – SC <br />
        Posto Bemer: Rua Boehmerwaldt, 675 – Boehmerwaldt – Cep: 89.232-100 – Joinville – SC <br />
        Posto Jariva: Rua Monsenhor Gercino, 5085 – Jarivatuba – Cep: 89.231-000 – Joinville – SC <br />
        Posto Graciosa V: Rua Santa Catarina, 1870 – Floresta – Cep: 89.212-000 – Joinville – SC <br />
        Auto Posto Pirai: Rua XI de Novembro, 5031 – Vila Nova – Cep: 89.237-000 – Joinville - SC
      </div>
    </>
  )
}

export const WhatsAppDoc = ({ selectedWorker, selectedSubsidiarie, subsidiarieAddress, handDate }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {selectedSubsidiarie?.label}
        </div>
      </div>

      <hr />

      <div style={{ textAlign: "center" }}>
        <h4>
          TERMO DE COMPROMISSO PARA UTILIZAÇÃO DO GRUPO DE WHATSAPP
        </h4>
      </div>

      <p>
        Nome da empresa: {selectedSubsidiarie?.label}
      </p>

      <p>
        Endereço: {subsidiarieAddress}
      </p>

      <p>
        OBJETIVO: Este termo tem como objetivo estabelecer as normas e responsabilidades para a utilização do grupo de
        WhatsApp corporativo, destinado à comunicação entre os funcionários da {selectedSubsidiarie?.label}.
      </p>

      <p>
        2. REGRAS DE UTILIZAÇÃO: O grupo de WhatsApp deve ser utilizado exclusivamente para assuntos relacionados
        ao trabalho, comunicação interna, avisos e informações pertinentes à empresa. É vedada a utilização do grupo para
        assuntos pessoais, correntes, piadas, propagandas, ou qualquer outro conteúdo que não esteja relacionado às
        atividades profissionais. Os membros do grupo devem manter um comportamento respeitoso e profissional, evitando
        qualquer forma de ofensa, discriminação ou assédio.
      </p>

      <p>
        1. 3. CONFIDENCIALIDADE As informações compartilhadas no grupo são confidenciais e de uso exclusivo dos
        funcionários do {selectedSubsidiarie?.label}
      </p>

      <p>
        É proibido divulgar qualquer conteúdo do grupo a terceiros sem autorização expressa.
      </p>

      <p>
        1. 4. RESPONSABILIDADES. Cada funcionário é responsável pelo conteúdo que compartilha no grupo e pelas
        consequências de suas mensagens. {selectedSubsidiarie?.label} não se responsabiliza por qualquer uso
        inadequado do grupo que viole este termo de compromisso.
      </p>

      <p>
        5. SANÇÕES O descumprimento das regras estabelecidas neste termo poderá resultar em advertências, suspensão
        do uso do grupo, e, em casos graves, medidas disciplinares conforme o regulamento interno da empresa.
      </p>

      <p>
        6. ACEITAÇÃO Ao assinar este termo, o funcionário declara ter lido, compreendido e aceitado todas as condições
        aqui estabelecidas.
      </p>

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <p>
        Nome do funcionário: {selectedWorker?.worker_name}
      </p>

      <p>
        Cargo: {selectedWorker?.function_name}
      </p>

      <p>
        Assinatura: ________________________________________________________________________________________
      </p>

      <p>
        Assinatura do representante da empresa: ________________________________________________________________________________________
      </p>

      <div style={{ "bottom": "0", "position": "fixed" }}>
        <hr />

        Posto Graciosa: Rua Florianópolis, 510 – Itaum – Cep: 89210-085 – Joinville – SC <br />
        Auto Posto Fatima: Rua Fátima, 1730 – Fatima – Cep: 89.229-102 – Joinville – SC <br />
        Posto Bemer: Rua Boehmerwaldt, 675 – Boehmerwaldt – Cep: 89.232-100 – Joinville – SC <br />
        Posto Jariva: Rua Monsenhor Gercino, 5085 – Jarivatuba – Cep: 89.231-000 – Joinville – SC <br />
        Posto Graciosa V: Rua Santa Catarina, 1870 – Floresta – Cep: 89.212-000 – Joinville – SC <br />
        Auto Posto Pirai: Rua XI de Novembro, 5031 – Vila Nova – Cep: 89.237-000 – Joinville - SC
      </div>
    </>
  )
}

export const Integration = ({ selectedWorker, selectedSubsidiarie }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {selectedSubsidiarie?.label}
        </div>
      </div>

      <hr />

      <div style={{ textAlign: "center" }}>
        <h4>
          Termo de Confirmação de Participação na Integração
        </h4>
      </div>

      <p>
        Empresa: {selectedSubsidiarie?.label}
      </p>

      <p>
        Colaborador: {selectedWorker?.worker_name}
      </p>

      <p>
        Cargo: {selectedWorker?.function_name}
      </p>

      <p>
        Data de admissão: {moment(selectedWorker?.admission_date).format("DD/MM/YYYY")}
      </p>

      <p>
        Declaro que:
      </p>

      <p>
        1. Participei do programa de Integração realizado, onde recebi informações e orientações sobre:
      </p>

      <ul>
        <li>Missão, Visão e Valores da Empresa</li>
        <li>Estrutura Organizacional e Função de Cada Departamento</li>
        <li>Cultura, Normas e Código de Conduta</li>
        <li>Benefícios, Premiações e Políticas da Empresa</li>
        <li>Procedimentos Internos, como registro de ponto e solicitação de equipamentos</li>
        <li>Utilização das Ferramentas Tecnológicas da Empresa</li>
        <li>Políticas de Saúde e Segurança no Trabalho</li>
        <li>Treinamentos Obrigatórios e Oportunidades de Desenvolvimento Profissional</li>
        <li>Administração de Pessoal</li>
        <li>Processo de Avaliação de Desempenho e Feedback</li>
      </ul>

      <p>
        2. Estou ciente de minhas responsabilidades, direitos e deveres, conforme as políticas e regulamentos
        apresentados durante a integração.
      </p>

      <p>
        3. Recebi todas as orientações necessárias para o desempenho das minhas funções e esclareci
        quaisquer dúvidas durante o processo de integração.
      </p>

      <p>
        4. Comprometo-me a seguir as normas e diretrizes estabelecidas pela empresa, conforme descrito no
        código de conduta, políticas internas e demais documentos apresentados.
      </p>

      <p>
        5. Estou ciente de que este documento confirma minha participação e entendimento sobre os pontos
        discutidos durante a integração, e que eventuais infrações ou o não cumprimento das políticas da
        empresa poderão resultar em sanções, conforme as regras internas.
      </p>

      <p>
        Assinatura do colaborador: ________________________________________________________________________________________
      </p>

      <p>
        Assinatura do Responsável pela Integração: ________________________________________________________________________________________
      </p>

      <div style={{ "bottom": "0", "position": "fixed" }}>
        <hr />

        Posto Graciosa: Rua Florianópolis, 510 – Itaum – Cep: 89210-085 – Joinville – SC <br />
        Auto Posto Fatima: Rua Fátima, 1730 – Fatima – Cep: 89.229-102 – Joinville – SC <br />
        Posto Bemer: Rua Boehmerwaldt, 675 – Boehmerwaldt – Cep: 89.232-100 – Joinville – SC <br />
        Posto Jariva: Rua Monsenhor Gercino, 5085 – Jarivatuba – Cep: 89.231-000 – Joinville – SC <br />
        Posto Graciosa V: Rua Santa Catarina, 1870 – Floresta – Cep: 89.212-000 – Joinville – SC <br />
        Auto Posto Pirai: Rua XI de Novembro, 5031 – Vila Nova – Cep: 89.237-000 – Joinville - SC
      </div>
    </>
  )
}

const DocsModal = (props) => {
  const { docsModalOpen, setDocsModalOpen, selectedWorker } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [documentType, setDocumentType] = useState()

  const [handDate, setHandDate] = useState()

  const handleClose = () => {
    setDocsModalOpen(false)

    setDocumentType()

    setHandDate()
  }

  const handleSubmit = async () => {
    let printableContent

    if (documentType.value == 1) {
      printableContent = ReactDOMServer.renderToString(
        <EthnicityDoc
          selectedWorker={selectedWorker}
          selectedSubsidiarie={selectedSubsidiarie}
          handDate={dayjs(handDate).format("DD/MM/YYYY")}
        />
      )
    }

    if (documentType.value == 2) {
      printableContent = ReactDOMServer.renderToString(
        <ResponsabilityDoc
          selectedWorker={selectedWorker}
          selectedSubsidiarie={selectedSubsidiarie}
          handDate={dayjs(handDate).format("DD/MM/YYYY")}
        />
      )
    }

    if (documentType.value == 3) {
      console.log()
      printableContent = ReactDOMServer.renderToString(
        <HealthDoc
          selectedWorker={selectedWorker}
          selectedSubsidiarie={selectedSubsidiarie}
          handDate={dayjs(handDate).format("DD/MM/YYYY")}
        />
      )
    }

    if (documentType.value == 4) {
      let subsidiarieAddress = await api.get(`/subsidiaries/${selectedSubsidiarie?.value}`).then((response) => response.data.adress)

      printableContent = ReactDOMServer.renderToString(
        <WhatsAppDoc
          selectedWorker={selectedWorker}
          selectedSubsidiarie={selectedSubsidiarie}
          subsidiarieAddress={subsidiarieAddress}
          handDate={dayjs(handDate).format("DD/MM/YYYY")}
        />
      )
    }

    if (documentType.value == 5) {
      printableContent = ReactDOMServer.renderToString(
        <Integration
          selectedWorker={selectedWorker}
          selectedSubsidiarie={selectedSubsidiarie}
        />
      )
    }

    printJS({
      printable: printableContent,
      type: 'raw-html',
      header: null
    })
  }

  return (
    <Modal
      show={docsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Emissão de documentos</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Select
          label={"Tipo de documento"}
          placeholder={""}
          options={[
            { value: 1, label: "Autodeclaração étnico-racial" },
            ...(selectedWorker?.function_name === "Operador(a) de Caixa I" ? [{ value: 2, label: "Termo de responsabilidade" }] : []),
            { value: 3, label: "Protocolo para Homologação de Atestado Médico Externo" },
            { value: 4, label: "Termo de compromisso para utilização do grupo de WhatsApp" },
            { value: 5, label: "Termo de Confirmação de Participação na Integração" },
          ]}
          setSelectedValue={setDocumentType}
        />

        <div className="mb-3">
          <label className="form-label fw-bold">Data de entrega (opcional)</label>

          <input
            type="date"
            placeholder={""}
            className="form-control"
            onChange={(e) => setHandDate(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DocsModal