import React, { useState } from "react";

const Input = ({ label, value, name, type }) => {
  const [inputValue, setInputValue] = useState(value);
  const onChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <input type={type} name={name} value={inputValue} onChange={onChange} />
    </div>
  );
};

export default Input;
