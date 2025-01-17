import moment from "moment"

const iterateScaleTemplate = (iterateNumber) => {
  let monthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  let monthLastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)

  let daysOffTemplate = []

  let count = 0

  for (let i = new Date(monthFirstDay); i <= monthLastDay; i.setDate(i.getDate() + 1)) {
    count += 1

    if (count === iterateNumber) {
      daysOffTemplate.push(moment(i).format("DD-MM-YYYY"))

      count = 0
    }
  }

  return daysOffTemplate
}

export default iterateScaleTemplate
