import React from "react";
import "./text-area.css";

const TextArea = ({ label, value, onChange, className = "", ...rest }) => {
  return (
    <div className="textAreaWrapper">
      {label && <label className="label">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        className={className}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
