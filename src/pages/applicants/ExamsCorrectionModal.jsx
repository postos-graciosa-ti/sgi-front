import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"

const ExamsCorrectionModal = (props) => {
  const { examsCorrectionModalOpen, setExamsCorrectionModalOpen } = props

  const selectRef = useRef(null)

  const [selectedExam, setSelectedExam] = useState()

  const [fieldsExam, setFieldsExam] = useState()

  const [count, setCount] = useState()

  useEffect(() => {
    if (selectedExam) {
      setFieldsExam()

      setCount()

      if (selectedExam.label == "Avaliação de matemática frentista") {
        const fields = [
          { label: "Quanto é 12 + 15?", response: "27", isSelect: false },
          { label: "Quanto é 50 - 23?", response: "27", isSelect: false },
          { label: "Quanto é 7 x 8?", response: "56", isSelect: false },
          { label: "Quanto é 56 / 7?", response: "8", isSelect: false },
          { label: "Um cliente paga R$50 por uma compra de R$32. Quanto é o troco?", response: "18", isSelect: false },
          { label: "Um produto custa R$80 e está com 10% de desconto. Qual é o preço com desconto?", response: "72", isSelect: false },
          { label: "Um cliente compra 3 itens de R$15 cada. Qual é o total?", response: "45", isSelect: false },
          { label: "Um pacote com 6 latas custa R$18. Qual é o preço de cada lata?", response: "3", isSelect: false },
        ]

        setFieldsExam(fields)
      }

      if (selectedExam.label == "Avaliação teórica frentista") {
        const fields = [
          {
            "label": "Qual é a primeira ação ao iniciar o abastecimento de um veículo?",
            "options": [
              { "value": 1, "label": "Conferir se o cliente está usando o cinto de segurança." },
              { "value": 2, "label": "Confirmar o tipo de combustível indicado pelo cliente." },
              { "value": 3, "label": "Abrir o capô do veículo." }
            ],
            "response": "Confirmar o tipo de combustível indicado pelo cliente.",
            "isSelect": true
          },
          {
            "label": "Qual o procedimento correto para medir o nível do óleo do motor?",
            "options": [
              { "value": 1, "label": "Medir com o motor quente e em funcionamento." },
              { "value": 2, "label": "Medir com o motor frio e o veículo nivelado." },
              { "value": 3, "label": "Medir com o carro em movimento." }
            ],
            "response": "Medir com o motor frio e o veículo nivelado.",
            "isSelect": true
          },
          {
            "label": "O que fazer se houver um pequeno vazamento de combustível durante o abastecimento?",
            "options": [
              { "value": 1, "label": "Continuar o abastecimento até completar o tanque." },
              { "value": 2, "label": "Limpar o local imediatamente e continuar o atendimento." },
              { "value": 3, "label": "Interromper o abastecimento e sinalizar a área para segurança." }
            ],
            "response": "Interromper o abastecimento e sinalizar a área para segurança.",
            "isSelect": true
          },
          {
            "label": "Como identificar o tipo de combustível adequado para um veículo?",
            "options": [
              { "value": 1, "label": "Perguntando ao cliente ou verificando o bocal do tanque." },
              { "value": 2, "label": "Experimentando um pouco de cada combustível." },
              { "value": 3, "label": "Escolhendo sempre gasolina comum." }
            ],
            "response": "Perguntando ao cliente ou verificando o bocal do tanque.",
            "isSelect": true
          },
          {
            "label": "Qual é a diferença principal entre gasolina comum e aditivada?",
            "options": [
              { "value": 1, "label": "A gasolina comum tem maior poder de limpeza no motor." },
              { "value": 2, "label": "A gasolina aditivada possui compostos que ajudam a manter o motor limpo." },
              { "value": 3, "label": "Não há diferença entre as duas." }
            ],
            "response": "A gasolina aditivada possui compostos que ajudam a manter o motor limpo.",
            "isSelect": true
          },
          {
            "label": "Como você ajusta a pressão dos pneus de forma correta?",
            "options": [
              { "value": 1, "label": "Consultando o manual do veículo ou a etiqueta e usando o calibrador." },
              { "value": 2, "label": "Inflando até o pneu parecer firme." },
              { "value": 3, "label": "Usando sempre a mesma pressão para todos os carros." }
            ],
            "response": "Consultando o manual do veículo ou a etiqueta e usando o calibrador.",
            "isSelect": true
          },
          {
            "label": "O que fazer ao identificar um pneu desgastado durante o atendimento?",
            "options": [
              { "value": 1, "label": "Informar ao cliente e sugerir a troca ou reparo." },
              { "value": 2, "label": "Continuar o atendimento normalmente." },
              { "value": 3, "label": "Limpar o pneu e recomendar calibragem." }
            ],
            "response": "Informar ao cliente e sugerir a troca ou reparo.",
            "isSelect": true
          },
          {
            "label": "Como deve ser feita a limpeza de um para-brisa?",
            "options": [
              { "value": 1, "label": "Usando qualquer produto disponível no posto." },
              { "value": 2, "label": "Usando produtos adequados para vidros e evitando arranhões." },
              { "value": 3, "label": "Apenas com água e sabão." }
            ],
            "response": "Usando produtos adequados para vidros e evitando arranhões.",
            "isSelect": true
          },
          {
            "label": "Como lidar com um cliente insatisfeito com o atendimento?",
            "options": [
              { "value": 1, "label": "Ouvir o cliente e tentar resolver o problema com cordialidade." },
              { "value": 2, "label": "Ignorar a reclamação e continuar o atendimento." },
              { "value": 3, "label": "Discutir com o cliente para esclarecer os erros." }
            ],
            "response": "Ouvir o cliente e tentar resolver o problema com cordialidade.",
            "isSelect": true
          },
          {
            "label": "O que fazer em caso de incêndio no posto de combustível?",
            "options": [
              { "value": 1, "label": "Usar água para apagar o fogo imediatamente." },
              { "value": 2, "label": "Desligar as bombas, evacuar a área e usar o extintor correto." },
              { "value": 3, "label": "Continuar atendendo até o incêndio ser controlado." }
            ],
            "response": "Desligar as bombas, evacuar a área e usar o extintor correto.",
            "isSelect": true
          },
          {
            "label": "Qual a forma correta de evitar fraudes durante os pagamentos?",
            "options": [
              { "value": 1, "label": "Conferir o valor na máquina e verificar a autenticidade do dinheiro." },
              { "value": 2, "label": "Aceitar todos os pagamentos sem questionamentos." },
              { "value": 3, "label": "Exigir pagamento somente em dinheiro." }
            ],
            "response": "Conferir o valor na máquina e verificar a autenticidade do dinheiro.",
            "isSelect": true
          },
          {
            "label": "O que você deve fazer se um cliente pedir para trocar o filtro de ar do veículo?",
            "options": [
              { "value": 1, "label": "Realizar a troca imediatamente." },
              { "value": 2, "label": "Informar que essa tarefa deve ser feita por um mecânico especializado." },
              { "value": 3, "label": "Sugerir que ele troque o filtro sozinho." }
            ],
            "response": "Informar que essa tarefa deve ser feita por um mecânico especializado.",
            "isSelect": true
          },
          {
            "label": "Como garantir que o local de trabalho esteja sempre limpo?",
            "options": [
              { "value": 1, "label": "Realizar limpezas rápidas apenas no final do dia." },
              { "value": 2, "label": "Limpar regularmente durante o turno, inclusive as bombas e o chão." },
              { "value": 3, "label": "Deixar a limpeza para uma equipe terceirizada." }
            ],
            "response": "Limpar regularmente durante o turno, inclusive as bombas e o chão.",
            "isSelect": true
          },
          {
            "label": "O que fazer se perceber que um colega está ignorando normas de segurança?",
            "options": [
              { "value": 1, "label": "Ignorar a situação para evitar conflitos." },
              { "value": 2, "label": "Alertar o colega e, se necessário, comunicar ao supervisor." },
              { "value": 3, "label": "Esperar que o colega perceba o erro sozinho." }
            ],
            "response": "Alertar o colega e, se necessário, comunicar ao supervisor.",
            "isSelect": true
          },
          {
            "label": "Qual é a prioridade ao atender um cliente apressado?",
            "options": [
              { "value": 1, "label": "Atendê-lo com calma e eficiência sem comprometer a segurança." },
              { "value": 2, "label": "Atendê-lo rapidamente, mesmo ignorando procedimentos." },
              { "value": 3, "label": "Dar prioridade a outro cliente que chegou antes." }
            ],
            "response": "Atendê-lo com calma e eficiência sem comprometer a segurança.",
            "isSelect": true
          },
          {
            "label": "O que fazer se houver um derramamento de óleo na área do posto?",
            "options": [
              { "value": 1, "label": "Isolar a área e limpar imediatamente com material apropriado." },
              { "value": 2, "label": "Cobrir com areia e deixar para limpar depois." },
              { "value": 3, "label": "Continuar o atendimento como se nada tivesse acontecido." }
            ],
            "response": "Isolar a área e limpar imediatamente com material apropriado.",
            "isSelect": true
          },
          {
            "label": "Como explicar os benefícios do combustível aditivado?",
            "options": [
              { "value": 1, "label": "Dizer que é mais caro, mas funciona melhor." },
              { "value": 2, "label": "Explicar que ele ajuda a limpar e proteger o motor, aumentando a eficiência." },
              { "value": 3, "label": "Informar que ele é obrigatório para todos os carros." }
            ],
            "response": "Explicar que ele ajuda a limpar e proteger o motor, aumentando a eficiência.",
            "isSelect": true
          },
          {
            "label": "Qual atitude é mais importante para o atendimento ao cliente?",
            "options": [
              { "value": 1, "label": "Falar rapidamente para economizar tempo." },
              { "value": 2, "label": "Ser cordial, atencioso e ágil." },
              { "value": 3, "label": "Evitar conversa para manter o foco no trabalho." }
            ],
            "response": "Ser cordial, atencioso e ágil.",
            "isSelect": true
          },
          {
            "label": "Como agir se o cliente solicitar um serviço que você não sabe realizar?",
            "options": [
              { "value": 1, "label": "Informar que não pode realizar e buscar ajuda de um colega ou supervisor." },
              { "value": 2, "label": "Tentar fazer sozinho, mesmo sem conhecimento." },
              { "value": 3, "label": "Pedir que o cliente procure outro posto." }
            ],
            "response": "Informar que não pode realizar e buscar ajuda de um colega ou supervisor.",
            "isSelect": true
          },
          {
            "label": "Como lidar com a pressão em horários de pico?",
            "options": [
              { "value": 1, "label": "Focar na rapidez, mesmo que os procedimentos não sejam seguidos corretamente." },
              { "value": 2, "label": "Manter a calma, organizar as tarefas e atender com eficiência." },
              { "value": 3, "label": "Pedir para outros colegas fazerem o trabalho enquanto você descansa." }
            ],
            "response": "Manter a calma, organizar as tarefas e atender com eficiência.",
            "isSelect": true
          }
        ]

        setFieldsExam(fields)
      }
    }
  }, [selectedExam])

  const handleClose = () => {
    setSelectedExam()

    setFieldsExam()

    setCount()

    setExamsCorrectionModalOpen(false)
  }

  return (
    <Modal
      show={examsCorrectionModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Corretor de provas</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ReactSelect
          placeholder={""}
          options={[
            { value: 1, label: "Avaliação de matemática frentista" },
            { value: 2, label: "Avaliação teórica frentista" },
          ]}
          onChange={(value) => setSelectedExam(value)}
        />

        {
          fieldsExam && fieldsExam.length > 0 && (
            <>
              {
                fieldsExam.map((field) => (
                  <>
                    {
                      !field.isSelect && (
                        <div className="mt-3 mb-3">
                          <label><b>{field.label}</b></label>

                          <input
                            className="form-control mt-2"
                            onChange={(e) => {
                              if (e.target.value === field.response) {
                                e.target.classList.add("is-valid")

                                e.target.classList.remove("is-invalid")
                              } else {
                                e.target.classList.remove("is-valid")

                                e.target.classList.add("is-invalid")
                              }

                              const validCount = document.querySelectorAll("input.is-valid").length

                              setCount(`Quantidade de acertos: ${validCount}/${fieldsExam.length}`)
                            }}
                          />
                        </div>
                      ) || (
                        <div className="mt-3 mb-3" ref={selectRef}>
                          <label className="mb-2"><b>{field.label}</b></label>

                          <select
                            ref={selectRef}
                            className="form-select mt-2"
                            onChange={(e) => {
                              const isCorrect = e.target.value === field.response

                              e.target.classList.remove("is-valid", "is-invalid")

                              e.target.classList.add(isCorrect ? "is-valid" : "is-invalid")

                              const validCount = document.querySelectorAll("select.is-valid").length

                              setCount(`Quantidade de acertos: ${validCount}/${fieldsExam.length}`)
                            }}
                          >
                            <option value="">Selecione uma opção</option>

                            {
                              field.options.map((opt, idx) => (
                                <option key={idx} value={opt.label}>
                                  {opt.label}
                                </option>
                              ))
                            }
                          </select>
                        </div>
                      )
                    }
                  </>
                ))
              }
            </>
          )
        }

        <div className="text-center mt-3 mb-3">
          <h4>{count}</h4>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExamsCorrectionModal