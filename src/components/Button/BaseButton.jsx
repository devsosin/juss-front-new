import React from "react";

import "./BaseButton.css";

const BaseButton = ({ text, handleClick }) => {
  return (
    <div className="BaseButton" onClick={handleClick}>
      {text}
    </div>
  );
};

export default BaseButton;
