import React from "react";
const Button = ({ onClick, text }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;