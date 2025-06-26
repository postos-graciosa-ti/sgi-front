import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Select from "react-select"
import useUserSessionStore from "../../data/userSession"
import api from "../../services/api"

const Steps = () => {
  const navigate = useNavigate()

  const userSession = useUserSessionStore(state => state.userSession)

  const setSelectedSubsidiarie = useUserSessionStore(state => state.setSelectedSubsidiarie)

  useEffect(() => {
    if (!userSession.one_signal_id) {
      if (window && window.OneSignal) {
        window.OneSignal = window.OneSignal || []

        window.OneSignal.push(() => {
          window.OneSignal.init({
            appId: import.meta.env.VITE_APP_ID,
            // appId: 'a884fea7-2f84-4b09-9815-7de82198616e',
            // allowLocalhostAsSecureOrigin: true,
          })

          window.OneSignal.showSlidedownPrompt()

          window.OneSignal.on('subscriptionChange', function (isSubscribed) {
            if (isSubscribed) {
              window.OneSignal.getUserId().then((userId) => {
                api
                  .patch(`/users/${userSession?.id}/${userId}/activate-notifications`)
                  .then(() => {
                    window.location.reload()
                  })
              })
            }
          })
        })
      }
    }
  }, [])

  const handleSubmit = () => {
    navigate('/home', { replace: true })
  }

  return (
    <>
      <div className="container">
        <div className="mt-3">
          <Link to="/" className="btn btn-primary">
            Voltar
          </Link>
        </div>

        <h1 className="mt-3">
          Selecione sua filial para prosseguir
        </h1>

        <div className="mt-3">
          <Select
            options={userSession.user_subsidiaries}
            placeholder="Filial"
            onChange={(e) => setSelectedSubsidiarie(e)}
          />
        </div>

        <div className="mt-3 mb-4 text-end">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Próximo
          </button>
        </div>
      </div>
    </>
  )
}

export default Steps