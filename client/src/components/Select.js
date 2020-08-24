import React, { useState } from "react";

const Select = ({ label, options, value }) => {
  const [selectValue, setSelectValue] = useState(value);
  const onChange = (e) => {
    setSelectValue(e.target.value);
  };
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <select className="form-control" value={selectValue} onChange={onChange}>
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
