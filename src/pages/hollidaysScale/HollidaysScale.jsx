import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import SideMenu from "../../components/SideMenu"
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
      <SideMenu />

      <Nav />

      <div className="container">
        <h4>Escala de folgas</h4>

        {
          hollidaysList?.map((holliday) => (
            <div className="card mb-2 p-2">
              <button className="btn btn-light" onClick={() => handleOpenHollidayScaleModal(holliday)}>
                Criar escala para <b>{moment(holliday.date).format("DD-MM-YYYY")}</b> (<b>{holliday.name}</b>)
              </button>
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