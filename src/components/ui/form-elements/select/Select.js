import React from "react";
import "./select.css";
import { BsAsterisk } from "react-icons/bs";

const Select = ({
  label,
  options,
  value,
  onChange,
  important = false,
  className = "",
  ...rest
}) => {
  const selectClass = `select ${className}`;
  return (
    <div className="selectWrapper">
      {label && (
        <label className="select__label">
          {label}
          {important && <BsAsterisk className="select__label__icon" />}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={selectClass}
        {...rest}
      >
        {/* {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))} */}
        <option value={null}>--</option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
