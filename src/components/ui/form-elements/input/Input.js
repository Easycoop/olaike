import React from "react";
import { BsAsterisk } from "react-icons/bs";
import ValidationError from "../ValidationError";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder = "",
  ref,
  important = false,
  className = "",
  validationErrors,
  fieldName,
  ...rest
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
          {label}
          {important && <BsAsterisk className="text-red-500 text-[8px] ml-1" />}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399] transition-all duration-200"
        {...rest}
      />
      {validationErrors && <ValidationError validationErrors={validationErrors} field={fieldName} />}
    </div>
  );
};

export default Input;
