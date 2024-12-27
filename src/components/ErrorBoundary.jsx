import React from "react"
import { useRouteError } from "react-router-dom"

function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      
      <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorBoundary
