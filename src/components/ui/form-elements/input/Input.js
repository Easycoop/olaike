import React from "react";
import "./input.css";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  className = "",
  ...rest
}) => {
  const inputClass = `inputWrapper ${className}`;

  return (
    <div className={inputClass}>
      {label && <label className="input__label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
        {...rest}
      />
    </div>
  );
};

export default Input;
