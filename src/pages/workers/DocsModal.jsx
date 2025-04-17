import moment from 'moment'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactDOMServer from 'react-dom/server'
import Select from '../../components/form/Select'
import useUserSessionStore from '../../data/userSession'

export const EthnicityDoc = ({ selectedWorker, selectedSubsidiarie }) => {
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

      <p>
        [x] <b>{selectedWorker?.ethnicity?.name}</b>
      </p>

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
        Joinville, {moment().format("DD/MM/YYYY")}
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

export const ResponsabilityDoc = ({ selectedWorker, selectedSubsidiarie }) => {
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
        Joinville, {moment().format("DD/MM/YYYY")}
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

const DocsModal = (props) => {
  const { docsModalOpen, setDocsModalOpen, selectedWorker } = props

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [documentType, setDocumentType] = useState()

  const handleClose = () => {
    setDocsModalOpen(false)
  }

  const handleSubmit = () => {
    let printableContent

    if (documentType.value == 1) {
      printableContent = ReactDOMServer.renderToString(
        <EthnicityDoc
          selectedWorker={selectedWorker}
          selectedSubsidiarie={selectedSubsidiarie}
        />
      )
    }

    if (documentType.value == 2) {
      printableContent = ReactDOMServer.renderToString(
        <ResponsabilityDoc
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
            { value: 2, label: "Termo de responsabilidade" }
          ]}
          setSelectedValue={setDocumentType}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DocsModal