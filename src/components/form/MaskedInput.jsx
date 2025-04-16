import InputMask from 'react-input-mask'

const MaskedInput = ({ placeholder, type, setSelectedValue, label, defaultValue, required, mask }) => {
  return (
    <div className="mb-3">
      {label && <b>{label}</b>}
      <InputMask
        placeholder={placeholder}
        type={type}
        mask={mask}
        className="form-control"
        onChange={(e) => setSelectedValue(e.target.value)}
        defaultValue={defaultValue && defaultValue}
      />
    </div>
  )
}

export default MaskedInput