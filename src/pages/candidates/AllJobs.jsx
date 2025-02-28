import { useEffect, useState } from "react"
import Nav from "../../components/Nav"
import api from "../../services/api"

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState()

  useEffect(() => {
    api
      .get("/jobs")
      .then((response) => setAllJobs(response.data))
  }, [])

  return (
    <>
      <Nav />

      <div className="container">
        {
          allJobs && allJobs.map((job) => (
            <div key={job.id} className="card p-2 mb-3">
              <h4>
                {job.name}
              </h4>

              <p>
                {job.description}
              </p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default AllJobs