import { useEffect, useState } from "react"
import api from "../../services/api"
import Nav from "../../components/Nav"
import { useNavigate } from "react-router-dom"
import useUserSessionStore from "../../data/userSession"

const FirstInterview = () => {
  const navigate = useNavigate()

  const [candidatesList, setCandidatesList] = useState()

  const setSelectedCandidate = useUserSessionStore(state => state.setSelectedCandidate)

  useEffect(() => {
    api
      .get("/candidates/status/2")
      .then((response) => setCandidatesList(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <h4>
          Candidatos para entrevista
        </h4>

        <span>
          Clique no candidato para iniciar entrevista
        </span>

        {
          candidatesList && candidatesList.map((candidate) => (
            <div
              className="card mt-3 mb-3 p-3"
              onClick={() => {
                setSelectedCandidate(candidate)
                navigate('/candidate-first-interview', { replace: true })
              }}
            >
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