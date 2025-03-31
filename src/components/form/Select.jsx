import ReactSelect from "react-select"

const Select = ({ placeholder, options, setSelectedValue }) => {
  return (
    <div className="mb-3">
      <ReactSelect
        placeholder={placeholder}
        options={options}
        onChange={(value) => setSelectedValue(value)}
      />
    </div>
  )
}

export default Select