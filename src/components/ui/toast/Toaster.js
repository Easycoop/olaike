import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./toaster.css"; // Importing CSS for styling

const Toaster = ({ message, type, duration, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toaster toaster-${type}`}>
      <span className="toaster-span">{message}</span>
      <button
        className="toaster-close"
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
      >
        ×
      </button>
    </div>
  );
};

Toaster.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info", "warning", "default"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

Toaster.defaultProps = {
  type: "default",
  duration: 3000, // Default duration for toast visibility
  onClose: null,
};

export default Toaster;
