import api from "../../services/api"

const loadWagePaymentMethodOptions = (setWagePaymentMethodOptions) => {
  return (
    api
      .get(`/wage-payment-methods`)
      .then((response) => {
        let options = response?.data.map((wagePaymentMethod) => ({ value: wagePaymentMethod.id, label: wagePaymentMethod.name }))

        setWagePaymentMethodOptions(options)
      })
  )
}

export default loadWagePaymentMethodOptions