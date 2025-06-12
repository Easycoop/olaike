import React from "react";
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
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
          {label}
          {important && <BsAsterisk className="text-red-500 text-[8px] ml-1" />}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003399] transition-all duration-200"
        {...rest}
      >
        <option value="">-- Select --</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.id} data-fee={opt.entranceFee}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
