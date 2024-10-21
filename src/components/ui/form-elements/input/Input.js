import React from "react";
import "./input.css";
import { BsAsterisk } from "react-icons/bs";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  important = false,
  className = "",
  ...rest
}) => {
  const inputClass = `inputWrapper ${className}`;

  return (
    <div className={inputClass}>
      {label && (
        <label className="input__label">
          {label}
          {important && <BsAsterisk className="input__label__icon" />}
        </label>
      )}
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
