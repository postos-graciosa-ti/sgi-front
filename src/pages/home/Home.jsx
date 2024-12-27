import { useEffect, useState } from "react"
import PostoBemerIcon from "../../assets/posto-bemer.jpg"
import PostoFatimaIcon from "../../assets/posto-fatima.jpg"
import PostoGraciosaIcon from "../../assets/posto-graciosa.jpg"
import PostoJarivaIcon from "../../assets/posto-jariva.jpg"
import PostoGraciosaVIcon from "../../assets/posto-graciosa-v.jpg"
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

  const isPiraiSecondPhone = selectedSubsdiarie.value == "6" && "/(47) 3433-8225"

  useEffect(() => {
    getSubsidiarieById(selectedSubsdiarie.value)
      .then((response) => {
        console.log(response.data)
        setSelectedSubsidiarieInfo(response.data)
      })
  }, [])

  console.log(selectedSubsdiarie)

  return (
    <>
      <Nav />

      <div className="container mt-4">
        <div>
          <h4>
            Seja bem-vindo {userSession && userSession.name}, você está visualizando dados de: {selectedSubsidiarieInfo && selectedSubsidiarieInfo.name}
          </h4>
        </div>

        <div className="text-center mt-5">
          <img
            src={subsidiarieIcon}
            alt="ícone de posto não disponível"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="mt-3">
          <b>
            {selectedSubsidiarieInfo && selectedSubsidiarieInfo.email} | {selectedSubsidiarieInfo && selectedSubsidiarieInfo.phone}{isPiraiSecondPhone} | {selectedSubsidiarieInfo && selectedSubsidiarieInfo.adress}
          </b>
        </div>
      </div>
    </>
  )
}

export default Home;