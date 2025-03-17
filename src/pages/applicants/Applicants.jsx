import { useEffect, useState } from "react"
import { Plus, CameraVideo, Clipboard } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import AddApplicantsModal from "./AddApplicantsModal"
import api from "../../services/api"
import InterviewModal from "./InterviewModal"

const Applicants = () => {
  const [applicants, setApplicants] = useState()

  const [addApplicantsModalOpen, setAddApplicantsModalOpen] = useState(false)

  const [interviewModalOpen, setInterviewModalOpen] = useState(false)

  useEffect(() => {
    api
      .get("/applicants")
      .then((response) => setApplicants(response.data))
  }, [])

  const handleOpenAddApplicantModalOpen = () => {
    setAddApplicantsModalOpen(true)
  }

  const handleOpenInterviewModal = () => {
    setInterviewModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button className="btn btn-primary mt-4 mb-4 me-2" onClick={handleOpenAddApplicantModalOpen}>
            <Plus />
          </button>

          <button className="btn btn-primary">
            Provas
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                applicants?.map((applicant) => (
                  <tr>
                    <td>{applicant.name}</td>

                    <td>
                      <button className="btn btn-primary" onClick={handleOpenInterviewModal}>
                        <CameraVideo />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <AddApplicantsModal
        addApplicantsModalOpen={addApplicantsModalOpen}
        setAddApplicantsModalOpen={setAddApplicantsModalOpen}
        setApplicants={setApplicants}
      />

      <InterviewModal
        interviewModalOpen={interviewModalOpen}
        setInterviewModalOpen={setInterviewModalOpen}
      />
    </>
  )
}

export default Applicants