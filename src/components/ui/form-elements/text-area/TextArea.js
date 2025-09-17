import React from "react";
import "./text-area.css";
import ValidationError from "../ValidationError";
const TextArea = ({ label, value, onChange, className = "", validationErrors, fieldName, ...rest }) => {
  
  return (
    <div className="textAreaWrapper">
      {label && <label className="label text-gray-700">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        className={className}
        {...rest}
      />
      {validationErrors && <ValidationError validationErrors={validationErrors} field={fieldName} />}
    </div>
    
  );
};

export default TextArea;
