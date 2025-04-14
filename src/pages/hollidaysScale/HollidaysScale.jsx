import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import axios from "axios"

const HollidaysScale = () => {
  const currentYear = new Date().getFullYear()

  const [hollidaysList, setHollidaysList] = useState()

  useEffect(() => {
    axios
      .get(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`)
      .then((response) => {
        setHollidaysList(response?.data)
      })
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Escala de folgas</h4>

        {
          hollidaysList?.map((holliday) => (
            <div className="card mb-2 p-2">
              <span><b>{holliday.date}</b>: {holliday.name}</span>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default HollidaysScale