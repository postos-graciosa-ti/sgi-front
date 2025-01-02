import Swal from "sweetalert2"

const sweetAlert = (props) => {
  const { title, text, icon } = props

  return (
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    })
  )
}

export default sweetAlert
