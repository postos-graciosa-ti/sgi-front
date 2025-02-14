import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import sweetAlert from "../../components/sweetAlert"

const FirstAcess = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const [passwordConfirm, setPasswordConfirm] = useState()

  const handleSubmit = () => {
    if (password !== passwordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "A senha atual não confere",
      })

      return
    }

    let formData = {
      email: email,
      password: password,
    }

    api
      .post("/users/create-password", formData)
      .then(() => navigate('/', { replace: true }))
      .catch(() => sweetAlert({
        title: "Erro",
        text: "Usuário já possui senha",
        icon: "error"
      }))
  }

  return (
    <div className="container">
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">Voltar</Link>
      </div>

      <div className="mt-3 mb-3">
        <h3>Primeiro acesso</h3>
      </div>

      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Confirmar senha" onChange={(e) => setPasswordConfirm(e.target.value)} />
      </div>

      <div className="mt-3 text-end">
        <button className="btn btn-success" onClick={handleSubmit}>
          Confirmar
        </button>
      </div>
    </div>
  )
}

export default FirstAcess