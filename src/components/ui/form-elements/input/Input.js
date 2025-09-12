import React, { useState } from "react";
import { BsAsterisk } from "react-icons/bs";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Eye icons
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
  const [showPassword, setShowPassword] = useState(false);

  // Only toggle if type is password
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
          {label}
          {important && <BsAsterisk className="text-red-500 text-[8px] ml-1" />}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399] transition-all duration-200 pr-10"
          {...rest}
        />
        {type === "password" && (
          <span
            type="span"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
          </span>
        )}
      </div>
      {validationErrors && <ValidationError validationErrors={validationErrors} field={fieldName} />}
    </div>
  );
};

export default Input;
