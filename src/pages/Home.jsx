import Nav from "../components/Nav.jsx"
import useUserSessionStore from "../data/userSession"

const Home = () => {
  const userSession = useUserSessionStore(state => state.userSession)

  return (
    <>
      <Nav />

      <div className="container mt-4">
        <h4>
          Seja bem-vindo {userSession.name}
        </h4>
      </div>
    </>
  )
}

export default Home;