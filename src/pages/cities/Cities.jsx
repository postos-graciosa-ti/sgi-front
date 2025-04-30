import { Plus } from "react-bootstrap-icons"
import Nav from "../../components/Nav"

const Cities = () => {
  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button className="btn btn-primary">
            <Plus />
          </button>
        </div>
      </div>
    </>
  )
}

export default Cities