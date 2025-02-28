import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorBoundary from "./components/ErrorBoundary"
import NotFound from "./components/NotFound"
import AllJobs from "./pages/candidates/AllJobs"
import CandidateFirstInterview from "./pages/candidates/CandidateFirstInterview"
import Candidates from "./pages/candidates/Candidates"
import FirstInterview from "./pages/candidates/FirstInterview"
import Jobs from "./pages/candidates/Jobs"
import RegisterCandidate from "./pages/candidates/RegisterCandidate"
import CostCenter from "./pages/costCenter/CostCenter"
import Department from "./pages/department/Department"
import Functions from "./pages/functions/Functions"
import Home from "./pages/home/Home"
import CostCenterLogs from "./pages/logsPages/CostCentersLogs"
import DepartmentLogs from "./pages/logsPages/DepartmentsLogs"
import FunctionsLogs from "./pages/logsPages/FunctionsLogs"
import ScalesLogs from "./pages/logsPages/ScalesLogs"
import SubsidiariesLogs from "./pages/logsPages/SubsidiariesLogs"
import TurnsLogs from "./pages/logsPages/TurnsLogs"
import UsersLogs from "./pages/logsPages/UsersLogs"
import WorkersLogs from "./pages/logsPages/WorkersLogs"
import Scale from "./pages/scale/Scale"
import SeeScale from "./pages/scale/SeeScale"
import SlaScale from "./pages/scale/SlaScale"
import Steps from "./pages/steps/Steps"
import Subsidiaries from "./pages/subsidiaries/Subsidiaries"
import SubsidiarieStatus from "./pages/subsidiarieStatus/SubsidiarieStatus"
import Turns from "./pages/turns/Turns"
import Users from "./pages/users/Users"
import Workers from "./pages/workers/Workers"
import PrivateRoute from "./PrivateRoute"

const Routes = createBrowserRouter([

  // public routes

  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/",
    element: <App />,
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

  // private routes

  {
    path: "/steps",
    element: <PrivateRoute><Steps /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/home",
    element: <PrivateRoute><Home /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/users",
    element: <PrivateRoute><Users /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/candidates",
    element: <PrivateRoute><Candidates /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/jobs",
    element: <PrivateRoute><Jobs /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/all-jobs",
    element: <PrivateRoute><AllJobs /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/register-candidate",
    element: <PrivateRoute><RegisterCandidate /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/first-interview",
    element: <PrivateRoute><FirstInterview /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/workers",
    element: <PrivateRoute><Workers /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/scale",
    element: <PrivateRoute><Scale /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/candidate-first-interview",
    element: <PrivateRoute><CandidateFirstInterview /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/subsidiaries",
    element: <PrivateRoute><Subsidiaries /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/turns",
    element: <PrivateRoute><Turns /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/functions",
    element: <PrivateRoute><Functions /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/scales-logs",
    element: <PrivateRoute><ScalesLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/cost-center",
    element: <PrivateRoute><CostCenter /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/departments",
    element: <PrivateRoute><Department /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/subsidiarie-status",
    element: <PrivateRoute><SubsidiarieStatus /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/workers-logs",
    element: <PrivateRoute><WorkersLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/turns-logs",
    element: <PrivateRoute><TurnsLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/cost-center-logs",
    element: <PrivateRoute><CostCenterLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/department-logs",
    element: <PrivateRoute><DepartmentLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/subsidiaries-logs",
    element: <PrivateRoute><SubsidiariesLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/functions-logs",
    element: <PrivateRoute><FunctionsLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/users-logs",
    element: <PrivateRoute><UsersLogs /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
])

export default Routes
