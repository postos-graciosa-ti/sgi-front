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
          title: "Sucesso",
          text: "Planejamento de folgas cadastrado com sucesso",
          icon: "error"
        })
      })
  )
}

export default login
