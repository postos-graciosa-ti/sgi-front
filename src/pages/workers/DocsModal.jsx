import dayjs from 'dayjs'
import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import Select from '../../components/form/Select'
import useUserSessionStore from '../../data/userSession'
import api from '../../services/api'
import printJS from 'print-js'

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

      <p>
        Assinatura: ________________________________________________________________________________________
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

export const Integration = ({ selectedWorker, selectedSubsidiarie, handDate }) => {
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
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

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

export const WorkJourney = ({ subsidiarieData, selectedWorker, handDate }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {subsidiarieData?.name}
        </div>
      </div>

      <div className="text-center">
        <h4>DECLARAÇÃO DO HORÁRIO DE TRABALHO</h4>
      </div>

      <div>
        <p>
          A empresa {subsidiarieData?.name} cadastrada no CNPJ sob n° {subsidiarieData?.cnpj}, situada nesta cidade, declara para os devidos fins que {selectedWorker.worker_name} cadastrado no CPF nº {selectedWorker.cpf}, é funcionário desta empresa, cumprindo, a jornada de trabalho das {selectedWorker.turn_name} horas de segunda a domingo, com uma folga durante a semana.
        </p>
      </div>

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <p>
        Assinatura do colaborador: ________________________________________________________________________________________
      </p>

      <p>POSTO JARIVA LTDA</p>

      <p>Reigiani Souza</p>

      <p>
        Assinatura da diretoria: ________________________________________________________________________________________
      </p>

      <p>Gestora de Recursos Humanos</p>
    </>
  )
}

export const LastDayWorked = ({ subsidiarieData, selectedWorker, handDate, subsidiarieAddress }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {subsidiarieData?.name}
        </div>
      </div>

      <div>
        {subsidiarieData?.name}
      </div>

      <div>
        <b>CNPJ</b>: {subsidiarieData?.cnpj}
      </div>

      <div>
        <b>Endereço</b>: {subsidiarieAddress}
      </div>

      <div className="text-center">
        <h4>DECLARAÇÃO DE ÚLTIMO DIA TRABALHADO</h4>
      </div>

      <div>
        Declaramos, para os devidos fins, que o(a) colaborador(a) {selectedWorker.worker_name} inscrito (a) no CPF sob o no {selectedWorker.cpf}, ocupando o cargo de {selectedWorker.function_name}, teve como último dia efetivo de trabalho no dia {handDate || dayjs().format("DD/MM/YYYY")}.
      </div>

      <div>
        Esta declaração é emitida a pedido do(a) interessado(a) para fins de comprovação junto aos órgãos competentes.
      </div>

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <div>
        {subsidiarieData?.name}
      </div>

      <div>
        Reigiani Souza Cargo: Diretora
      </div>

      <p>
        Assinatura da diretoria: ________________________________________________________________________________________
      </p>
    </>
  )
}

export const ConfidenceRole = ({ subsidiarieData, selectedWorker, handDate }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {subsidiarieData?.name}
        </div>
      </div>

      <div>
        <h4>TERMO DE RESPONSABILIDADE DE CARGO DE CONFIANÇA</h4>
      </div>

      <p>
        Eu, {selectedWorker?.worker_name}
      </p>

      <p>residente e domiciliado(a) Rua: {selectedWorker?.street}, Nº {selectedWorker?.street_number} - Bairro: {selectedWorker?.neighborhood?.name}</p>

      <p>Admissão: {selectedWorker?.admission_date}</p>

      <h4>1. Objetivo</h4>

      <p>1. Este termo tem como objetivo formalizar as responsabilidades, deveres e expectativas para o colaborador que ocupa um cargo de confiança no {subsidiarieData?.name}.</p>

      <h4>2. Responsabilidades Gerais</h4>

      <p>O colaborador deve:</p>

      <p>2.1 Cumprir Metas: Alcançar as metas e objetivos estabelecidos pela empresa, garantindo o cumprimento dos prazos e qualidade dos serviços.</p>

      <p>2.2 Liderança: Exercer liderança positiva, promovendo um ambiente de trabalho saudável, motivador e produtivo.</p>

      <p>2.3 Tomada de Decisão: Tomar decisões estratégicas que visem o melhor para a empresa e para a equipe, sempre baseadas em dados e informações concretas.</p>

      <p>2.4 Comunicação: Manter uma comunicação clara, aberta e assertiva com a equipe e superiores, garantindo que todas as informações relevantes sejam compartilhadas.</p>

      <p>2.5 Gestão de Recursos: Gerir de forma eficiente os recursos financeiros, materiais e humanos, buscando otimizar os resultados da empresa.</p>

      <h4>
        3. Deveres Específicos
      </h4>

      <h4>
        Para o Gerente:
      </h4>

      <p>Planejar, dirigir e coordenar as atividades da empresa ou departamento.</p>

      <p>Analisar relatórios de desempenho e propor ações corretivas.</p>

      <p>Representar a empresa em reuniões e eventos externos.</p>

      <h4>
        Para o Coordenador:
      </h4>

      <p>Supervisionar e orientar os colaboradores em suas atividades diárias.</p>

      <p>Garantir que os projetos e tarefas sejam concluídos dentro do prazo e orçamento.</p>

      <p>Facilitar a comunicação entre a equipe e a gerência.</p>

      <h4>Para o Pessoal Administrativo:</h4>

      <p>Executar tarefas administrativas diárias, como processamento de documentos, atendimento a clientes e fornecedores, e gestão de agendas.</p>

      <p>Organizar e manter arquivos e registros atualizados.</p>

      <p>Apoiar a equipe de gerência e coordenação nas atividades necessárias.</p>

      <h4>
        4. Confidencialidade
      </h4>

      <p>O colaborador se compromete a manter sigilo sobre todas as informações confidenciais a que tiver acesso em virtude de seu cargo, não divulgando ou utilizando tais informações para quaisquer fins que não os estritamente relacionados ao desempenho de suas funções no {subsidiarieData?.name}.</p>

      <h4>
        5. Penalidades
      </h4>

      <p>O não cumprimento das responsabilidades e deveres descritos neste termo poderá resultar em penalidades, incluindo advertências, suspensão ou demissão por justa causa, conforme a legislação trabalhista vigente.</p>

      <h4>
        6. Assinaturas
      </h4>

      <p>
        Joinville, {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <p>
        Assinatura do colaborador: ________________________________________________________________________________________
      </p>

      <p>
        Assinatura da diretoria: ________________________________________________________________________________________
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

const TabletDoc = ({ subsidiarieData, selectedWorker, handDate }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="/logo.png" style={{ width: '80px' }} />
        </div>

        <div style={{ marginLeft: '8px' }}>
          {subsidiarieData?.name}
        </div>
      </div>

      <div>
        <h4>TERMO DE GUARDA E RESPONSABILIDADE POR USO DE EQUIPAMENTO</h4>
      </div>

      <p>
        Eu {selectedWorker.worker_name} inscrito no CPF nº {selectedWorker.cpf}, Rua: {selectedWorker?.street}, Nº {selectedWorker?.street_number} - Bairro: {selectedWorker?.neighborhood?.name}, Cargo _COORDENADOR DE VENDAS___, venho para os devidos fins DECLARAR
        que a empresa {subsidiarieData?.name}, inscrita no CNPJ nº {subsidiarieData?.cnpj}, na qualidade
        de minha empregadora, está entregando nesta data, a título de empréstimo, o equipamento e
        assessórios “Novos” abaixo discriminados em perfeito estado de conservação e
        funcionamento. Comprometo-me a mantê-lo nestas mesmas características, ficando ciente
        dos seguintes pontos:
      </p>

      <p>
        Responsabilidade Total: Assumo total responsabilidade civil, criminal, administrativa pelo uso
        e direção do respectivo equipamento. Eventuais avarias, e acidentes serão ressarcidas à
        empregadora {subsidiarieData?.name}, inscrita no CNPJ nº {subsidiarieData?.cnpj}.
        Isso ocorrerá, salvo se a culpa for exclusiva de terceiros.
      </p>

      <p>
        Autorizo desde já os respectivos descontos em folha de pagamento ou rescisão contratual.
      </p>

      <p>
        Listagem dos Equipamentos e/ou Ferramentas Emprestadas:
      </p>

      <p>
        1 Tablet Galaxy Tab A9 + 5G / modelo: SM-X216B
      </p>

      <table style={{ borderCollapse: 'collapse', width: '100%' }} border="1">
        <tbody>
          <tr>
            <td>Série:</td>

            <td>1 Chip da operadora Claro nº</td>
          </tr>

          <tr>
            <td>IMEI:</td>

            <td>1 Capa</td>
          </tr>

          <tr>
            <td>1 Carregador com cabo</td>

            <td>1 Película</td>
          </tr>

          <tr>
            <td>Caneta de digitação</td>

            <td></td>
          </tr>
        </tbody>
      </table>

      <p>
        Recebido em {handDate || dayjs().format("DD/MM/YYYY")}
      </p>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ borderBottom: '1px solid #000', width: '100%', marginBottom: '1rem' }}></div>

        <p>
          Devolução do Equipamento Utilizadas: Atestamos que o bem foi devolvido em
          <span style={{ display: 'inline-block', minWidth: '100px', borderBottom: '1px solid #000', margin: '0 5px' }}></span>
          , nas seguintes condições:
        </p>

        <p>
          ( &nbsp;&nbsp;) Em perfeito estado &nbsp;&nbsp;
          ( &nbsp;&nbsp;) Apresentando defeito &nbsp;&nbsp;
          ( &nbsp;&nbsp;) Faltando peças/acessórios
        </p>

        <div style={{ marginTop: '2rem' }}>
          <div style={{ borderBottom: '1px solid #000', width: '100%', marginBottom: '0.25rem' }}></div>
          <p style={{ margin: 0 }}>Nome do responsável pelo recebimento / assinatura:</p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <div style={{ borderBottom: '1px solid #000', width: '100%', marginBottom: '0.25rem' }}></div>
          <p style={{ margin: 0 }}>Colaborador e assinatura:</p>
        </div>
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

    const formattedDate = dayjs(handDate).format("DD/MM/YYYY")

    let subsidiarieData = null

    let subsidiarieAddress = null

    const needsSubsidiarieData = [4, 6, 7].includes(documentType.value)

    if (needsSubsidiarieData) {
      const { data } = await api.get(`/subsidiaries/${selectedSubsidiarie?.value}`)

      subsidiarieData = data

      subsidiarieAddress = data.adress
    }

    if (documentType.value === 10) {
      printJS("/ficha_de_epi.pdf")
      
      return
    }

    const docComponents = {
      1: <EthnicityDoc
        selectedWorker={selectedWorker}
        selectedSubsidiarie={selectedSubsidiarie}
        handDate={formattedDate}
      />,
      2: <ResponsabilityDoc
        selectedWorker={selectedWorker}
        selectedSubsidiarie={selectedSubsidiarie}
        handDate={formattedDate}
      />,
      3: <HealthDoc
        selectedWorker={selectedWorker}
        selectedSubsidiarie={selectedSubsidiarie}
        handDate={formattedDate}
      />,
      4: <WhatsAppDoc
        selectedWorker={selectedWorker}
        selectedSubsidiarie={selectedSubsidiarie}
        subsidiarieAddress={subsidiarieAddress}
        handDate={formattedDate}
      />,
      5: <Integration
        selectedWorker={selectedWorker}
        selectedSubsidiarie={selectedSubsidiarie}
        handDate={formattedDate}
      />,
      6: <WorkJourney
        subsidiarieData={subsidiarieData}
        selectedWorker={selectedWorker}
        handDate={formattedDate}
      />,
      7: <LastDayWorked
        subsidiarieData={subsidiarieData}
        selectedWorker={selectedWorker}
        handDate={formattedDate}
        subsidiarieAddress={subsidiarieAddress}
      />,
      8: <ConfidenceRole
        subsidiarieData={subsidiarieData}
        selectedWorker={selectedWorker}
        handDate={formattedDate}
      />,
      9: <TabletDoc
        subsidiarieData={subsidiarieData}
        selectedWorker={selectedWorker}
        handDate={formattedDate}
      />
    }

    const component = docComponents[documentType.value]

    if (!component) {
      console.warn("Tipo de documento desconhecido")

      return
    }

    printableContent = ReactDOMServer.renderToString(component)

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
            { value: 6, label: "Declaração de turno de trabalho" },
            { value: 7, label: "Declaração de último dia trabalhado" },
            { value: 8, label: "Termo de responsabilidade de cargo de confiança" },
            { value: 9, label: "Termo de guarda e responsabilidade por uso de equipamento" },
            { value: 10, label: "Ficha de EPI" },
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