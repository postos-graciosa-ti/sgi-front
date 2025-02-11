import { Navigate } from 'react-router-dom'
import useUserSessionStore from "./data/userSession"

const PrivateRoute = ({ children }) => {
  const userSession = useUserSessionStore((state) => state.userSession)

  if (!userSession.id) {
    return <Navigate to="/" replace />
  } else {
    return children
  }
}

export default PrivateRoute
