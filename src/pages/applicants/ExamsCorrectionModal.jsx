import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from "../../services/api"

const ExamsCorrectionModal = (props) => {
  const { examsCorrectionModalOpen, setExamsCorrectionModalOpen } = props

  const selectRef = useRef(null)

  const [selectedExam, setSelectedExam] = useState()

  const [fieldsExam, setFieldsExam] = useState()

  const [count, setCount] = useState()

  const [currentField, setCurrentField] = useState()

  const [allFields, setAllFields] = useState()

  const [applicantsOptions, setApplicantsOptions] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  useEffect(() => {
    api
      .get(`/applicants`)
      .then((response) => {
        let options = response.data.map((option) => ({ value: option.id, label: option.name }))

        setApplicantsOptions(options)
      })
  }, [examsCorrectionModalOpen])

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

      if (selectedExam.label == "Avaliação matemática operador de caixa") {
        const fields = [
          { label: "Um cliente abasteceu R$ 78,50 e pagou com R$ 100,00. Qual será o troco?", response: "21,50", isSelect: false },
          { label: "Um produto custa R$ 60,00. Durante a promoção, o cliente recebe 10% de desconto. Qual será o valor final?", response: "54,00", isSelect: false },
          { label: "O cliente quer abastecer R$ 120,00 de gasolina, que custa R$ 6,00 por litro. Quantos litros ele conseguirá abastecer?", response: "20", isSelect: false },
          { label: "Um cliente comprou um óleo por R$ 50,00 e abasteceu R$ 100,00. Qual é o total a ser pago?", response: "150,00", isSelect: false },
          { label: "Um cliente pagou R$ 300,00 divididos igualmente em três cartões. Quanto foi cobrado em cada cartão?", response: "100,00", isSelect: false },
          { label: "O litro do diesel subiu de R$ 4,80 para R$ 5,28. Qual foi o percentual de aumento?", response: "10", isSelect: false },
          { label: "O caixa começou o turno com R$ 200,00. Durante o dia, foram feitas vendas no valor de R$ 3.000,00, e o troco dado foi de R$ 1.250,00. Qual é o saldo final?", response: "1950,00", isSelect: false },
          { label: "O troco correto era R$ 12,50, mas o operador devolveu R$ 10,50. Quanto falta devolver?", response: "2,00", isSelect: false },
          { label: "O operador de caixa recebe 1% de comissão sobre as vendas. Se o total de vendas foi de R$ 4.500,00, qual será a comissão?", response: "45,00", isSelect: false },
          { label: "Um cliente abasteceu 42 litros de gasolina ao preço de R$ 6,20 por litro. Qual foi o valor total?", response: "260,40", isSelect: false }
        ]

        setFieldsExam(fields)
      }

      if (selectedExam.label == "Avaliação teórica operador de caixa") {
        const fields = [
          {
            label: "O que deve ser feito quando faltar troco para o cliente?",
            options: [
              { value: 1, label: "Devolver menos dinheiro e informar o cliente." },
              { value: 2, label: "Pedir ao cliente que procure troco em outro lugar." },
              { value: 3, label: "Explicar a situação e buscar troco com rapidez." }
            ],
            response: "Explicar a situação e buscar troco com rapidez.",
            isSelect: true
          },
          {
            label: "Qual é a função principal de um caixa?",
            options: [
              { value: 1, label: "Repor mercadorias na loja de conveniência." },
              { value: 2, label: "Registrar vendas e controlar os pagamentos." },
              { value: 3, label: "Limpar as bombas de combustível." }
            ],
            response: "Registrar vendas e controlar os pagamentos.",
            isSelect: true
          },
          {
            label: "O que fazer se um cliente reclamar de um erro no troco?",
            options: [
              { value: 1, label: "Verificar o erro e corrigir imediatamente." },
              { value: 2, label: "Ignorar a reclamação e continuar atendendo." },
              { value: 3, label: "Dizer que o caixa está sempre certo." }
            ],
            response: "Verificar o erro e corrigir imediatamente.",
            isSelect: true
          },
          {
            label: "Qual procedimento adotar ao receber uma nota falsa?",
            options: [
              { value: 1, label: "Guardar a nota e finalizar a venda." },
              { value: 2, label: "Recusar a nota e informar a supervisão." },
              { value: 3, label: "Aceitar a nota e evitar conflitos com o cliente." }
            ],
            response: "Recusar a nota e informar a supervisão.",
            isSelect: true
          },
          {
            label: "Como agir em situações de furto no posto?",
            options: [
              { value: 1, label: "Confrontar diretamente o suspeito." },
              { value: 2, label: "Alertar a segurança ou a gerência do posto." },
              { value: 3, label: "Ignorar e continuar trabalhando." }
            ],
            response: "Alertar a segurança ou a gerência do posto.",
            isSelect: true
          },
          {
            label: "O que fazer ao identificar um erro no sistema do caixa?",
            options: [
              { value: 1, label: "Desligar o sistema e tentar consertar sozinho." },
              { value: 2, label: "Informar imediatamente o supervisor ou gerente." },
              { value: 3, label: "Continuar trabalhando sem reportar o erro." }
            ],
            response: "Informar imediatamente o supervisor ou gerente.",
            isSelect: true
          },
          {
            label: "Qual é o procedimento correto para registrar um pagamento com cartão?",
            options: [
              { value: 1, label: "Apenas digitar o valor e finalizar a venda." },
              { value: 2, label: "Solicitar ao cliente que insira o cartão e verifique os dados." },
              { value: 3, label: "Pedir que o cliente leia as instruções sozinho." }
            ],
            response: "Solicitar ao cliente que insira o cartão e verifique os dados.",
            isSelect: true
          },
          {
            label: "Por que é importante manter o local de trabalho organizado?",
            options: [
              { value: 1, label: "Para impressionar a gerência." },
              { value: 2, label: "Para evitar confusão e melhorar o atendimento." },
              { value: 3, label: "Porque é obrigatório por lei." }
            ],
            response: "Para evitar confusão e melhorar o atendimento.",
            isSelect: true
          },
          {
            label: "Como o caixa deve agir em caso de divergência no fechamento do caixa?",
            options: [
              { value: 1, label: "Relatar a divergência imediatamente." },
              { value: 2, label: "Guardar o dinheiro excedente para o dia seguinte." },
              { value: 3, label: "Ajustar os valores para que tudo pareça correto." }
            ],
            response: "Relatar a divergência imediatamente.",
            isSelect: true
          },
          {
            label: "O que significa “prestar um atendimento cordial”?",
            options: [
              { value: 1, label: "Ser educado e atencioso com o cliente" },
              { value: 2, label: "Fazer apenas o mínimo necessário." },
              { value: 3, label: "Atender rápido, sem se preocupar com a experiência do cliente." }
            ],
            response: "Ser educado e atencioso com o cliente",
            isSelect: true
          },
          {
            label: "Qual é a primeira ação ao abrir o caixa no início do turno?",
            options: [
              { value: 1, label: "Conferir o fundo de troco inicial." },
              { value: 2, label: "Começar a atender imediatamente." },
              { value: 3, label: "Verificar as bombas de combustível." }
            ],
            response: "Conferir o fundo de troco inicial.",
            isSelect: true
          },
          {
            label: "O que deve ser feito em caso de dúvida sobre um preço?",
            options: [
              { value: 1, label: "Informar um preço aproximado ao cliente." },
              { value: 2, label: "Verificar o preço no sistema ou com um colega." },
              { value: 3, label: "Pedir ao cliente que descubra sozinho." }
            ],
            response: "Verificar o preço no sistema ou com um colega.",
            isSelect: true
          },
          {
            label: "Por que é importante conhecer os métodos de pagamento aceitos?",
            options: [
              { value: 1, label: "Para evitar problemas durante o atendimento." },
              { value: 2, label: "Para convencer o cliente a pagar em dinheiro." },
              { value: 3, label: "Para controlar o estoque do posto." }
            ],
            response: "Para evitar problemas durante o atendimento.",
            isSelect: true
          },
          {
            label: "O que fazer se um cliente pedir ajuda para usar a bomba de combustível?",
            options: [
              { value: 1, label: "Explicar pacientemente e oferecer ajuda." },
              { value: 2, label: "Dizer que o cliente deve se virar sozinho." },
              { value: 3, label: "Informar que essa não é sua função." }
            ],
            response: "Explicar pacientemente e oferecer ajuda.",
            isSelect: true
          },
          {
            label: "Como lidar com um cliente insatisfeito?",
            options: [
              { value: 1, label: "Ignorar a insatisfação e continuar atendendo." },
              { value: 2, label: "Ouvir, buscar entender o problema e oferecer uma solução." },
              { value: 3, label: "Pedir que ele volte em outro horário." }
            ],
            response: "Ouvir, buscar entender o problema e oferecer uma solução.",
            isSelect: true
          },
          {
            label: "O que é essencial ao contar cédulas no caixa?",
            options: [
              { value: 1, label: "Fazer rapidamente, sem verificar os valores." },
              { value: 2, label: "Contar com calma e atenção para evitar erros." },
              { value: 3, label: "Delegar a contagem a outro colega." }
            ],
            response: "Contar com calma e atenção para evitar erros.",
            isSelect: true
          },
          {
            label: "Como proceder em caso de pane elétrica no posto?",
            options: [
              { value: 1, label: "Tentar resolver sozinho." },
              { value: 2, label: "Interromper o atendimento e informar o gerente." },
              { value: 3, label: "Continuar atendendo normalmente." }
            ],
            response: "Interromper o atendimento e informar o gerente.",
            isSelect: true
          },
          {
            label: "Qual é a atitude esperada em relação ao uso do celular no trabalho?",
            options: [
              { value: 1, label: "Usar livremente durante o expediente." },
              { value: 2, label: "Evitar o uso durante o atendimento." },
              { value: 3, label: "Somente usar para resolver questões pessoais urgentes." }
            ],
            response: "Evitar o uso durante o atendimento.",
            isSelect: true
          },
          {
            label: "Como proceder ao receber um pagamento em cheque?",
            options: [
              { value: 1, label: "Aceitar qualquer cheque sem verificar." },
              { value: 2, label: "Conferir os dados e validar a autenticidade." },
              { value: 3, label: "Recusar todos os cheques por padrão." }
            ],
            response: "Conferir os dados e validar a autenticidade.",
            isSelect: true
          },
          {
            label: "O que é mais importante ao lidar com grandes valores no caixa?",
            options: [
              { value: 1, label: "Ser discreto e seguir os procedimentos de segurança." },
              { value: 2, label: "Exibir o dinheiro para que outros vejam." },
              { value: 3, label: "Guardar os valores de forma desorganizada." }
            ],
            response: "Ser discreto e seguir os procedimentos de segurança.",
            isSelect: true
          }
        ]

        setFieldsExam(fields)
      }

      if (selectedExam == "Avaliação teórica frentista caixa") {
        const fields = [
          {
            label: "O que deve ser feito quando faltar troco para o cliente?",
            options: [
              { value: 1, label: "Devolver menos dinheiro e informar o cliente." },
              { value: 2, label: "Pedir ao cliente que procure troco em outro lugar." },
              { value: 3, label: "Explicar a situação e buscar troco com rapidez." }
            ],
            response: "Explicar a situação e buscar troco com rapidez.",
            isSelect: true
          },
          {
            label: "Qual é a função principal de um caixa?",
            options: [
              { value: 1, label: "Repor mercadorias na loja de conveniência." },
              { value: 2, label: "Registrar vendas e controlar os pagamentos." },
              { value: 3, label: "Limpar as bombas de combustível." }
            ],
            response: "Registrar vendas e controlar os pagamentos.",
            isSelect: true
          },
          {
            label: "O que fazer se um cliente reclamar de um erro no troco?",
            options: [
              { value: 1, label: "Verificar o erro e corrigir imediatamente." },
              { value: 2, label: "Ignorar a reclamação e continuar atendendo." },
              { value: 3, label: "Dizer que o caixa está sempre certo." }
            ],
            response: "Verificar o erro e corrigir imediatamente.",
            isSelect: true
          },
          {
            label: "Qual procedimento adotar ao receber uma nota falsa?",
            options: [
              { value: 1, label: "Guardar a nota e finalizar a venda." },
              { value: 2, label: "Recusar a nota e informar a supervisão." },
              { value: 3, label: "Aceitar a nota e evitar conflitos com o cliente." }
            ],
            response: "Recusar a nota e informar a supervisão.",
            isSelect: true
          },
          {
            label: "Como agir em situações de furto no posto?",
            options: [
              { value: 1, label: "Confrontar diretamente o suspeito." },
              { value: 2, label: "Alertar a segurança ou a gerência do posto." },
              { value: 3, label: "Ignorar e continuar trabalhando." }
            ],
            response: "Alertar a segurança ou a gerência do posto.",
            isSelect: true
          },
          {
            label: "O que fazer ao identificar um erro no sistema do caixa?",
            options: [
              { value: 1, label: "Desligar o sistema e tentar consertar sozinho." },
              { value: 2, label: "Informar imediatamente o supervisor ou gerente." },
              { value: 3, label: "Continuar trabalhando sem reportar o erro." }
            ],
            response: "Informar imediatamente o supervisor ou gerente.",
            isSelect: true
          },
          {
            label: "Qual é o procedimento correto para registrar um pagamento com cartão?",
            options: [
              { value: 1, label: "Apenas digitar o valor e finalizar a venda." },
              { value: 2, label: "Solicitar ao cliente que insira o cartão e verifique os dados." },
              { value: 3, label: "Pedir que o cliente leia as instruções sozinho." }
            ],
            response: "Solicitar ao cliente que insira o cartão e verifique os dados.",
            isSelect: true
          },
          {
            label: "Por que é importante manter o local de trabalho organizado?",
            options: [
              { value: 1, label: "Para impressionar a gerência." },
              { value: 2, label: "Para evitar confusão e melhorar o atendimento." },
              { value: 3, label: "Porque é obrigatório por lei." }
            ],
            response: "Para evitar confusão e melhorar o atendimento.",
            isSelect: true
          },
          {
            label: "Como o caixa deve agir em caso de divergência no fechamento do caixa?",
            options: [
              { value: 1, label: "Relatar a divergência imediatamente." },
              { value: 2, label: "Guardar o dinheiro excedente para o dia seguinte." },
              { value: 3, label: "Ajustar os valores para que tudo pareça correto." }
            ],
            response: "Relatar a divergência imediatamente.",
            isSelect: true
          },
          {
            label: "O que significa “prestar um atendimento cordial”?",
            options: [
              { value: 1, label: "Ser educado e atencioso com o cliente" },
              { value: 2, label: "Fazer apenas o mínimo necessário." },
              { value: 3, label: "Atender rápido, sem se preocupar com a experiência do cliente." }
            ],
            response: "Ser educado e atencioso com o cliente",
            isSelect: true
          },
          {
            label: "Qual é a primeira ação ao abrir o caixa no início do turno?",
            options: [
              { value: 1, label: "Conferir o fundo de troco inicial." },
              { value: 2, label: "Começar a atender imediatamente." },
              { value: 3, label: "Verificar as bombas de combustível." }
            ],
            response: "Conferir o fundo de troco inicial.",
            isSelect: true
          },
          {
            label: "O que deve ser feito em caso de dúvida sobre um preço?",
            options: [
              { value: 1, label: "Informar um preço aproximado ao cliente." },
              { value: 2, label: "Verificar o preço no sistema ou com um colega." },
              { value: 3, label: "Pedir ao cliente que descubra sozinho." }
            ],
            response: "Verificar o preço no sistema ou com um colega.",
            isSelect: true
          },
          {
            label: "Por que é importante conhecer os métodos de pagamento aceitos?",
            options: [
              { value: 1, label: "Para evitar problemas durante o atendimento." },
              { value: 2, label: "Para convencer o cliente a pagar em dinheiro." },
              { value: 3, label: "Para controlar o estoque do posto." }
            ],
            response: "Para evitar problemas durante o atendimento.",
            isSelect: true
          },
          {
            label: "O que fazer se um cliente pedir ajuda para usar a bomba de combustível?",
            options: [
              { value: 1, label: "Explicar pacientemente e oferecer ajuda." },
              { value: 2, label: "Dizer que o cliente deve se virar sozinho." },
              { value: 3, label: "Informar que essa não é sua função." }
            ],
            response: "Explicar pacientemente e oferecer ajuda.",
            isSelect: true
          },
          {
            label: "Como lidar com um cliente insatisfeito?",
            options: [
              { value: 1, label: "Ignorar a insatisfação e continuar atendendo." },
              { value: 2, label: "Ouvir, buscar entender o problema e oferecer uma solução." },
              { value: 3, label: "Pedir que ele volte em outro horário." }
            ],
            response: "Ouvir, buscar entender o problema e oferecer uma solução.",
            isSelect: true
          },
          {
            label: "O que é essencial ao contar cédulas no caixa?",
            options: [
              { value: 1, label: "Fazer rapidamente, sem verificar os valores." },
              { value: 2, label: "Contar com calma e atenção para evitar erros." },
              { value: 3, label: "Delegar a contagem a outro colega." }
            ],
            response: "Contar com calma e atenção para evitar erros.",
            isSelect: true
          },
          {
            label: "Como proceder em caso de pane elétrica no posto?",
            options: [
              { value: 1, label: "Tentar resolver sozinho." },
              { value: 2, label: "Interromper o atendimento e informar o gerente." },
              { value: 3, label: "Continuar atendendo normalmente." }
            ],
            response: "Interromper o atendimento e informar o gerente.",
            isSelect: true
          },
          {
            label: "Qual é a atitude esperada em relação ao uso do celular no trabalho?",
            options: [
              { value: 1, label: "Usar livremente durante o expediente." },
              { value: 2, label: "Evitar o uso durante o atendimento." },
              { value: 3, label: "Somente usar para resolver questões pessoais urgentes." }
            ],
            response: "Evitar o uso durante o atendimento.",
            isSelect: true
          },
          {
            label: "Como proceder ao receber um pagamento em cheque?",
            options: [
              { value: 1, label: "Aceitar qualquer cheque sem verificar." },
              { value: 2, label: "Conferir os dados e validar a autenticidade." },
              { value: 3, label: "Recusar todos os cheques por padrão." }
            ],
            response: "Conferir os dados e validar a autenticidade.",
            isSelect: true
          },
          {
            label: "O que é mais importante ao lidar com grandes valores no caixa?",
            options: [
              { value: 1, label: "Ser discreto e seguir os procedimentos de segurança." },
              { value: 2, label: "Exibir o dinheiro para que outros vejam." },
              { value: 3, label: "Guardar os valores de forma desorganizada." }
            ],
            response: "Ser discreto e seguir os procedimentos de segurança.",
            isSelect: true
          }
        ]

        setFieldsExam(fields)
      }

      if (selectedExam == "Avaliação matemática frentista caixa") {
        const fields = [
          { label: "Um cliente abasteceu R$ 78,50 e pagou com R$ 100,00. Qual será o troco?", response: "21,50", isSelect: false },
          { label: "Um produto custa R$ 60,00. Durante a promoção, o cliente recebe 10% de desconto. Qual será o valor final?", response: "54,00", isSelect: false },
          { label: "O cliente quer abastecer R$ 120,00 de gasolina, que custa R$ 6,00 por litro. Quantos litros ele conseguirá abastecer?", response: "20", isSelect: false },
          { label: "Um cliente comprou um óleo por R$ 50,00 e abasteceu R$ 100,00. Qual é o total a ser pago?", response: "150,00", isSelect: false },
          { label: "Um cliente pagou R$ 300,00 divididos igualmente em três cartões. Quanto foi cobrado em cada cartão?", response: "100,00", isSelect: false },
          { label: "O litro do diesel subiu de R$ 4,80 para R$ 5,28. Qual foi o percentual de aumento?", response: "10", isSelect: false },
          { label: "O caixa começou o turno com R$ 200,00. Durante o dia, foram feitas vendas no valor de R$ 3.000,00, e o troco dado foi de R$ 1.250,00. Qual é o saldo final?", response: "1950,00", isSelect: false },
          { label: "O troco correto era R$ 12,50, mas o operador devolveu R$ 10,50. Quanto falta devolver?", response: "2,00", isSelect: false },
          { label: "O operador de caixa recebe 1% de comissão sobre as vendas. Se o total de vendas foi de R$ 4.500,00, qual será a comissão?", response: "45,00", isSelect: false },
          { label: "Um cliente abasteceu 42 litros de gasolina ao preço de R$ 6,20 por litro. Qual foi o valor total?", response: "260,40", isSelect: false }
        ]

        setFieldsExam(fields)
      }

      if (selectedExam == "Avaliação matemática trocador de óleo") {
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

      if (selectedExam == "Avaliação teórica trocador de óleo") {
        const fields = [
          {
            label: "Qual é a função do óleo no motor?",
            options: [
              { value: 1, label: "Lubrificar as partes móveis do motor e reduzir o atrito." },
              { value: 2, label: "Lubrificar as partes fixas do motor e reduzir o ruído." },
              { value: 3, label: "Lubrificar as partes variáveis do motor e reduzir o ruído da cabine." }
            ],
            response: "Lubrificar as partes móveis do motor e reduzir o atrito.",
            isSelect: true
          },
          {
            label: "Com que frequência deve-se trocar o óleo do motor?",
            options: [
              { value: 1, label: "Geralmente a cada 8.000 a 12.000 km, dependendo do tipo de óleo e do veículo." },
              { value: 2, label: "Geralmente quando o motor faz barulho ou o óleo está poluído." },
              { value: 3, label: "Geralmente a cada 5.000 a 10.000 km, dependendo do tipo de óleo e do veículo ou 6 meses." }
            ],
            response: "Geralmente a cada 5.000 a 10.000 km, dependendo do tipo de óleo e do veículo ou 6 meses.",
            isSelect: true
          },
          {
            label: "O que deve ser verificado antes de trocar o óleo?",
            options: [
              { value: 1, label: "Se o veículo é Flex ou GNV." },
              { value: 2, label: "Nível do óleo, tipo de óleo recomendado pelo fabricante e o filtro de óleo." },
              { value: 3, label: "KM rodado e mais de 1 ano de uso." }
            ],
            response: "Nível do óleo, tipo de óleo recomendado pelo fabricante e o filtro de óleo.",
            isSelect: true
          },
          {
            label: "Por que é importante trocar o filtro de óleo junto com o óleo?",
            options: [
              { value: 1, label: "Para o óleo ter maior tempo de duração." },
              { value: 2, label: "Para garantir que o motor não vai fazer barulho." },
              { value: 3, label: "Para garantir que as impurezas não contaminem o novo óleo." }
            ],
            response: "Para garantir que as impurezas não contaminem o novo óleo.",
            isSelect: true
          },
          {
            label: "Quais são os tipos de óleo mais comuns?",
            options: [
              { value: 1, label: "Mineral." },
              { value: 2, label: "Mineral, semissintético e sintético." },
              { value: 3, label: "Semissintético e sintético." }
            ],
            response: "Mineral, semissintético e sintético.",
            isSelect: true
          },
          {
            label: "Como saber qual tipo de óleo é recomendado para usar no motor do veículo?",
            options: [
              { value: 1, label: "Consultar o manual do veículo ou as recomendações do fabricante." },
              { value: 2, label: "Perguntar para o proprietário do veículo." },
              { value: 3, label: "Misturar óleo Mineral, semissintético e sintético." }
            ],
            response: "Consultar o manual do veículo ou as recomendações do fabricante.",
            isSelect: true
          },
          {
            label: "O que pode acontecer se o óleo do motor não for trocado regularmente?",
            options: [
              { value: 1, label: "Pode causar desgaste prematuro do motor e falhas mecânicas." },
              { value: 2, label: "Pode aumentar o ruído na cabine." },
              { value: 3, label: "Nada, é somente para ter óleo novo no motor." }
            ],
            response: "Pode causar desgaste prematuro do motor e falhas mecânicas.",
            isSelect: true
          },
          {
            label: "Qual é a função do filtro de óleo do motor?",
            options: [
              { value: 1, label: "Não deixar misturar combustível com óleo." },
              { value: 2, label: "Reduzir o ruído do motor." },
              { value: 3, label: "Reter impurezas e partículas que podem danificar o motor." }
            ],
            response: "Reter impurezas e partículas que podem danificar o motor.",
            isSelect: true
          },
          {
            label: "O que é a classificação API?",
            options: [
              { value: 1, label: "Informar de quem é o fabricante do óleo." },
              { value: 2, label: "Sistema de classificação que indica a qualidade e o desempenho do óleo." },
              { value: 3, label: "Sigla que informa a validade do óleo." }
            ],
            response: "Sistema de classificação que indica a qualidade e o desempenho do óleo.",
            isSelect: true
          },
          {
            label: "O que é um aditivo de óleo?",
            options: [
              { value: 1, label: "Substância adicionada ao óleo para melhorar suas propriedades." },
              { value: 2, label: "Substância adicionada ao radiador para melhorar as propriedades de óleo." },
              { value: 3, label: "Substância adicionada ao óleo para refrigerar o motor." }
            ],
            response: "Substância adicionada ao óleo para melhorar suas propriedades.",
            isSelect: true
          },
          {
            label: "Qual é a diferença entre óleo sintético e mineral?",
            options: [
              { value: 1, label: "Não tem diferença, é questão de escolha do cliente." },
              { value: 2, label: "O óleo mineral é quimicamente modificado para melhor desempenho, enquanto o sintético é refinado do petróleo bruto." },
              { value: 3, label: "O óleo sintético é quimicamente modificado para melhor desempenho, enquanto o mineral é refinado do petróleo bruto." }
            ],
            response: "O óleo sintético é quimicamente modificado para melhor desempenho, enquanto o mineral é refinado do petróleo bruto.",
            isSelect: true
          },
          {
            label: "Por que é importante não sobrecarregar o motor com óleo?",
            options: [
              { value: 1, label: "Porque pode causar aumento da pressão e vazamentos." },
              { value: 2, label: "Porque o motor não funciona corretamente." },
              { value: 3, label: "Nenhuma das alternativas." }
            ],
            response: "Porque pode causar aumento da pressão e vazamentos.",
            isSelect: true
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

  const handleSubmit = () => {
    const uniqueFields = allFields.reduce((acc, current) => {
      const existingIndex = acc.findIndex(item => item.question === current.question)

      if (existingIndex >= 0) {
        acc[existingIndex] = current
      } else {
        acc.push(current)
      }

      return acc
    }, [])

    let requestBody = {
      applicant_id: selectedApplicant?.value,
      exam_label: selectedExam?.label,
      responses: JSON.stringify(
        uniqueFields.map(field => ({
          question: field.question,
          response: field.response,
          isCorrect: field.isCorrect,
        }))
      )
    }

    api
      .post(`/applicants/${selectedApplicant?.value}/exams`, requestBody)
      .then((response) => console.log(response))
  }

  return (
    <Modal
      show={examsCorrectionModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Corrigir provas</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label fw-bold">Candidato</label>

          <ReactSelect
            placeholder={""}
            options={applicantsOptions}
            onChange={(value) => setSelectedApplicant(value)}
          />
        </div>

        <label className="form-label fw-bold">Tipo de avaliação</label>

        <ReactSelect
          placeholder={""}
          options={[
            { value: 1, label: "Avaliação de matemática frentista" },
            { value: 2, label: "Avaliação teórica frentista" },
            { value: 3, label: "Avaliação matemática operador de caixa" },
            { value: 4, label: "Avaliação teórica operador de caixa" },
            { value: 5, label: "Avaliação matemática frentista caixa" },
            { value: 6, label: "Avaliação teórica frentista caixa" },
            { value: 7, label: "Avaliação matemática trocador de óleo" },
            { value: 8, label: "Avaliação teórica trocador de óleo" },
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

                              setAllFields((prevState) => {
                                if (prevState) {
                                  return [
                                    ...prevState,
                                    {
                                      "question": field.label,
                                      "response": e.target.value,
                                      "isCorrect": e.target.value === field.response && true || false
                                    }
                                  ]
                                } else {
                                  return [
                                    {
                                      "question": field.label,
                                      "response": e.target.value,
                                      "isCorrect": e.target.value === field.response && true || false
                                    }
                                  ]
                                }
                              })
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

                              setAllFields((prevState) => {
                                if (prevState) {
                                  return [
                                    ...prevState,
                                    {
                                      "question": field.label,
                                      "response": e.target.value,
                                      "isCorrect": e.target.value === field.response && true || false
                                    }
                                  ]
                                } else {
                                  return [
                                    {
                                      "question": field.label,
                                      "response": e.target.value,
                                      "isCorrect": e.target.value === field.response && true || false
                                    }
                                  ]
                                }
                              })
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
        <Button variant="light" onClick={handleClose}>Fechar</Button>

        <Button variant="success" onClick={handleSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExamsCorrectionModal