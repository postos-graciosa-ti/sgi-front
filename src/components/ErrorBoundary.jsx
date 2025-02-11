import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link, useRouteError } from 'react-router-dom'

function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1 text-danger">Oops!</h1>

      <h2 className="mb-4">Algo deu errado.</h2>

      <p className="lead text-center">
        {error.statusText || error.message}
      </p>
      
      <Link to="/" className="btn btn-primary mt-3">
        Voltar para a Home
      </Link>
    </div>
  )
}

export default ErrorBoundary
