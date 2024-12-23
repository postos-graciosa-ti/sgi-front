import Nav from "../../components/Nav.jsx"
import useUserSessionStore from "../../data/userSession.js"
import PostoGraciosa from "../../assets/posto-graciosa.jpg"

const Home = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  console.log(userSession)

  return (
    <>
      <Nav />

      <div className="container mt-4">
        {/* <h4>
          Seja bem-vindo {userSession.name}
        </h4> */}

        <img src={PostoGraciosa} alt="Logo" />
      </div>
    </>
  )
}

export default Home;