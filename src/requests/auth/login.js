import api from "../../services/api"

const Login = (email, password) => {
  api
    .post("/login", {
      "email": email,
      "password": password
    })
    .then((response) => {
      return response
    })
    .catch((error) => console.error(error))
}

export default Login