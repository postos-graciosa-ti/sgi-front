import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: '#help',
      popover: {
        title: 'Ajuda',
        description: 'Caso fique em dúvida sobre algo nessa página, esse botão irá fornecer mais informações'
      }
    },
    {
      element: '#printer',
      popover: {
        title: 'Impressão',
        description: 'Clicando nesse ícone, você abre um atalho para impressão'
      }
    },
    {
      element: '#scaleHistory',
      popover: {
        title: 'Histórico de escala',
        description: 'Ao clicar nesse ícone, você é redirecionado para uma tela em que você pode observar todo o histórico de escalas anteriores'
      }
    },
    {
      element: '#weekScale',
      popover: {
        title: 'Escala',
        description: 'Mostra data, os colaboradores da filial, se estão de folga ou trabalhando no dia. Você pode mudar o status do colaborador se quiser que ele folgue nesse dia, ou vice versa'
      }
    },
    {
      element: '#save',
      popover: {
        title: 'Salvar',
        description: 'Depois de fazer suas alterações na escala semanal, você pode salvar suas alterações'
      }
    },
  ]
})

export default driverObj