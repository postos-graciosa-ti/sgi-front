import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const refactorTomorrow = driver({
  showProgress: true,
  steps: [
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
        description: 'Ao selecionar uma data, você poderá visualizar os colabores de folga nesse dia'
      }
    },
    {
      element: '#workers',
      popover: {
        title: 'Colaboradores',
        description: 'Aqui você pode visualizar a data e os colaboradores de folga nessa data'
      }
    },
  ]
})

export default refactorTomorrow