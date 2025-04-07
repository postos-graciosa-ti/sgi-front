const Input = ({ placeholder, type, setSelectedValue, label, defaultValue }) => {
  return (
    <div className="mb-3">
      {label && <label><b>{label}</b></label>}
      <input
        placeholder={placeholder}
        type={type}
        className="form-control"
        onChange={(e) => setSelectedValue(e.target.value)}
        defaultValue={defaultValue && defaultValue}
      />
    </div>
  )
}

export default Input