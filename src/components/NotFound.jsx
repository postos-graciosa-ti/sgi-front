import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1">404</h1>
      
      <p className="lead">Ops! Página não encontrada.</p>
      
      <p>A página que você está tentando acessar não existe.</p>
      
      <Link to="/" className="btn btn-primary">
        Voltar para a Home
      </Link>
    </div>
  )
}

export default NotFound
