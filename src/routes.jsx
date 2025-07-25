import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorBoundary from "./components/ErrorBoundary"
import NotFound from "./components/NotFound"
import ActivitiesRange from "./pages/activitiesRange/ActivitiesRange"
import Applicants from "./pages/applicants/Applicants"
import ApplicantsApproved from "./pages/applicants/ApplicantsApproved"
import AllJobs from "./pages/candidates/AllJobs"
import CandidateFirstInterview from "./pages/candidates/CandidateFirstInterview"
import Candidates from "./pages/candidates/Candidates"
import FirstInterview from "./pages/candidates/FirstInterview"
import Jobs from "./pages/candidates/Jobs"
import RegisterCandidate from "./pages/candidates/RegisterCandidate"
import Cities from "./pages/cities/Cities"
import CostCenter from "./pages/costCenter/CostCenter"
import Department from "./pages/department/Department"
import DiscountReasons from "./pages/discountReasons/DiscountReasons"
import EffectiveApplicants from "./pages/effectiveApplicants/EffectiveApplicants"
import Functions from "./pages/functions/Functions"
import HollidaysScale from "./pages/hollidaysScale/HollidaysScale"
import Home from "./pages/home/Home"
import Indicators from "./pages/Indicators/Indicators"
import IndicatorsCriteria from "./pages/indicatorsCriteria/IndicatorsCriteria"
import CostCenterLogs from "./pages/logsPages/CostCentersLogs"
import DepartmentLogs from "./pages/logsPages/DepartmentsLogs"
import FunctionsLogs from "./pages/logsPages/FunctionsLogs"
import SubsidiariesLogs from "./pages/logsPages/SubsidiariesLogs"
import TurnsLogs from "./pages/logsPages/TurnsLogs"
import UsersLogs from "./pages/logsPages/UsersLogs"
import WorkersLogs from "./pages/logsPages/WorkersLogs"
import Metrics from "./pages/metrics/Metrics"
import Monitoring from "./pages/monitoring/Monitoring"
import Nationalities from "./pages/nationalities/Nationalities"
import Neighborhood from "./pages/neighborhoods/Neighborhood"
import PositionsTable from "./pages/positionsTable/PositionsTable"
import Scale from "./pages/scale/Scale"
import States from "./pages/states/States"
import Steps from "./pages/steps/Steps"
import Subsidiaries from "./pages/subsidiaries/Subsidiaries"
import SubsidiarieStatus from "./pages/subsidiarieStatus/SubsidiarieStatus"
import SystemLog from "./pages/systemLog/SystemLog"
import Requesting from "./pages/tickets/Requesting"
import Responsible from "./pages/tickets/Responsible"
import Tickets from "./pages/tickets/Tickets"
import Turns from "./pages/turns/Turns"
import UpdateNotifications from "./pages/updateNotifications/UpdateNotifications"
import Users from "./pages/users/Users"
import Workers from "./pages/workers/Workers"
import WorkersStatus from "./pages/workersStatus/WorkersStatus"
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
  {
    path: "/neighborhoods",
    element: <PrivateRoute><Neighborhood /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/applicants",
    element: <PrivateRoute><Applicants /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/monitoring",
    element: <PrivateRoute><Monitoring /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/nationalities",
    element: <PrivateRoute><Nationalities /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/states",
    element: <PrivateRoute><States /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/hollidays-scale",
    element: <PrivateRoute><HollidaysScale /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/cities",
    element: <PrivateRoute><Cities /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/update-notifications",
    element: <PrivateRoute><UpdateNotifications /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/tickets",
    element: <PrivateRoute><Tickets /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/requesting",
    element: <PrivateRoute><Requesting /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/responsible",
    element: <PrivateRoute><Responsible /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/positions-table",
    element: <PrivateRoute><PositionsTable /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/system-log",
    element: <PrivateRoute><SystemLog /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/indicators",
    element: <PrivateRoute><Indicators /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/indicators-criteria",
    element: <PrivateRoute><IndicatorsCriteria /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/metrics",
    element: <PrivateRoute><Metrics /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/discounts-reasons",
    element: <PrivateRoute><DiscountReasons /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/workers-status",
    element: <PrivateRoute><WorkersStatus /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/applicants-approved",
    element: <PrivateRoute><ApplicantsApproved /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/effective-applicants",
    element: <PrivateRoute><EffectiveApplicants /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/activities-range",
    element: <PrivateRoute><ActivitiesRange /></PrivateRoute>,
    errorElement: <ErrorBoundary />,
  },
])

export default Routes
