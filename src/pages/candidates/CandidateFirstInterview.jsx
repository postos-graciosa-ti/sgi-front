import ReactSelect from "react-select"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import { useEffect, useState } from "react"
import api from "../../services/api"
import getJobs from "../../requests/getJobs"

const CandidateFirstInterview = () => {
  const selectedCandidate = useUserSessionStore(state => state.selectedCandidate)

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsidiarie)

  const [selectedCity, setSelectedCity] = useState()

  const [hometown, setSelectedHometown] = useState()

  const [residenceTown, setResidenceTown] = useState()

  const [selectedJob, setSelectedJob] = useState()

  const hometownOptions = [
    { "label": "Joinville", "value": 1 }
  ]

  const residenceTownOptions = [
    { "label": "Joinville", "value": 1 }
  ]

  // const [jobsOptions, setJobsOptions] = useState([])

  // useEffect(() => {
  //   getJobs(selectedSubsidiarie.value)
  //     .then((response) => {
  //       let jobsData = response.data

  //       let options = []

  //       jobsData && jobsData.map((data) => {
  //         options.push({ "value": data.id, "label": data.name })
  //       })

  //       setJobsOptions(options)
  //     })
  // }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mb-3">
          <h4>
            Entrevista de {selectedCandidate && selectedCandidate.name}
          </h4>

          <span>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <ReactSelect
              placeholder={"Cidade natal"}
              options={hometownOptions}
              onChange={(e) => setSelectedHometown(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <ReactSelect
              placeholder={"Cidade em que reside"}
              options={residenceTownOptions}
              onChange={(e) => setResidenceTown(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Tempo de residência em sua cidade de residência"
            />
          </div>

          {/* <div className="mb-3">
            <ReactSelect
              placeholder={"Vagas disponíveis"}
              options={jobsOptions}
              onChange={(e) => setSelectedJob(e.target.value)}
            />
          </div> */}

          <div className="mb-3">
            <ReactSelect
              placeholder={"Possui experiência na função?"}
              options={{
                "label": "sim", "value": 1,
                "label": "não", "value": 2
              }}
              onChange={(e) => setSelectedJob(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default CandidateFirstInterview