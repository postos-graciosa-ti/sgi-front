import { useEffect, useState } from "react"
import Select from "react-select"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import getJobs from "../../requests/getJobs"
import api from "../../services/api"
import TeoryModal from "./TeoryModal"
import MathCorrection from "./MathCorrection"

const RegisterCandidate = () => {
  const selectedSubsdiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [name, setName] = useState()

  const [birthDate, setBirthDate] = useState()

  const [adress, setAdress] = useState()

  const [resume, setResume] = useState()

  const [jobsOptions, setJobsOptions] = useState()

  const [selectedJob, setSelectedJob] = useState()

  const [mathModalOpen, setMathModalOpen] = useState(false)

  const [teoryModalOpen, setTeoryModalOpen] = useState(false)

  useEffect(() => {
    getJobs(selectedSubsdiarie.value)
      .then((response) => {
        let jobsData = response.data

        let options = []

        jobsData && jobsData.map((data) => {
          options.push({ "value": data.id, "label": data.name })
        })

        setJobsOptions(options)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = {
      "name": name,
      "date_of_birth": birthDate,
      "address": adress,
      "job_id": selectedJob,
      "resume": resume.name
    }

    console.log(formData)
    debugger

    api
      .post("/candidates", formData)
      .then((response) => console.log(response))
      .catch((error) => console.error(error))
  }

  console.log(name)

  return (
    <>
      <Nav />

      <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h4>Registre um candidato para uma vaga dessa filial</h4>
          </div>

          {/* <div className="mb-3">
            <button className="btn btn-sm btn-primary">
              Corrigir prova de matemática
            </button>
          </div> */}

          <div className="mb-3 mt-4">
            <label htmlFor="resume">
              <b>
                Currículo digitalizado
              </b>
            </label>

            <input
              id="resume"
              type="file"
              className="form-control mt-3"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jobsOptions">
              <b>
                Opções de vagas
              </b>
            </label>

            <Select
              id="jobsOptions"
              options={jobsOptions}
              placeholder="vagas disponíveis nesta filial"
              className="mt-3"
              onChange={(e) => setSelectedJob(e.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name">
              <b>Nome completo</b>
            </label>

            <input
              id="name"
              type="text"
              className="form-control mt-3"
              placeholder="Jessé Gomes da Silva Filho"
              onChange={(e) => {
                console.log(e.target.value)
                setName(e.target.value)
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="birthDate">
              <b>
                Data de nascimento
              </b>
            </label>

            <input
              id="birthDate"
              type="date"
              className="form-control mt-3"
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="adress">
              <b>Endereço</b>
            </label>

            <input
              id="adress"
              type="text"
              className="form-control mt-3"
              placeholder="Av. Alameda das Travessas, 111, Edif. Bosque do Cerrado, ap. 2222 - Bairro dos Barris. CEP: 40000-000."
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <button
              className="btn btn-sm btn-primary me-3"
              onClick={() => setMathModalOpen(true)}
            >
              Corrigir prova de matemática
            </button>

            <button
              className="btn btn-sm btn-primary me-3"
              onClick={() => setMathModalOpen(true)}
            >
              Corrigir prova teórica
            </button>

            <button type="submit" className="btn btn-sm btn-success">
              Cadastrar
            </button>
          </div>
        </form>
      </div>

      <MathCorrection
        mathModalOpen={mathModalOpen}
        setMathModalOpen={setMathModalOpen}
      />

      <TeoryModal 
        teoryModalOpen={teoryModalOpen}
        setTeoryModalOpen={setTeoryModalOpen}
      />
    </>
  )
}

export default RegisterCandidate