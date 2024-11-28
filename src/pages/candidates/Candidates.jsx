import { ArrowUpRight } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import { useNavigate } from "react-router-dom"

const Candidates = () => {
  const navigate = useNavigate()

  const navigateJobs = () => { }

  const navigateRegisterCandidate = () => {

  }

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mt-3 mb-3">
          <h3>Processos seletivos</h3>
        </div>

        <div className="card p-3 mb-3" onClick={() => navigate('/jobs', { replace: true })}>
          <div className="row">
            <div className="col-10">
              <h4>Vagas disponíveis</h4>
            </div>

            <div className="col-2">
              <button className="btn btn-primary">
                <ArrowUpRight />
              </button>
            </div>
          </div>

          <span>
            Oportunidades de trabalho abertas para essa filial
          </span>
        </div>

        <div className="card p-3 mb-3" onClick={navigateRegisterCandidate}>
          <h4>Cadastro</h4>

          <span>
            Armazenamento do currículo e prova de matemática
          </span>
        </div>
      </div>
    </>
  )
}

export default Candidates