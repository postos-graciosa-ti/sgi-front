import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const mountTour = (route) => {
  let driverObj

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
            element: '#print',
            popover: {
              title: 'Imprimir escala',
              description: 'Clique nesse botão para imprimir a escala'
              }
            },
          {
            element: '#scale-container',
            popover: {
              title: 'Informações da escala',
              description: 'Informações da escala'
            }
          },
          {
            element: '#scale-calendar',
            popover: {
              title: 'Calendário',
              description: 'Calendário para planejamento de escala'
            }
          },
          {
            element: '#scale-table',
            popover: {
              title: 'Tabela de escala',
              description: 'Contém as informações da escala'
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

    case '/users':
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
            element: '#addUser',
            popover: {
              title: 'Adicionar usuário',
              description: 'Clique nesse botão para adicionar um novo usuário'
            }
          },
          {
            element: '#users-table',
            popover: {
              title: 'Tabela de usuários',
              description: 'Essa tabela mostra todos os usuários cadastrados'
            }
          },
          {
            element: '#editUser',
            popover: {
              title: 'Editar usuário',
              description: 'Clique nesse botão para editar um usuário'
            }
          },
          {
            element: '#deleteUser',
            popover: {
              title: 'Excluir usuário',
              description: 'Clique nesse botão para excluir um usuário'
            }
          }
        ],
        nextBtnText: 'Próximo Passo',
        prevBtnText: 'Passo Anterior',
        closeBtnText: 'Fechar Tour',
        doneBtnText: 'Finalizar Tour'
      })
      break

    case '/functions':
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
            element: '#addFunction',
            popover: {
              title: 'Adicionar função',
              description: 'Clique nesse botão para adicionar uma nova função'
            }
          },
          {
            element: '#functionsTableBody',
            popover: {
              title: 'Tabela de funções',
              description: 'Essa tabela mostra todas as funções cadastradas'
            }
          },
          {
            element: '#editFunction',
            popover: {
              title: 'Editar função',
              description: 'Clique nesse botão para editar uma função'
            }
          },
          {
            element: '#deleteFunction',
            popover: {
              title: 'Excluir função',
              description: 'Clique nesse botão para excluir uma função'
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
