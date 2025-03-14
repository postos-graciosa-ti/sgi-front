import { useState } from "react"
import { Plus } from "react-bootstrap-icons"
import Nav from "../../components/Nav"
import AddApplicantsModal from "./AddApplicantsModal"

const Applicants = () => {
  const [addApplicantsModalOpen, setAddApplicantsModalOpen] = useState(false)

  const handleOpenAddApplicantModalOpen = () => {
    setAddApplicantsModalOpen(true)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <button className="btn btn-primary" onClick={handleOpenAddApplicantModalOpen}>
          <Plus />
        </button>
      </div>

      <AddApplicantsModal
        addApplicantsModalOpen={addApplicantsModalOpen}
        setAddApplicantsModalOpen={setAddApplicantsModalOpen}
      />
    </>
  )
}

export default Applicants