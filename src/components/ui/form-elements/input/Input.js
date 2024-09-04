import React from "react";
import "./input.css";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  className = "",
  ...rest
}) => {
  const inputClass = `input ${className}`;

  return (
    <div className="inputWrapper">
      {label && <label className="input__label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={inputClass}
        {...rest}
      />
    </div>
  );
};

export default Input;
