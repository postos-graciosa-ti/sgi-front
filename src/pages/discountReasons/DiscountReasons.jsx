import { useEffect, useState } from "react"
import { Pen, Plus, Trash } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import api from "../../services/api"

const DiscountReasons = () => {
  const [discountReasonsList, setDiscountReasonsList] = useState()

  useEffect(() => {
    api
      .get("/discounts-reasons")
      .then((response) => {
        setDiscountReasonsList(response.data)
      })
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mb-3">
          <button className="btn btn-primary">
            <Plus />
          </button>
        </div>

        {
          discountReasonsList && discountReasonsList.map((discountReason) => (
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{discountReason.name}</h5>

                <p className="card-text text-muted">{discountReason.description}</p>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <button className="btn btn-warning me-2">
                    <Pen />
                  </button>

                  <button className="btn btn-danger">
                    <Trash />
                  </button>
                </li>

                {/* <li className="list-group-item">A second item</li> */}

                {/* <li className="list-group-item">A third item</li> */}
              </ul>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default DiscountReasons