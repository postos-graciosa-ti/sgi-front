import moment from "moment"

const getWeek = (date) => {
  let daysOfWeek = []

  for (let i = 0; i < 7; i++) {
    let day = moment(date).startOf('week').add(i, 'days')
    
    if (day.day() !== 0 && day.day() !== 6) {
      daysOfWeek.push(day.format('YYYY-MM-DD'))
    }
  }

  return daysOfWeek
}

export default getWeek