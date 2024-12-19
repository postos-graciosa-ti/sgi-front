import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import AllJobs from "./pages/candidates/AllJobs"
import CandidateFirstInterview from "./pages/candidates/CandidateFirstInterview"
import Candidates from "./pages/candidates/Candidates"
import FirstInterview from "./pages/candidates/FirstInterview"
import Jobs from "./pages/candidates/Jobs"
import RegisterCandidate from "./pages/candidates/RegisterCandidate"
import FirstAcess from "./pages/firstAccess/FirstAcess"
import Functions from "./pages/functions/Functions"
import Home from "./pages/home/Home"
import Scale from "./pages/scale/Scale"
import ScaleHistory from "./pages/scale/ScaleHistory"
import SeeScale from "./pages/scale/SeeScale"
import Steps from "./pages/steps/Steps"
import Subsidiaries from "./pages/subsidiaries/Subsidiaries"
import Turns from "./pages/turns/Turns"
import Users from "./pages/users/Users"
import Workers from "./pages/workers/Workers"

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
  { path: "/scale-history", element: <ScaleHistory /> },
  { path: "/subsidiaries", element: <Subsidiaries /> },
  { path: "/turns", element: <Turns /> },
  { path: "/functions", element: <Functions /> },
])

export default Routes
