import mountDriver from "./mountDriver"

const initTour = (steps) => {
  const driverObj = mountDriver(steps)

  driverObj.drive()
}

export default initTour