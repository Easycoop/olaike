import React, { useEffect, useState } from "react";
import toastManager from "./ToasterManager";
import Toaster from "./Toaster";
import "./toaster-container.css";

const ToasterContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToastsChange = (toasts) => {
      setToasts([...toasts]);
    };

    toastManager.addListener(handleToastsChange);
    return () => {
      toastManager.removeListener(handleToastsChange);
    };
  }, []);

  return (
    <div className="toaster-container">
      {toasts.map((toast, index) => (
        <Toaster
          key={index}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => toastManager.removeToast(toast)}
        />
      ))}
    </div>
  );
};

export default ToasterContainer;
