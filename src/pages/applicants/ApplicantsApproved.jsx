import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession.js"
import api from "../../services/api"
import ApplicantCardList from "./ApplicantCardList.jsx"

const yesNoOptions = [{ value: "aprovado", label: "aprovado" }, { value: "reprovado", label: "reprovado" }]

const ApplicantsApproved = () => {
  const userSession = useUserSessionStore((state) => state.userSession)

  const [applicantsApprovedList, setApplicantsApprovedList] = useState()

  const [selectedApplicant, setSelectedApplicant] = useState()

  useEffect(() => {
    api
      .get("/applicants/approved")
      .then((response) => setApplicantsApprovedList(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        <div className="mb-3">
          <h4>Banco de talentos</h4>
        </div>

        <ApplicantCardList
          applicantsList={applicantsApprovedList}
          userSession={userSession}
          yesNoOptions={yesNoOptions}
          setSelectedApplicant={setSelectedApplicant}
        />

        {
          applicantsApprovedList && applicantsApprovedList.map((applicant) => (
            <div>
              {applicant.name}
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ApplicantsApproved