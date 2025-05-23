import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactSelect from "react-select"
import api from '../../services/api'

const SeeApplicantsExamsModal = (props) => {
  const { applicantsExamsModalOpen, setApplicantsExamsModalOpen, selectedApplicant, setSelectedApplicant, setSelectiveProcessModalOpen } = props

  const selectRef = useRef(null)

  const [selectedExam, setSelectedExam] = useState()

  const [fieldsExam, setFieldsExam] = useState()

  const [count, setCount] = useState()

  const [allFields, setAllFields] = useState()

  const [applicantExamsList, setApplicantExamsList] = useState()

  useEffect(() => {
    if (selectedExam) {
      setFieldsExam()

      setCount()

      if (selectedExam.label == "Avaliação de matemática frentista") {
        const fields = [
          { label: "1. Quanto é 12 + 15?", response: "27", isSelect: false },
          { label: "2. Quanto é 50 - 23?", response: "27", isSelect: false },
          { label: "3. Quanto é 7 x 8?", response: "56", isSelect: false },
          { label: "4. Quanto é 56 / 7?", response: "8", isSelect: false },
          { label: "5. Um cliente paga R$50 por uma compra de R$32. Quanto é o troco?", response: "18", isSelect: false },
          { label: "6. Um produto custa R$80 e está com 10% de desconto. Qual é o preço com desconto?", response: "72", isSelect: false },
          { label: "7. Um cliente compra 3 itens de R$15 cada. Qual é o total?", response: "45", isSelect: false },
          { label: "8. Um pacote com 6 latas custa R$18. Qual é o preço de cada lata?", response: "3", isSelect: false },
        ]
        setFieldsExam(fields)
      }

      if (selectedExam.label == "Avaliação teórica frentista") {
        const fields = [
          {
            "label": "1. Qual é a primeira ação ao iniciar o abastecimento de um veículo?",
            "options": [
              { "value": 1, "label": "a) Conferir se o cliente está usando o cinto de segurança." },
              { "value": 2, "label": "b) Confirmar o tipo de combustível indicado pelo cliente." },
              { "value": 3, "label": "c) Abrir o capô do veículo." }
            ],
            "response": "b) Confirmar o tipo de combustível indicado pelo cliente.",
            "isSelect": true
          },
          {
            "label": "2. Qual o procedimento correto para medir o nível do óleo do motor?",
            "options": [
              { "value": 1, "label": "a) Medir com o motor quente e em funcionamento." },
              { "value": 2, "label": "b) Medir com o motor frio e o veículo nivelado." },
              { "value": 3, "label": "c) Medir com o carro em movimento." }
            ],
            "response": "b) Medir com o motor frio e o veículo nivelado.",
            "isSelect": true
          },
          {
            "label": "3. O que fazer se houver um pequeno vazamento de combustível durante o abastecimento?",
            "options": [
              { "value": 1, "label": "a) Continuar o abastecimento até completar o tanque." },
              { "value": 2, "label": "b) Limpar o local imediatamente e continuar o atendimento." },
              { "value": 3, "label": "c) Interromper o abastecimento e sinalizar a área para segurança." }
            ],
            "response": "c) Interromper o abastecimento e sinalizar a área para segurança.",
            "isSelect": true
          },
          {
            "label": "4. Como identificar o tipo de combustível adequado para um veículo?",
            "options": [
              { "value": 1, "label": "a) Perguntando ao cliente ou verificando o bocal do tanque." },
              { "value": 2, "label": "b) Experimentando um pouco de cada combustível." },
              { "value": 3, "label": "c) Escolhendo sempre gasolina comum." }
            ],
            "response": "a) Perguntando ao cliente ou verificando o bocal do tanque.",
            "isSelect": true
          },
          {
            "label": "5. Qual é a diferença principal entre gasolina comum e aditivada?",
            "options": [
              { "value": 1, "label": "a) A gasolina comum tem maior poder de limpeza no motor." },
              { "value": 2, "label": "b) A gasolina aditivada possui compostos que ajudam a manter o motor limpo." },
              { "value": 3, "label": "c) Não há diferença entre as duas." }
            ],
            "response": "b) A gasolina aditivada possui compostos que ajudam a manter o motor limpo.",
            "isSelect": true
          },
          {
            "label": "6. Como você ajusta a pressão dos pneus de forma correta?",
            "options": [
              { "value": 1, "label": "a) Consultando o manual do veículo ou a etiqueta e usando o calibrador." },
              { "value": 2, "label": "b) Inflando até o pneu parecer firme." },
              { "value": 3, "label": "c) Usando sempre a mesma pressão para todos os carros." }
            ],
            "response": "a) Consultando o manual do veículo ou a etiqueta e usando o calibrador.",
            "isSelect": true
          },
          {
            "label": "7. O que fazer ao identificar um pneu desgastado durante o atendimento?",
            "options": [
              { "value": 1, "label": "a) Informar ao cliente e sugerir a troca ou reparo." },
              { "value": 2, "label": "b) Continuar o atendimento normalmente." },
              { "value": 3, "label": "c) Limpar o pneu e recomendar calibragem." }
            ],
            "response": "a) Informar ao cliente e sugerir a troca ou reparo.",
            "isSelect": true
          },
          {
            "label": "8. Como deve ser feita a limpeza de um para-brisa?",
            "options": [
              { "value": 1, "label": "a) Usando qualquer produto disponível no posto." },
              { "value": 2, "label": "b) Usando produtos adequados para vidros e evitando arranhões." },
              { "value": 3, "label": "c) Apenas com água e sabão." }
            ],
            "response": "b) Usando produtos adequados para vidros e evitando arranhões.",
            "isSelect": true
          },
          {
            "label": "9. Como lidar com um cliente insatisfeito com o atendimento?",
            "options": [
              { "value": 1, "label": "a) Ouvir o cliente e tentar resolver o problema com cordialidade." },
              { "value": 2, "label": "b) Ignorar a reclamação e continuar o atendimento." },
              { "value": 3, "label": "c) Discutir com o cliente para esclarecer os erros." }
            ],
            "response": "a) Ouvir o cliente e tentar resolver o problema com cordialidade.",
            "isSelect": true
          },
          {
            "label": "10. O que fazer em caso de incêndio no posto de combustível?",
            "options": [
              { "value": 1, "label": "a) Usar água para apagar o fogo imediatamente." },
              { "value": 2, "label": "b) Desligar as bombas, evacuar a área e usar o extintor correto." },
              { "value": 3, "label": "c) Continuar atendendo até o incêndio ser controlado." }
            ],
            "response": "b) Desligar as bombas, evacuar a área e usar o extintor correto.",
            "isSelect": true
          },
          {
            "label": "11. Qual a forma correta de evitar fraudes durante os pagamentos?",
            "options": [
              { "value": 1, "label": "a) Conferir o valor na máquina e verificar a autenticidade do dinheiro." },
              { "value": 2, "label": "b) Aceitar todos os pagamentos sem questionamentos." },
              { "value": 3, "label": "c) Exigir pagamento somente em dinheiro." }
            ],
            "response": "a) Conferir o valor na máquina e verificar a autenticidade do dinheiro.",
            "isSelect": true
          },
          {
            "label": "12. O que você deve fazer se um cliente pedir para trocar o filtro de ar do veículo?",
            "options": [
              { "value": 1, "label": "a) Realizar a troca imediatamente." },
              { "value": 2, "label": "b) Informar que essa tarefa deve ser feita por um mecânico especializado." },
              { "value": 3, "label": "c) Sugerir que ele troque o filtro sozinho." }
            ],
            "response": "b) Informar que essa tarefa deve ser feita por um mecânico especializado.",
            "isSelect": true
          },
          {
            "label": "13. Como garantir que o local de trabalho esteja sempre limpo?",
            "options": [
              { "value": 1, "label": "a) Realizar limpezas rápidas apenas no final do dia." },
              { "value": 2, "label": "b) Limpar regularmente durante o turno, inclusive as bombas e o chão." },
              { "value": 3, "label": "c) Deixar a limpeza para uma equipe terceirizada." }
            ],
            "response": "b) Limpar regularmente durante o turno, inclusive as bombas e o chão.",
            "isSelect": true
          },
          {
            "label": "14. O que fazer se perceber que um colega está ignorando normas de segurança?",
            "options": [
              { "value": 1, "label": "a) Ignorar a situação para evitar conflitos." },
              { "value": 2, "label": "b) Alertar o colega e, se necessário, comunicar ao supervisor." },
              { "value": 3, "label": "c) Esperar que o colega perceba o erro sozinho." }
            ],
            "response": "b) Alertar o colega e, se necessário, comunicar ao supervisor.",
            "isSelect": true
          },
          {
            "label": "15. Qual é a prioridade ao atender um cliente apressado?",
            "options": [
              { "value": 1, "label": "a) Atendê-lo com calma e eficiência sem comprometer a segurança." },
              { "value": 2, "label": "b) Atendê-lo rapidamente, mesmo ignorando procedimentos." },
              { "value": 3, "label": "c) Dar prioridade a outro cliente que chegou antes." }
            ],
            "response": "a) Atendê-lo com calma e eficiência sem comprometer a segurança.",
            "isSelect": true
          },
          {
            "label": "16. O que fazer se houver um derramamento de óleo na área do posto?",
            "options": [
              { "value": 1, "label": "a) Isolar a área e limpar imediatamente com material apropriado." },
              { "value": 2, "label": "b) Cobrir com areia e deixar para limpar depois." },
              { "value": 3, "label": "c) Continuar o atendimento como se nada tivesse acontecido." }
            ],
            "response": "a) Isolar a área e limpar imediatamente com material apropriado.",
            "isSelect": true
          },
          {
            "label": "17. Como explicar os benefícios do combustível aditivado?",
            "options": [
              { "value": 1, "label": "a) Dizer que é mais caro, mas funciona melhor." },
              { "value": 2, "label": "b) Explicar que ele ajuda a limpar e proteger o motor, aumentando a eficiência." },
              { "value": 3, "label": "c) Informar que ele é obrigatório para todos os carros." }
            ],
            "response": "b) Explicar que ele ajuda a limpar e proteger o motor, aumentando a eficiência.",
            "isSelect": true
          },
          {
            "label": "18. Qual atitude é mais importante para o atendimento ao cliente?",
            "options": [
              { "value": 1, "label": "a) Falar rapidamente para economizar tempo." },
              { "value": 2, "label": "b) Ser cordial, atencioso e ágil." },
              { "value": 3, "label": "c) Evitar conversa para manter o foco no trabalho." }
            ],
            "response": "b) Ser cordial, atencioso e ágil.",
            "isSelect": true
          },
          {
            "label": "19. Como agir se o cliente solicitar um serviço que você não sabe realizar?",
            "options": [
              { "value": 1, "label": "a) Informar que não pode realizar e buscar ajuda de um colega ou supervisor." },
              { "value": 2, "label": "b) Tentar fazer sozinho, mesmo sem conhecimento." },
              { "value": 3, "label": "c) Pedir que o cliente procure outro posto." }
            ],
            "response": "a) Informar que não pode realizar e buscar ajuda de um colega ou supervisor.",
            "isSelect": true
          },
          {
            "label": "20. Como lidar com a pressão em horários de pico?",
            "options": [
              { "value": 1, "label": "a) Focar na rapidez, mesmo que os procedimentos não sejam seguidos corretamente." },
              { "value": 2, "label": "b) Manter a calma, organizar as tarefas e atender com eficiência." },
              { "value": 3, "label": "c) Pedir para outros colegas fazerem o trabalho enquanto você descansa." }
            ],
            "response": "b) Manter a calma, organizar as tarefas e atender com eficiência.",
            "isSelect": true
          }
        ]
        setFieldsExam(fields)
      }

      if (selectedExam.label == "Avaliação matemática operador de caixa") {
        const fields = [
          { label: "1. Um cliente abasteceu R$ 78,50 e pagou com R$ 100,00. Qual será o troco?", response: "21,50", isSelect: false },
          { label: "2. Um produto custa R$ 60,00. Durante a promoção, o cliente recebe 10% de desconto. Qual será o valor final?", response: "54,00", isSelect: false },
          { label: "3. O cliente quer abastecer R$ 120,00 de gasolina, que custa R$ 6,00 por litro. Quantos litros ele conseguirá abastecer?", response: "20", isSelect: false },
          { label: "4. Um cliente comprou um óleo por R$ 50,00 e abasteceu R$ 100,00. Qual é o total a ser pago?", response: "150,00", isSelect: false },
          { label: "5. Um cliente pagou R$ 300,00 divididos igualmente em três cartões. Quanto foi cobrado em cada cartão?", response: "100,00", isSelect: false },
          { label: "6. O litro do diesel subiu de R$ 4,80 para R$ 5,28. Qual foi o percentual de aumento?", response: "10", isSelect: false },
          { label: "7. O caixa começou o turno com R$ 200,00. Durante o dia, foram feitas vendas no valor de R$ 3.000,00, e o troco dado foi de R$ 1.250,00. Qual é o saldo final?", response: "1950,00", isSelect: false },
          { label: "8. O troco correto era R$ 12,50, mas o operador devolveu R$ 10,50. Quanto falta devolver?", response: "2,00", isSelect: false },
          { label: "9. O operador de caixa recebe 1% de comissão sobre as vendas. Se o total de vendas foi de R$ 4.500,00, qual será a comissão?", response: "45,00", isSelect: false },
          { label: "10. Um cliente abasteceu 42 litros de gasolina ao preço de R$ 6,20 por litro. Qual foi o valor total?", response: "260,40", isSelect: false }
        ]
        setFieldsExam(fields)
      }

      if (selectedExam.label == "Avaliação teórica operador de caixa") {
        const fields = [
          {
            label: "1. O que deve ser feito quando faltar troco para o cliente?",
            options: [
              { value: 1, label: "a) Devolver menos dinheiro e informar o cliente." },
              { value: 2, label: "b) Pedir ao cliente que procure troco em outro lugar." },
              { value: 3, label: "c) Explicar a situação e buscar troco com rapidez." }
            ],
            response: "c) Explicar a situação e buscar troco com rapidez.",
            isSelect: true
          },
          {
            label: "2. Qual é a função principal de um caixa?",
            options: [
              { value: 1, label: "a) Repor mercadorias na loja de conveniência." },
              { value: 2, label: "b) Registrar vendas e controlar os pagamentos." },
              { value: 3, label: "c) Limpar as bombas de combustível." }
            ],
            response: "b) Registrar vendas e controlar os pagamentos.",
            isSelect: true
          },
          {
            label: "3. O que fazer se um cliente reclamar de um erro no troco?",
            options: [
              { value: 1, label: "a) Verificar o erro e corrigir imediatamente." },
              { value: 2, label: "b) Ignorar a reclamação e continuar atendendo." },
              { value: 3, label: "c) Dizer que o caixa está sempre certo." }
            ],
            response: "a) Verificar o erro e corrigir imediatamente.",
            isSelect: true
          },
          {
            label: "4. Qual procedimento adotar ao receber uma nota falsa?",
            options: [
              { value: 1, label: "a) Guardar a nota e finalizar a venda." },
              { value: 2, label: "b) Recusar a nota e informar a supervisão." },
              { value: 3, label: "c) Aceitar a nota e evitar conflitos com o cliente." }
            ],
            response: "b) Recusar a nota e informar a supervisão.",
            isSelect: true
          },
          {
            label: "5. Como agir em situações de furto no posto?",
            options: [
              { value: 1, label: "a) Confrontar diretamente o suspeito." },
              { value: 2, label: "b) Alertar a segurança ou a gerência do posto." },
              { value: 3, label: "c) Ignorar e continuar trabalhando." }
            ],
            response: "b) Alertar a segurança ou a gerência do posto.",
            isSelect: true
          },
          {
            label: "6. O que fazer ao identificar um erro no sistema do caixa?",
            options: [
              { value: 1, label: "a) Desligar o sistema e tentar consertar sozinho." },
              { value: 2, label: "b) Informar imediatamente o supervisor ou gerente." },
              { value: 3, label: "c) Continuar trabalhando sem reportar o erro." }
            ],
            response: "b) Informar imediatamente o supervisor ou gerente.",
            isSelect: true
          },
          {
            label: "7. Qual é o procedimento correto para registrar um pagamento com cartão?",
            options: [
              { value: 1, label: "a) Apenas digitar o valor e finalizar a venda." },
              { value: 2, label: "b) Solicitar ao cliente que insira o cartão e verifique os dados." },
              { value: 3, label: "c) Pedir que o cliente leia as instruções sozinho." }
            ],
            response: "b) Solicitar ao cliente que insira o cartão e verifique os dados.",
            isSelect: true
          },
          {
            label: "8. Por que é importante manter o local de trabalho organizado?",
            options: [
              { value: 1, label: "a) Para impressionar a gerência." },
              { value: 2, label: "b) Para evitar confusão e melhorar o atendimento." },
              { value: 3, label: "c) Porque é obrigatório por lei." }
            ],
            response: "b) Para evitar confusão e melhorar o atendimento.",
            isSelect: true
          },
          {
            label: "9. Como o caixa deve agir em caso de divergência no fechamento do caixa?",
            options: [
              { value: 1, label: "a) Relatar a divergência imediatamente." },
              { value: 2, label: "b) Guardar o dinheiro excedente para o dia seguinte." },
              { value: 3, label: "c) Ajustar os valores para que tudo pareça correto." }
            ],
            response: "a) Relatar a divergência imediatamente.",
            isSelect: true
          },
          {
            label: "10. O que significa 'prestar um atendimento cordial'?",
            options: [
              { value: 1, label: "a) Ser educado e atencioso com o cliente" },
              { value: 2, label: "b) Fazer apenas o mínimo necessário." },
              { value: 3, label: "c) Atender rápido, sem se preocupar com a experiência do cliente." }
            ],
            response: "a) Ser educado e atencioso com o cliente",
            isSelect: true
          },
          {
            label: "11. Qual é a primeira ação ao abrir o caixa no início do turno?",
            options: [
              { value: 1, label: "a) Conferir o fundo de troco inicial." },
              { value: 2, label: "b) Começar a atender imediatamente." },
              { value: 3, label: "c) Verificar as bombas de combustível." }
            ],
            response: "a) Conferir o fundo de troco inicial.",
            isSelect: true
          },
          {
            label: "12. O que deve ser feito em caso de dúvida sobre um preço?",
            options: [
              { value: 1, label: "a) Informar um preço aproximado ao cliente." },
              { value: 2, label: "b) Verificar o preço no sistema ou com um colega." },
              { value: 3, label: "c) Pedir ao cliente que descubra sozinho." }
            ],
            response: "b) Verificar o preço no sistema ou com um colega.",
            isSelect: true
          },
          {
            label: "13. Por que é importante conhecer os métodos de pagamento aceitos?",
            options: [
              { value: 1, label: "a) Para evitar problemas durante o atendimento." },
              { value: 2, label: "b) Para convencer o cliente a pagar em dinheiro." },
              { value: 3, label: "c) Para controlar o estoque do posto." }
            ],
            response: "a) Para evitar problemas durante o atendimento.",
            isSelect: true
          },
          {
            label: "14. O que fazer se um cliente pedir ajuda para usar a bomba de combustível?",
            options: [
              { value: 1, label: "a) Explicar pacientemente e oferecer ajuda." },
              { value: 2, label: "b) Dizer que o cliente deve se virar sozinho." },
              { value: 3, label: "c) Informar que essa não é sua função." }
            ],
            response: "a) Explicar pacientemente e oferecer ajuda.",
            isSelect: true
          },
          {
            label: "15. Como lidar com um cliente insatisfeito?",
            options: [
              { value: 1, label: "a) Ignorar a insatisfação e continuar atendendo." },
              { value: 2, label: "b) Ouvir, buscar entender o problema e oferecer uma solução." },
              { value: 3, label: "c) Pedir que ele volte em outro horário." }
            ],
            response: "b) Ouvir, buscar entender o problema e oferecer uma solução.",
            isSelect: true
          },
          {
            label: "16. O que é essencial ao contar cédulas no caixa?",
            options: [
              { value: 1, label: "a) Fazer rapidamente, sem verificar os valores." },
              { value: 2, label: "b) Contar com calma e atenção para evitar erros." },
              { value: 3, label: "c) Delegar a contagem a outro colega." }
            ],
            response: "b) Contar com calma e atenção para evitar erros.",
            isSelect: true
          },
          {
            label: "17. Como proceder em caso de pane elétrica no posto?",
            options: [
              { value: 1, label: "a) Tentar resolver sozinho." },
              { value: 2, label: "b) Interromper o atendimento e informar o gerente." },
              { value: 3, label: "c) Continuar atendendo normalmente." }
            ],
            response: "b) Interromper o atendimento e informar o gerente.",
            isSelect: true
          },
          {
            label: "18. Qual é a atitude esperada em relação ao uso do celular no trabalho?",
            options: [
              { value: 1, label: "a) Usar livremente durante o expediente." },
              { value: 2, label: "b) Evitar o uso durante o atendimento." },
              { value: 3, label: "c) Somente usar para resolver questões pessoais urgentes." }
            ],
            response: "b) Evitar o uso durante o atendimento.",
            isSelect: true
          },
          {
            label: "19. Como proceder ao receber um pagamento em cheque?",
            options: [
              { value: 1, label: "a) Aceitar qualquer cheque sem verificar." },
              { value: 2, label: "b) Conferir os dados e validar a autenticidade." },
              { value: 3, label: "c) Recusar todos os cheques por padrão." }
            ],
            response: "b) Conferir os dados e validar a autenticidade.",
            isSelect: true
          },
          {
            label: "20. O que é mais importante ao lidar com grandes valores no caixa?",
            options: [
              { value: 1, label: "a) Ser discreto e seguir os procedimentos de segurança." },
              { value: 2, label: "b) Exibir o dinheiro para que outros vejam." },
              { value: 3, label: "c) Guardar os valores de forma desorganizada." }
            ],
            response: "a) Ser discreto e seguir os procedimentos de segurança.",
            isSelect: true
          }
        ]
        setFieldsExam(fields)
      }

      if (selectedExam == "Avaliação teórica frentista caixa") {
        const fields = [
          {
            label: "1. O que deve ser feito quando faltar troco para o cliente?",
            options: [
              { value: 1, label: "a) Devolver menos dinheiro e informar o cliente." },
              { value: 2, label: "b) Pedir ao cliente que procure troco em outro lugar." },
              { value: 3, label: "c) Explicar a situação e buscar troco com rapidez." }
            ],
            response: "c) Explicar a situação e buscar troco com rapidez.",
            isSelect: true
          },
          {
            label: "2. Qual é a função principal de um caixa?",
            options: [
              { value: 1, label: "a) Repor mercadorias na loja de conveniência." },
              { value: 2, label: "b) Registrar vendas e controlar os pagamentos." },
              { value: 3, label: "c) Limpar as bombas de combustível." }
            ],
            response: "b) Registrar vendas e controlar os pagamentos.",
            isSelect: true
          },
          {
            label: "3. O que fazer se um cliente reclamar de um erro no troco?",
            options: [
              { value: 1, label: "a) Verificar o erro e corrigir imediatamente." },
              { value: 2, label: "b) Ignorar a reclamação e continuar atendendo." },
              { value: 3, label: "c) Dizer que o caixa está sempre certo." }
            ],
            response: "a) Verificar o erro e corrigir imediatamente.",
            isSelect: true
          },
          {
            label: "4. Qual procedimento adotar ao receber uma nota falsa?",
            options: [
              { value: 1, label: "a) Guardar a nota e finalizar a venda." },
              { value: 2, label: "b) Recusar a nota e informar a supervisão." },
              { value: 3, label: "c) Aceitar a nota e evitar conflitos com o cliente." }
            ],
            response: "b) Recusar a nota e informar a supervisão.",
            isSelect: true
          },
          {
            label: "5. Como agir em situações de furto no posto?",
            options: [
              { value: 1, label: "a) Confrontar diretamente o suspeito." },
              { value: 2, label: "b) Alertar a segurança ou a gerência do posto." },
              { value: 3, label: "c) Ignorar e continuar trabalhando." }
            ],
            response: "b) Alertar a segurança ou a gerência do posto.",
            isSelect: true
          },
          {
            label: "6. O que fazer ao identificar um erro no sistema do caixa?",
            options: [
              { value: 1, label: "a) Desligar o sistema e tentar consertar sozinho." },
              { value: 2, label: "b) Informar imediatamente o supervisor ou gerente." },
              { value: 3, label: "c) Continuar trabalhando sem reportar o erro." }
            ],
            response: "b) Informar imediatamente o supervisor ou gerente.",
            isSelect: true
          },
          {
            label: "7. Qual é o procedimento correto para registrar um pagamento com cartão?",
            options: [
              { value: 1, label: "a) Apenas digitar o valor e finalizar a venda." },
              { value: 2, label: "b) Solicitar ao cliente que insira o cartão e verifique os dados." },
              { value: 3, label: "c) Pedir que o cliente leia as instruções sozinho." }
            ],
            response: "b) Solicitar ao cliente que insira o cartão e verifique os dados.",
            isSelect: true
          },
          {
            label: "8. Por que é importante manter o local de trabalho organizado?",
            options: [
              { value: 1, label: "a) Para impressionar a gerência." },
              { value: 2, label: "b) Para evitar confusão e melhorar o atendimento." },
              { value: 3, label: "c) Porque é obrigatório por lei." }
            ],
            response: "b) Para evitar confusão e melhorar o atendimento.",
            isSelect: true
          },
          {
            label: "9. Como o caixa deve agir em caso de divergência no fechamento do caixa?",
            options: [
              { value: 1, label: "a) Relatar a divergência imediatamente." },
              { value: 2, label: "b) Guardar o dinheiro excedente para o dia seguinte." },
              { value: 3, label: "c) Ajustar os valores para que tudo pareça correto." }
            ],
            response: "a) Relatar a divergência imediatamente.",
            isSelect: true
          },
          {
            label: "10. O que significa 'prestar um atendimento cordial'?",
            options: [
              { value: 1, label: "a) Ser educado e atencioso com o cliente" },
              { value: 2, label: "b) Fazer apenas o mínimo necessário." },
              { value: 3, label: "c) Atender rápido, sem se preocupar com a experiência do cliente." }
            ],
            response: "a) Ser educado e atencioso com o cliente",
            isSelect: true
          },
          {
            label: "11. Qual é a primeira ação ao abrir o caixa no início do turno?",
            options: [
              { value: 1, label: "a) Conferir o fundo de troco inicial." },
              { value: 2, label: "b) Começar a atender imediatamente." },
              { value: 3, label: "c) Verificar as bombas de combustível." }
            ],
            response: "a) Conferir o fundo de troco inicial.",
            isSelect: true
          },
          {
            label: "12. O que deve ser feito em caso de dúvida sobre um preço?",
            options: [
              { value: 1, label: "a) Informar um preço aproximado ao cliente." },
              { value: 2, label: "b) Verificar o preço no sistema ou com um colega." },
              { value: 3, label: "c) Pedir ao cliente que descubra sozinho." }
            ],
            response: "b) Verificar o preço no sistema ou com um colega.",
            isSelect: true
          },
          {
            label: "13. Por que é importante conhecer os métodos de pagamento aceitos?",
            options: [
              { value: 1, label: "a) Para evitar problemas durante o atendimento." },
              { value: 2, label: "b) Para convencer o cliente a pagar em dinheiro." },
              { value: 3, label: "c) Para controlar o estoque do posto." }
            ],
            response: "a) Para evitar problemas durante o atendimento.",
            isSelect: true
          },
          {
            label: "14. O que fazer se um cliente pedir ajuda para usar a bomba de combustível?",
            options: [
              { value: 1, label: "a) Explicar pacientemente e oferecer ajuda." },
              { value: 2, label: "b) Dizer que o cliente deve se virar sozinho." },
              { value: 3, label: "c) Informar que essa não é sua função." }
            ],
            response: "a) Explicar pacientemente e oferecer ajuda.",
            isSelect: true
          },
          {
            label: "15. Como lidar com um cliente insatisfeito?",
            options: [
              { value: 1, label: "a) Ignorar a insatisfação e continuar atendendo." },
              { value: 2, label: "b) Ouvir, buscar entender o problema e oferecer uma solução." },
              { value: 3, label: "c) Pedir que ele volte em outro horário." }
            ],
            response: "b) Ouvir, buscar entender o problema e oferecer uma solução.",
            isSelect: true
          },
          {
            label: "16. O que é essencial ao contar cédulas no caixa?",
            options: [
              { value: 1, label: "a) Fazer rapidamente, sem verificar os valores." },
              { value: 2, label: "b) Contar com calma e atenção para evitar erros." },
              { value: 3, label: "c) Delegar a contagem a outro colega." }
            ],
            response: "b) Contar com calma e atenção para evitar erros.",
            isSelect: true
          },
          {
            label: "17. Como proceder em caso de pane elétrica no posto?",
            options: [
              { value: 1, label: "a) Tentar resolver sozinho." },
              { value: 2, label: "b) Interromper o atendimento e informar o gerente." },
              { value: 3, label: "c) Continuar atendendo normalmente." }
            ],
            response: "b) Interromper o atendimento e informar o gerente.",
            isSelect: true
          },
          {
            label: "18. Qual é a atitude esperada em relação ao uso do celular no trabalho?",
            options: [
              { value: 1, label: "a) Usar livremente durante o expediente." },
              { value: 2, label: "b) Evitar o uso durante o atendimento." },
              { value: 3, label: "c) Somente usar para resolver questões pessoais urgentes." }
            ],
            response: "b) Evitar o uso durante o atendimento.",
            isSelect: true
          },
          {
            label: "19. Como proceder ao receber um pagamento em cheque?",
            options: [
              { value: 1, label: "a) Aceitar qualquer cheque sem verificar." },
              { value: 2, label: "b) Conferir os dados e validar a autenticidade." },
              { value: 3, label: "c) Recusar todos os cheques por padrão." }
            ],
            response: "b) Conferir os dados e validar a autenticidade.",
            isSelect: true
          },
          {
            label: "20. O que é mais importante ao lidar com grandes valores no caixa?",
            options: [
              { value: 1, label: "a) Ser discreto e seguir os procedimentos de segurança." },
              { value: 2, label: "b) Exibir o dinheiro para que outros vejam." },
              { value: 3, label: "c) Guardar os valores de forma desorganizada." }
            ],
            response: "a) Ser discreto e seguir os procedimentos de segurança.",
            isSelect: true
          }
        ]
        setFieldsExam(fields)
      }

      if (selectedExam == "Avaliação matemática frentista caixa") {
        const fields = [
          { label: "1. Um cliente abasteceu R$ 78,50 e pagou com R$ 100,00. Qual será o troco?", response: "21,50", isSelect: false },
          { label: "2. Um produto custa R$ 60,00. Durante a promoção, o cliente recebe 10% de desconto. Qual será o valor final?", response: "54,00", isSelect: false },
          { label: "3. O cliente quer abastecer R$ 120,00 de gasolina, que custa R$ 6,00 por litro. Quantos litros ele conseguirá abastecer?", response: "20", isSelect: false },
          { label: "4. Um cliente comprou um óleo por R$ 50,00 e abasteceu R$ 100,00. Qual é o total a ser pago?", response: "150,00", isSelect: false },
          { label: "5. Um cliente pagou R$ 300,00 divididos igualmente em três cartões. Quanto foi cobrado em cada cartão?", response: "100,00", isSelect: false },
          { label: "6. O litro do diesel subiu de R$ 4,80 para R$ 5,28. Qual foi o percentual de aumento?", response: "10", isSelect: false },
          { label: "7. O caixa começou o turno com R$ 200,00. Durante o dia, foram feitas vendas no valor de R$ 3.000,00, e o troco dado foi de R$ 1.250,00. Qual é o saldo final?", response: "1950,00", isSelect: false },
          { label: "8. O troco correto era R$ 12,50, mas o operador devolveu R$ 10,50. Quanto falta devolver?", response: "2,00", isSelect: false },
          { label: "9. O operador de caixa recebe 1% de comissão sobre as vendas. Se o total de vendas foi de R$ 4.500,00, qual será a comissão?", response: "45,00", isSelect: false },
          { label: "10. Um cliente abasteceu 42 litros de gasolina ao preço de R$ 6,20 por litro. Qual foi o valor total?", response: "260,40", isSelect: false }
        ]
        setFieldsExam(fields)
      }

      if (selectedExam == "Avaliação matemática trocador de óleo") {
        const fields = [
          { label: "1. Quanto é 12 + 15?", response: "27", isSelect: false },
          { label: "2. Quanto é 50 - 23?", response: "27", isSelect: false },
          { label: "3. Quanto é 7 x 8?", response: "56", isSelect: false },
          { label: "4. Quanto é 56 / 7?", response: "8", isSelect: false },
          { label: "5. Um cliente paga R$50 por uma compra de R$32. Quanto é o troco?", response: "18", isSelect: false },
          { label: "6. Um produto custa R$80 e está com 10% de desconto. Qual é o preço com desconto?", response: "72", isSelect: false },
          { label: "7. Um cliente compra 3 itens de R$15 cada. Qual é o total?", response: "45", isSelect: false },
          { label: "8. Um pacote com 6 latas custa R$18. Qual é o preço de cada lata?", response: "3", isSelect: false },
        ]
        setFieldsExam(fields)
      }

      if (selectedExam == "Avaliação teórica trocador de óleo") {
        const fields = [
          {
            label: "1. Qual é a função do óleo no motor?",
            options: [
              { value: 1, label: "a) Lubrificar as partes móveis do motor e reduzir o atrito." },
              { value: 2, label: "b) Lubrificar as partes fixas do motor e reduzir o ruído." },
              { value: 3, label: "c) Lubrificar as partes variáveis do motor e reduzir o ruído da cabine." }
            ],
            response: "a) Lubrificar as partes móveis do motor e reduzir o atrito.",
            isSelect: true
          },
          {
            label: "2. Com que frequência deve-se trocar o óleo do motor?",
            options: [
              { value: 1, label: "a) Geralmente a cada 8.000 a 12.000 km, dependendo do tipo de óleo e do veículo." },
              { value: 2, label: "b) Geralmente quando o motor faz barulho ou o óleo está poluído." },
              { value: 3, label: "c) Geralmente a cada 5.000 a 10.000 km, dependendo do tipo de óleo e do veículo ou 6 meses." }
            ],
            response: "c) Geralmente a cada 5.000 a 10.000 km, dependendo do tipo de óleo e do veículo ou 6 meses.",
            isSelect: true
          },
          {
            label: "3. O que deve ser verificado antes de trocar o óleo?",
            options: [
              { value: 1, label: "a) Se o veículo é Flex ou GNV." },
              { value: 2, label: "b) Nível do óleo, tipo de óleo recomendado pelo fabricante e o filtro de óleo." },
              { value: 3, label: "c) KM rodado e mais de 1 ano de uso." }
            ],
            response: "b) Nível do óleo, tipo de óleo recomendado pelo fabricante e o filtro de óleo.",
            isSelect: true
          },
          {
            label: "4. Por que é importante trocar o filtro de óleo junto com o óleo?",
            options: [
              { value: 1, label: "a) Para o óleo ter maior tempo de duração." },
              { value: 2, label: "b) Para garantir que o motor não vai fazer barulho." },
              { value: 3, label: "c) Para garantir que as impurezas não contaminem o novo óleo." }
            ],
            response: "c) Para garantir que as impurezas não contaminem o novo óleo.",
            isSelect: true
          },
          {
            label: "5. Quais são os tipos de óleo mais comuns?",
            options: [
              { value: 1, label: "a) Mineral." },
              { value: 2, label: "b) Mineral, semissintético e sintético." },
              { value: 3, label: "c) Semissintético e sintético." }
            ],
            response: "b) Mineral, semissintético e sintético.",
            isSelect: true
          },
          {
            label: "6. Como saber qual tipo de óleo é recomendado para usar no motor do veículo?",
            options: [
              { value: 1, label: "a) Consultar o manual do veículo ou as recomendações do fabricante." },
              { value: 2, label: "b) Perguntar para o proprietário do veículo." },
              { value: 3, label: "c) Misturar óleo Mineral, semissintético e sintético." }
            ],
            response: "a) Consultar o manual do veículo ou as recomendações do fabricante.",
            isSelect: true
          },
          {
            label: "7. O que pode acontecer se o óleo do motor não for trocado regularmente?",
            options: [
              { value: 1, label: "a) Pode causar desgaste prematuro do motor e falhas mecânicas." },
              { value: 2, label: "b) Pode aumentar o ruído na cabine." },
              { value: 3, label: "c) Nada, é somente para ter óleo novo no motor." }
            ],
            response: "a) Pode causar desgaste prematuro do motor e falhas mecânicas.",
            isSelect: true
          },
          {
            label: "8. Qual é a função do filtro de óleo do motor?",
            options: [
              { value: 1, label: "a) Não deixar misturar combustível com óleo." },
              { value: 2, label: "b) Reduzir o ruído do motor." },
              { value: 3, label: "c) Reter impurezas e partículas que podem danificar o motor." }
            ],
            response: "c) Reter impurezas e partículas que podem danificar o motor.",
            isSelect: true
          },
          {
            label: "9. O que é a classificação API?",
            options: [
              { value: 1, label: "a) Informar de quem é o fabricante do óleo." },
              { value: 2, label: "b) Sistema de classificação que indica a qualidade e o desempenho do óleo." },
              { value: 3, label: "c) Sigla que informa a validade do óleo." }
            ],
            response: "b) Sistema de classificação que indica a qualidade e o desempenho do óleo.",
            isSelect: true
          },
          {
            label: "10. O que é um aditivo de óleo?",
            options: [
              { value: 1, label: "a) Substância adicionada ao óleo para melhorar suas propriedades." },
              { value: 2, label: "b) Substância adicionada ao radiador para melhorar as propriedades de óleo." },
              { value: 3, label: "c) Substância adicionada ao óleo para refrigerar o motor." }
            ],
            response: "a) Substância adicionada ao óleo para melhorar suas propriedades.",
            isSelect: true
          },
          {
            label: "11. Qual é a diferença entre óleo sintético e mineral?",
            options: [
              { value: 1, label: "a) Não tem diferença, é questão de escolha do cliente." },
              { value: 2, label: "b) O óleo mineral é quimicamente modificado para melhor desempenho, enquanto o sintético é refinado do petróleo bruto." },
              { value: 3, label: "c) O óleo sintético é quimicamente modificado para melhor desempenho, enquanto o mineral é refinado do petróleo bruto." }
            ],
            response: "c) O óleo sintético é quimicamente modificado para melhor desempenho, enquanto o mineral é refinado do petróleo bruto.",
            isSelect: true
          },
          {
            label: "12. Por que é importante não sobrecarregar o motor com óleo?",
            options: [
              { value: 1, label: "a) Porque pode causar aumento da pressão e vazamentos." },
              { value: 2, label: "b) Porque o motor não funciona corretamente." },
              { value: 3, label: "c) Nenhuma das alternativas." }
            ],
            response: "a) Porque pode causar aumento da pressão e vazamentos.",
            isSelect: true
          }
        ]
        setFieldsExam(fields)
      }
    }
  }, [selectedExam])

  useEffect(() => {
    if (applicantsExamsModalOpen)
      api
        .get(`/applicants/${selectedApplicant?.id}/exams`)
        .then((response) => setApplicantExamsList(response.data))
  }, [applicantsExamsModalOpen])

  const handleClose = () => {
    setApplicantExamsList()

    setSelectiveProcessModalOpen(false)

    setApplicantsExamsModalOpen(false)
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

    let correctAnswers = uniqueFields.filter((field) => field.isCorrect === true)

    let media = fieldsExam.length / 2 + 1

    let requestBody = {
      applicant_id: selectedApplicant?.id,
      exam_label: selectedExam?.label,
      status: correctAnswers.length >= media ? "aprovado" : "reprovado",
      responses: JSON.stringify(
        uniqueFields.map(field => ({
          question: field.question,
          response: field.response,
          isCorrect: field.isCorrect,
        }))
      )
    }

    api
      .post(`/applicants/${selectedApplicant?.id}/exams`, requestBody)
      .then(() => {
        setFieldsExam()

        api
          .get(`/applicants/${selectedApplicant?.id}/exams`)
          .then((response) => setApplicantExamsList(response.data))
      })
  }

  return (
    <Modal
      show={applicantsExamsModalOpen}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Avaliações de candidato</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
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
        </div>

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

        <div className="mb-3">
          <button className="btn btn-success w-100" onClick={handleSubmit}>Salvar avaliação</button>
        </div>

        {
          applicantExamsList && applicantExamsList.map((exam, index) => {
            const responses = JSON.parse(exam.responses)
            const correctAnswers = Array.isArray(responses)
              ? responses.filter((r) => r.isCorrect).length
              : 0
            const totalQuestions = Array.isArray(responses) ? responses.length : 0

            return (
              <div key={index} className="mb-3">
                <div
                  className={
                    exam.status == "reprovado" &&
                    "alert alert-danger fw-bold text-center" ||
                    exam.status == "aprovado" &&
                    "alert alert-success fw-bold text-center"
                  }
                  role="alert"
                >
                  <div>{exam.exam_label}</div>

                  <div>Situação: {exam.status}</div>

                  <div>{`Pontuação: ${correctAnswers}/${totalQuestions}`}</div>
                </div>

                {
                  Array.isArray(responses) &&
                  responses.map((field, fieldIndex) => (
                    <div className="mb-2" key={fieldIndex}>
                      <label className="form-label fw-bold">
                        {field.question}
                      </label>

                      <input
                        className={`form-control ${field.isCorrect ? 'is-valid' : 'is-invalid'}`}
                        disabled={true}
                        value={field.response}
                      />
                    </div>
                  ))
                }
              </div>
            )
          })
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>Entendido</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SeeApplicantsExamsModal
