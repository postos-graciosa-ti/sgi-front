import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const mountDriver = (steps) => {
  const driverObj = driver({
    showProgress: true,
    steps: steps,
    prevBtnText: "Anterior",
    nextBtnText: "Próximo",
    doneBtnText: "Concluído"
  })

  return driverObj
}

export default mountDriver