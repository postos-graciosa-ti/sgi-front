import { useEffect, useState } from "react"
import PostoBemerIcon from "../../assets/posto-bemer.jpg"
import PostoFatimaIcon from "../../assets/posto-fatima.jpg"
import PostoGraciosaVIcon from "../../assets/posto-graciosa-v.jpg"
import PostoGraciosaIcon from "../../assets/posto-graciosa.jpg"
import PostoJarivaIcon from "../../assets/posto-jariva.jpg"
import PostoPiraiIcon from "../../assets/posto-pirai.jpg"
import Nav from "../../components/Nav.jsx"
import useUserSessionStore from "../../data/userSession.js"
import getSubsidiarieById from "../../requests/getSubsidiarieById.js"

const Home = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [selectedSubsidiarieInfo, setSelectedSubsidiarieInfo] = useState()

  const subsidiarieIcon = (
    selectedSubsdiarie.value == "1" && PostoGraciosaIcon ||
    selectedSubsdiarie.value == "2" && PostoFatimaIcon ||
    selectedSubsdiarie.value == "3" && PostoBemerIcon ||
    selectedSubsdiarie.value == "4" && PostoJarivaIcon ||
    selectedSubsdiarie.value == "5" && PostoGraciosaVIcon ||
    selectedSubsdiarie.value == "6" && PostoPiraiIcon ||
    "none"
  )

  const isGraciosaSecondPhone = selectedSubsdiarie.value == "1" && "/(47) 3436-2202 (RH)"

  const isPiraiSecondPhone = selectedSubsdiarie.value == "6" && "/(47) 3433-8225"

  useEffect(() => {
    getSubsidiarieById(selectedSubsdiarie.value)
      .then((response) => {
        setSelectedSubsidiarieInfo(response.data)
      })
  }, [])

  return (
    <>
      <Nav />

      <div className="container mt-4">
        <div className="text-center">
          <h5>{selectedSubsidiarieInfo?.name}</h5>
        </div>

        <div className="text-center mt-4">
          <img
            src={subsidiarieIcon}
            alt="ícone de posto não disponível"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="text-center mt-3 mb-5">
          <b>
            {selectedSubsidiarieInfo && selectedSubsidiarieInfo.email} | {selectedSubsidiarieInfo && selectedSubsidiarieInfo.phone}{isGraciosaSecondPhone}{isPiraiSecondPhone} | {selectedSubsidiarieInfo && selectedSubsidiarieInfo.adress}
          </b>
        </div>
      </div>
    </>
  )
}

export default Home
