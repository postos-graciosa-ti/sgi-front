import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Steps from "./pages/Steps"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Candidates from "./pages/candidates/Candidates"
import Jobs from "./pages/candidates/Jobs"
import FirstAcess from "./pages/FirstAcess"
import AllJobs from "./pages/candidates/AllJobs"
import RegisterCandidate from "./pages/candidates/RegisterCandidate"
import FirstInterview from "./pages/candidates/FirstInterview"
import Workers from "./pages/workers/Workers"
import Scale from "./pages/scale/Scale"
import SeeScale from "./pages/scale/SeeScale"
import CandidateFirstInterview from "./pages/candidates/CandidateFirstInterview"

const Routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/steps", element: <Steps /> },
  { path: "/home", element: <Home /> },
  { path: "/users", element: <Users /> },
  { path: "/candidates", element: <Candidates /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/first-access", element: <FirstAcess /> },
  { path: "/all-jobs", element: <AllJobs /> },
  { path: "/register-candidate", element: <RegisterCandidate /> },
  { path: "/first-interview", element: <FirstInterview /> },
  { path: "/workers", element: <Workers /> },
  { path: "/scale", element: <Scale /> },
  { path: "/see-scale", element: <SeeScale /> },
  { path: "/candidate-first-interview", element: <CandidateFirstInterview /> },
])

export default Routes