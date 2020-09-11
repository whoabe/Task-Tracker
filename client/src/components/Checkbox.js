import React, { useState } from "react";

const Checkbox = ({ label, checked, name, type }) => {
  const [isChecked, setIsChecked] = useState(checked);
  const onChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className="form-group">
      <label className="label">{label}</label>
      <input type={type} name={name} checked={isChecked} onChange={onChange} />
    </div>
  );
};

export default Checkbox;
