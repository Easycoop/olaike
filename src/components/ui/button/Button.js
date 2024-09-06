import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({
  children,
  onClick,
  type,
  typeOf,
  disabled,
  className,
  style,
}) => {
  const buttonClass = `button ${typeOf} ${className}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={style}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  typeOf: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "success",
    "outline",
    "text",
    "icon-primary",
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

Button.defaultProps = {
  onClick: () => {},
  typeOf: "primary",
  disabled: false,
  className: "",
  style: {},
};

export default Button;
