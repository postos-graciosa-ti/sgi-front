import { useEffect, useState } from "react"
import api from "../../services/api"
import Nav from "../../components/Nav"

const FirstInterview = () => {
  const [candidatesList, setCandidatesList] = useState()

  useEffect(() => {
    api
      .get("/candidates/status/2")
      .then((response) => setCandidatesList(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        {
          candidatesList && candidatesList.map((candidate) => (
            <div className="card mb-3 p-3">
              <h5>
                <b>
                  {candidate.name}
                </b>
              </h5>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default FirstInterview