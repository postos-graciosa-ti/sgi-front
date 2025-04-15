import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import axios from "axios"
import moment from "moment"
import HollidayScaleModal from "./HollidayScaleModal"

const HollidaysScale = () => {
  const currentYear = new Date().getFullYear()

  const [hollidaysList, setHollidaysList] = useState()

  const [selectedHolliday, setSelectedHolliday] = useState()

  const [hollidayScaleModalOpen, setHollidayScaleModalOpen] = useState(false)

  useEffect(() => {
    axios
      .get(`https://brasilapi.com.br/api/feriados/v1/${currentYear}`)
      .then((response) => {
        setHollidaysList(response?.data)
      })
  }, [])

  const handleOpenHollidayScaleModal = (holliday) => {
    setSelectedHolliday(holliday)

    setHollidayScaleModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <h4>Escala de folgas</h4>

        {
          hollidaysList?.map((holliday) => (
            <div className="card mb-2 p-2" onClick={() => handleOpenHollidayScaleModal(holliday)}>
              <span><b>{moment(holliday.date).format("DD-MM-YYYY")}</b>: {holliday.name}</span>
            </div>
          ))
        }
      </div>

      <HollidayScaleModal
        hollidayScaleModalOpen={hollidayScaleModalOpen}
        setHollidayScaleModalOpen={setHollidayScaleModalOpen}
        selectedHolliday={selectedHolliday}
        setSelectedHolliday={setSelectedHolliday}
      />
    </>
  )
}

export default HollidaysScale