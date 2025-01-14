import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorBoundary from "./components/ErrorBoundary"
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
import SlaScale from "./pages/scale/SlaScale"

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/steps",
    element: <Steps />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/users",
    element: <Users />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/candidates",
    element: <Candidates />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/jobs",
    element: <Jobs />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/first-access",
    element: <FirstAcess />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/all-jobs",
    element: <AllJobs />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/register-candidate",
    element: <RegisterCandidate />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/first-interview",
    element: <FirstInterview />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/workers",
    element: <Workers />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/scale",
    element: <Scale />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/scale-two",
    element: <SlaScale />
  },
  {
    path: "/see-scale",
    element: <SeeScale />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/candidate-first-interview",
    element: <CandidateFirstInterview />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/scale-history",
    element: <ScaleHistory />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/subsidiaries",
    element: <Subsidiaries />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/turns",
    element: <Turns />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/functions",
    element: <Functions />,
    errorElement: <ErrorBoundary />
  },
])

export default Routes
