import Nav from "../../components/Nav"
import AddApplicantAppointmentModal from "./AddApplicantAppointmentModal"

const ApplicantsAppointments = () => {
  const [applicantAppointmentModalOpen, setApplicantAppointmentModalOpen] = useState(false)

  return (
    <>
      <Nav />

      <div className="container">
        <div>
          <button className="btn btn-primary">
            Novo agendamento
          </button>
        </div>
      </div>

      <AddApplicantAppointmentModal
        applicantAppointmentModalOpen={applicantAppointmentModalOpen}
        setApplicantAppointmentModalOpen={setApplicantAppointmentModalOpen}
      />
    </>
  )
}

export default ApplicantsAppointments