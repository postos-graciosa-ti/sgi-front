import { createBrowserRouter } from "react-router-dom"
import App from './App.jsx'
import AllJobs from "./pages/candidates/AllJobs.jsx"
import Candidates from "./pages/candidates/candidates.jsx"
import FirstInterview from "./pages/candidates/FirstInterview.jsx"
import Jobs from "./pages/candidates/Jobs.jsx"
import RegisterCandidate from "./pages/candidates/RegisterCandidate.jsx"
import FirstAcess from "./pages/FirstAcess.jsx"
import Home from "./pages/Home.jsx"
import Scale from "./pages/scale/Scale.jsx"
import SeeScale from "./pages/scale/SeeScale.jsx"
import Steps from "./pages/steps.jsx"
import Users from "./pages/Users.jsx"
import Workers from "./pages/workers/workers.jsx"
import CandidateFirstInterview from "./pages/candidates/CandidateFirstInterview.jsx"

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