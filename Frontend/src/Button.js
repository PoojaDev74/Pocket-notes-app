import React from "react";


const Button = ({ children, onClick, className = "", variant = "default" }) => {
  return (
    <button
      onClick={onClick}
      className="hidden">
      {children}
    </button>
  );
};

export default Button;
