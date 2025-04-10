import ReactSelect from "react-select"

const Select = ({ placeholder, options, setSelectedValue, defaultValue, label, isMulti, required }) => {
  return (
    <div className="mb-3">
      {required && <span style={{ "color": "red" }}>*</span>}{label && <label><b>{label}</b></label>}
      <ReactSelect
        placeholder={placeholder}
        options={options}
        onChange={(value) => setSelectedValue(value)}
        defaultValue={defaultValue && defaultValue || false}
        isMulti={isMulti}
      />
    </div>
  )
}

export default Select