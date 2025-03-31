const Input = ({ placeholder, type, setSelectedValue, label }) => {
  return (
    <div className="mb-3">
      {type == "date" && <label><b>{label}</b></label>}
      <input
        placeholder={placeholder}
        type={type}
        className="form-control"
        onChange={(e) => setSelectedValue(e.target.value)}
      />
    </div>
  )
}

export default Input