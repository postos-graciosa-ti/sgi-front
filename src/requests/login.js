import api from "../services/api"
import Swal from "sweetalert2"

const login = (data) => {
  return (
    api
      .post("/users/login", data)
      .then((response) => response)
      .catch((error) => {
        console.error(error)

        Swal.fire({
          title: "Erro ao logar",
          text: "O usuário ou senha não conferem",
          icon: "error"
        })
      })
  )
}

export default login
