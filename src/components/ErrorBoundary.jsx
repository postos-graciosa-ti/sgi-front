import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import { useRouteError } from "react-router-dom"

function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h1 className="alert-heading">Oops! Something went wrong.</h1>
        <p>{error.statusText || error.message}</p>
      </div>
    </div>
  )
}

export default ErrorBoundary
