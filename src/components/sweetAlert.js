import Swal from "sweetalert2"

const sweetAlert = (props) => {
  const { title, text, icon } = props

  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
  })
}

export default sweetAlert
