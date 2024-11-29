import { createBrowserRouter } from "react-router-dom"
import App from './App.jsx'
import Home from "./pages/Home.jsx"
import Users from "./pages/Users.jsx"
import Steps from "./pages/steps.jsx"
import Candidates from "./pages/candidates/candidates.jsx"
import Jobs from "./pages/candidates/Jobs.jsx"
import FirstAcess from "./pages/FirstAcess.jsx"
import AllJobs from "./pages/candidates/AllJobs.jsx"

const Routes = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/steps", element: <Steps /> },
  { path: "/home", element: <Home /> },
  { path: "/users", element: <Users /> },
  { path: "/candidates", element: <Candidates /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/first-access", element: <FirstAcess /> },
  { path: "/all-jobs", element: <AllJobs /> },
])

export default Routes