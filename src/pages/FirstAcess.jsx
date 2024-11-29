import { useEffect, useState } from "react"
import api from "../services/api"

const FirstAcess = () => {
  const [enablePassword, setEnablePassword] = useState(false)

  const [email, setEmail] = useState()

  const [password, setPassword] = useState()

  const [passwordConfirm, setPasswordConfirm] = useState()

  useEffect(() => {
    email && api
      .post("/verify-email", { "email": email })
      .then((response) => {
        let data = response.data

        if (data.status == "true") {
          setEnablePassword(true)
        }

      })
      .catch((error) => console.error(error))

  }, [email])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password == passwordConfirm) {
      api
        .post("/confirm-password", {
          "email": email,
          "password": password
        })
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
    }
  }

  return (
    <>
      <div className="container">
        <h3>Informe seu e-mail e pressione Tab</h3>

        <div className="mt-3 mb-3">
          <input
            type="text"
            placeholder="E-mail"
            className="form-control"
            onBlur={(e) => setEmail(e.target.value)}
          />
        </div>

        {
          enablePassword && (
            <>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Crie sua senha"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirme sua senha"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    confirmar
                  </button>
                </div>
              </form>
            </>
          )
        }
      </div>
    </>
  )
}

export default FirstAcess