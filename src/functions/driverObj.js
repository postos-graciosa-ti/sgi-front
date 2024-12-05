import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: '#seeScale',
      popover: {
        title: 'Ver Escala',
        description: 'Ao clicar, redireciona para uma tela para ver escalas de funcionários dessa unidade'
      }
    },
    {
      element: '#help',
      popover: {
        title: 'Ajuda',
        description: 'Se você tem dúvidas do que fazer nessa página, esse botão irá te passar informações'
      }
    },
    {
      element: '#calendar',
      popover: {
        title: 'Calendário',
        description: 'Ao selecionar uma data, você estara planejando uma folga para esse dia'
      }
    },
    {
      element: '#workers',
      popover: {
        title: 'Colaboradores',
        description: 'Selecione os colabores que você quer planejar para a folga e clique em cadastrar'
      }
    },
  ]
})

export default driverObj