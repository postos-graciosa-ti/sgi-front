import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import useWorkersExperienceTimeStore from "../../data/workersExperienceTime"
import api from "../../services/api"
import CoordinatorInterviewModal from "./CoordinatorInterviewModal"
import InitSelectiveProcessModal from "./InitSelectiveProcessModal"
import RecruitModal from "./RecruitModal"
import RhInterviewModal from "./RhInterviewModal"
import { useScreenSize } from "../../hooks/useScreenSize"

const Applicants = () => {
  const { isMobile, isTablet, isDesktop } = useScreenSize()

  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const [initSelectiveProcessModalOpen, setInitSelectiveProcessModalOpen] = useState(false)

  const setWorkersFirstReview = useWorkersExperienceTimeStore(state => state.setWorkersFirstReview)

  const setWorkersSecondReview = useWorkersExperienceTimeStore(state => state.setWorkersSecondReview)

  const [applicantsList, setApplicantsList] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  const [rhInterviewModalOpen, setRhInterviewModalOpen] = useState(false)

  const [coordinatorInterviewModalOpen, setCoordinatorInterviewModalOpen] = useState(false)

  const [recruitModalOpen, setRecruitModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => setApplicantsList(response.data))
  }, [])

  const handlePrintDocsList = (exam) => {
    printJS({
      printable: exam,
      type: 'pdf',
    })
  }

  const handleOpenInitSelectiveProcessModal = () => {
    setInitSelectiveProcessModalOpen(true)
  }

  const handleOpenRhInterviewModal = (list) => {
    setSelectedApplicant(list)

    setRhInterviewModalOpen(true)
  }

  const handleOpenCoordinatorInterviewModal = (list) => {
    setSelectedApplicant(list)

    setCoordinatorInterviewModalOpen(true)
  }

  const handleOpenRecruitModal = (list) => {
    setSelectedApplicant(list)

    setRecruitModalOpen(true)
  }

  const handleDeleteApplicants = (list) => {
    api
      .delete(`/applicants/${list?.Applicants?.id}`)
      .then(() => {
        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-first-review`)
          .then((response) => setWorkersFirstReview(response?.data))

        api
          .get(`/subsidiaries/${selectedSubsidiarie?.value}/workers/experience-time-no-second-review`)
          .then((response) => setWorkersSecondReview(response?.data))

        api
          .get("/applicants")
          .then((response) => setApplicantsList(response.data))
      })
  }

  return (
    <>
      <Nav />

      <div className="container">
        <button className="btn btn-primary mb-4 me-2" onClick={() => handlePrintDocsList("/lista_de_documentos.pdf")}>
          Emitir lista de documentos
        </button>

        <button className="btn btn-primary mb-4 me-2" onClick={handleOpenInitSelectiveProcessModal}>
          Iniciar processo seletivo
        </button>

        {
          isDesktop && (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>

                    <th>Vaga</th>

                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {
                    applicantsList && applicantsList.map((list) => (
                      <tr key={list.Applicants?.id}>
                        <td>{list.Applicants?.name}</td>

                        <td>{list.Function?.name}</td>

                        <td>
                          <button className="btn btn-primary me-3" onClick={() => handleOpenRhInterviewModal(list)}>
                            Entrevista com RH
                          </button>

                          <button className="btn btn-primary me-3" onClick={() => handleOpenCoordinatorInterviewModal(list)}>
                            Entrevista com superior imediato
                          </button>

                          <button className="btn btn-primary me-3" onClick={() => handleOpenRecruitModal(list)}>
                            Efetivar
                          </button>

                          <button className="btn btn-primary me-3" onClick={() => handleDeleteApplicants(list)}>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }

        {
          isTablet && (
            <>
              {
                applicantsList && applicantsList.map((list) => (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{list.Applicants?.name}</h5>
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <b>Vaga</b>: {list.Function?.name}
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleOpenRhInterviewModal(list)}>
                          Entrevista com RH
                        </button>
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleOpenCoordinatorInterviewModal(list)}>
                          Entrevista com superior imediato
                        </button>
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleOpenRecruitModal(list)}>
                          Efetivar
                        </button>
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleDeleteApplicants(list)}>
                          Excluir
                        </button>
                      </li>
                    </ul>
                  </div>
                ))
              }
            </>
          )
        }

        {
          isMobile && (
            <>
              {
                applicantsList && applicantsList.map((list) => (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{list.Applicants?.name}</h5>
                    </div>

                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <b>Vaga</b>: {list.Function?.name}
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleOpenRhInterviewModal(list)}>
                          Entrevista com RH
                        </button>
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleOpenCoordinatorInterviewModal(list)}>
                          Entrevista com superior imediato
                        </button>
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleOpenRecruitModal(list)}>
                          Efetivar
                        </button>
                      </li>

                      <li className="list-group-item">
                        <button className="btn btn-primary me-3" onClick={() => handleDeleteApplicants(list)}>
                          Excluir
                        </button>
                      </li>
                    </ul>
                  </div>
                ))
              }
            </>
          )
        }
      </div>

      <InitSelectiveProcessModal
        initSelectiveProcessModalOpen={initSelectiveProcessModalOpen}
        setInitSelectiveProcessModalOpen={setInitSelectiveProcessModalOpen}
        setApplicantsList={setApplicantsList}
      />

      <RhInterviewModal
        rhInterviewModalOpen={rhInterviewModalOpen}
        setRhInterviewModalOpen={setRhInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setApplicantsList={setApplicantsList}
        setSelectedApplicant={setSelectedApplicant}
      />

      <CoordinatorInterviewModal
        coordinatorInterviewModalOpen={coordinatorInterviewModalOpen}
        setCoordinatorInterviewModalOpen={setCoordinatorInterviewModalOpen}
        selectedApplicant={selectedApplicant}
        setSelectedApplicant={setSelectedApplicant}
        setApplicantsList={setApplicantsList}
      />

      <RecruitModal
        recruitModalOpen={recruitModalOpen}
        setRecruitModalOpen={setRecruitModalOpen}
        selectedApplicant={selectedApplicant}
        setApplicantsList={setApplicantsList}
      />
    </>
  )
}

export default Applicants