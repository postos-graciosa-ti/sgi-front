import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"
import CoordinatorInterviewModal from "./CoordinatorInterviewModal"
import InitSelectiveProcessModal from "./InitSelectiveProcessModal"
import RhInterviewModal from "./RhInterviewModal"
import RecruitModal from "./RecruitModal"

const Applicants = () => {
  const [initSelectiveProcessModalOpen, setInitSelectiveProcessModalOpen] = useState(false)

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
          .get("/applicants")
          .then((response) => setApplicantsList(response.data))
      })
  }

  return (
    <>
      <Nav />

      <div className="container">
        <button className="btn btn-primary mb-4" onClick={handleOpenInitSelectiveProcessModal}>
          Iniciar processo seletivo
        </button>

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
                  <tr>
                    <td>{list.Applicants?.name}</td>

                    <td>{list.Function?.name}</td>

                    <td>
                      <button className="btn btn-sm btn-primary me-3" onClick={() => handleOpenRhInterviewModal(list)}>
                        Entrevista com RH
                      </button>

                      <button className="btn btn-sm btn-primary me-3" onClick={() => handleOpenCoordinatorInterviewModal(list)}>
                        Entrevista com superior imediato
                      </button>

                      <button className="btn btn-sm btn-warning me-3" onClick={() => handleOpenRecruitModal(list)}>
                        Efetivar
                      </button>

                      <button className="btn btn-sm btn-danger me-3" onClick={() => handleDeleteApplicants(list)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
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
      />
    </>
  )
}

export default Applicants