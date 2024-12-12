import { Plus } from "react-bootstrap-icons"
import Nav from "../../components/Nav"

const Turns = () => {
  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button
            type="button"
            className="btn btn-primary"
          >
            <Plus />
          </button>
        </div>
      </div>
    </>
  )
}

export default Turns