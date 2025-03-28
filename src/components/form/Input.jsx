const Input = ({ placeholder, type, setSelectedValue }) => {
  return (
    <div className="mb-3">
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