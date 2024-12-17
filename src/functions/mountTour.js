import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const mountTour = (route) => {
  let driverObj;

  switch (route) {
    case '/scale':
      driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: '#subsidiarie',
            popover: {
              title: 'Filial',
              description: 'Essa tag mostra a filial que você está visualizando'
            }
          },
          {
            element: '#help',
            popover: {
              title: 'Ajuda',
              description: 'Caso fique em dúvida sobre algo nessa página, esse botão irá fornecer mais informações'
            }
          },
          {
            element: '#scale-container',
            popover: {
              title: 'Planejamento de escala',
              description: 'Calendário para planejamento de escala'
            }
          },
          // {
          //   element: '#scale-table',
          //   popover: {
          //     title: 'Histórico de escala',
          //     description: 'Essa tabela mostra o histórico de escala'
          //   }
          // },
          {
            element: '#scale-track',
            popover: {
              title: 'Funcionários na pista neste turno',
              description: 'Essa tabela mostra os funcionários que estão na pista neste turno'
            }
          }
        ],
        nextBtnText: 'Próximo Passo',
        prevBtnText: 'Passo Anterior',
        closeBtnText: 'Fechar Tour',
        doneBtnText: 'Finalizar Tour'
      })
      break

    case '/turns':
      driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: '#subsidiarie',
            popover: {
              title: 'Filial',
              description: 'Essa tag mostra a filial que você está visualizando'
            }
          },
          {
            element: '#help',
            popover: {
              title: 'Ajuda',
              description: 'Caso fique em dúvida sobre algo nessa página, esse botão irá fornecer mais informações'
            }
          },
          {
            element: '#addTurn',
            popover: {
              title: 'Adicionar turno',
              description: 'Clique nesse botão para adicionar um novo turno'
            }
          },
          {
            element: '#turnsTable',
            popover: {
              title: 'Tabela de turnos',
              description: 'Essa tabela mostra todos os turnos cadastrados'
            }
          },
          {
            element: '#editTurn',
            popover: {
              title: 'Editar turno',
              description: 'Clique nesse botão para editar um turno'
            }
          },
          {
            element: '#deleteTurn',
            popover: {
              title: 'Excluir turno',
              description: 'Clique nesse botão para excluir um turno'
            }
          }
        ],
        nextBtnText: 'Próximo Passo',
        prevBtnText: 'Passo Anterior',
        closeBtnText: 'Fechar Tour',
        doneBtnText: 'Finalizar Tour'
      })
      break

    default:
      break
  }

  return driverObj
}

export default mountTour
