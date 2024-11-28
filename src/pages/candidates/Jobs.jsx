import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import useUserSessionStore from "../../data/userSession"
import getJobs from "../../requests/getJobs"
import CreateJobModal from "./CreateJobModal"
import DeleteJobModal from "./DeleteJobModal"

const Jobs = () => {
  const selectedSubsidiarie = useUserSessionStore(state => state.selectedSubsdiarie)

  const jobsList = useUserSessionStore(state => state.jobsList)

  const setJobsList = useUserSessionStore(state => state.setJobsList)

  const [openCreateJobModal, setOpenCreateJobModal] = useState(false)

  const [openDeleteJobModal, setOpenDeleteJobModal] = useState(false)

  // const setSelectedJob = useUserSessionStore(state => state.setSelectedJob)

  const [selectedJob, setSelectedJob] = useState()

  useEffect(() => {
    getJobs(selectedSubsidiarie.value)
      .then((response) => {
        setJobsList(response.data)
      })
      .catch((error) => console.error(error))

  }, [])

  const handleOpenDeleteModal = (job) => {
    setOpenDeleteJobModal(true)
    setSelectedJob(job)
  }

  return (
    <>
      <Nav />

      <div className="container">
        <button
          className="btn btn-sm btn-primary mt-2 mb-3"
          onClick={() => setOpenCreateJobModal(true)}
        >
          Nova vaga
        </button>

        {jobsList && jobsList.map((job) => (
          <>
            <div key={job.id} className="card p-2 mb-3">
              <h4>
                {job.name}
              </h4>

              <p>
                {job.description}
              </p>

              <button
                className="btn btn-sm btn-danger mt-2 mb-3"
                onClick={() => handleOpenDeleteModal(job)}
              >
                Encerrar vaga
              </button>
            </div>
          </>
        ))}
      </div>

      <CreateJobModal
        openCreateJobModal={openCreateJobModal}
        setOpenCreateJobModal={setOpenCreateJobModal}
      />

      <DeleteJobModal
        openDeleteJobModal={openDeleteJobModal}
        setOpenDeleteJobModal={setOpenDeleteJobModal}
        selectedJob={selectedJob}
      />
    </>
  )
}

export default Jobs