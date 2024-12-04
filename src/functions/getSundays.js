import moment from "moment"

const getSundays = (date) => {
  let sundays = []

  let firstDayOfMonth = moment(date).startOf('month')

  let lastDayOfMonth = moment(date).endOf('month')

  for (let i = firstDayOfMonth; i.isBefore(lastDayOfMonth); i.add(1, 'day')) {
    if (i.day() === 0) {
      sundays.push(i.format('YYYY-MM-DD'))
    }
  }

  return sundays
}

export default getSundays