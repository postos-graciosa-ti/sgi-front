const InputFile = ({ label, setSelectedValue }) => {
  return (
    <div className="mb-3">
      {label && <b>{label}</b>}
      <input
        type="file"
        className="form-control"
        onChange={(e) => setSelectedValue(e.target.files[0])}
      />
    </div>
  )
}

export default InputFile