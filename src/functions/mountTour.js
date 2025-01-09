import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const mountTour = (route) => {
  let driverObj

  switch (route) {
    case '/workers':
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
            element: '#add-worker',
            popover: {
              title: 'Adicionar colaborador',
              description: 'Clique nesse botão para adicionar um novo colaborador'
            }
          },
          {
            element: '#table-container',
            popover: {
              title: 'Tabela de colaboradores',
              description: 'Essa tabela mostra todos os colaboradores cadastrados'
            }
          },
          {
            element: '#edit-worker',
            popover: {
              title: 'Editar colaborador',
              description: 'Clique nesse botão para editar um colaborador'
            }
          },
          {
            element: '#delete-worker',
            popover: {
              title: 'Excluir colaborador',
              description: 'Clique nesse botão para excluir um colaborador'
            }
          }
        ],
        nextBtnText: 'Próximo Passo',
        prevBtnText: 'Passo Anterior',
        closeBtnText: 'Fechar Tour',
        doneBtnText: 'Finalizar Tour'
      })
      break

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
            element: '#changeSubsidiarie',
            popover: {
              title: 'Alterar filial',
              description: 'Te redireciona para a tela de alteração de visualização de filial'
            }
          },
          {
            element: '#changePassword',
            popover: {
              title: 'Alterar senha',
              description: 'Te redireciona para a tela de alteração de senha de usuário'
            }
          },
          {
            element: '#workers-select',
            popover: {
              title: 'Selecione um colaborador',
              description: 'Selecione um colaborador para montar a escala'
            }
          },
          {
            element: '#scale-calendar',
            popover: {
              title: 'Calendário',
              description: 'Calendário para montar a escala'
            }
          },
          {
            element: '#print-days',
            popover: {
              title: 'Imprimir',
              description: 'Imprimir escala para assinatura de funcionários'
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
            element: '#save-scale',
            popover: {
              title: 'Salvar escala',
              description: 'Clique nesse botão para salvar a escala'
            }
          },
          {
            element: '#scale-table',
            popover: {
              title: 'Tabela de escala',
              description: 'Tabela de escala'
            }
          },
          {
            element: '#delete-scale',
            popover: {
              title: 'Excluir escala',
              description: 'Clique nesse botão para excluir a escala'
            }
          },
          {
            element: '#alert-scale',
            popover: {
              title: 'Alerta de usuário com mais de 8 dias consecutivos',
              description: 'Esse botão aparece quando o usuário tem mais de 8 dias consecutivos sem folga'
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

    case '/subsidiaries':
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
            element: '#add-subsidiarie',
            popover: {
              title: 'Adicionar filial',
              description: 'Clique nesse botão para adicionar uma nova filial'
            }
          },
          {
            element: '#table-container',
            popover: {
              title: 'Tabela de filiais',
              description: 'Essa tabela mostra todas as filiais cadastradas'
            }
          },
          {
            element: '#edit-subsidiarie',
            popover: {
              title: 'Editar filial',
              description: 'Clique nesse botão para editar uma filial'
            }
          },
          {
            element: '#delete-subsidiarie',
            popover: {
              title: 'Excluir filial',
              description: 'Clique nesse botão para excluir uma filial'
            }
          }
        ]
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
