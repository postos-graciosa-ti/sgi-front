import Nav from "../../components/Nav"

const Notification = (props) => {
  const { date, updates } = props

  return (
    <>
      <h4>{date && date}</h4>

      {
        updates && updates.map((update) => (
          <div className="alert alert-secondary" role="alert">
            {update}
          </div>
        ))
      }
    </>
  )
}

const UpdateNotifications = () => {
  return (
    <>
      <Nav />

      <div className="container">
        <Notification
          date={"05/05/2025"}
          updates={[
            "1. Implementação de histórico de atualizações de sistema",
          ]}
        />
      </div>
    </>
  )
}

export default UpdateNotifications