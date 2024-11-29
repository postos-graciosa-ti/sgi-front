import { useEffect, useState } from "react"
import getAllJobs from "../../requests/getAllJobs"
import Nav from "../../components/Nav"

const AllJobs = () => {
  const [allJobs, setAllJobs] = useState()

  useEffect(() => {
    getAllJobs()
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