import React from "react";

import "./SubButton.css";

const SubButton = ({ text, handleClick }) => {
  return (
    <div className="SubButton" onClick={handleClick}>
      {text}
    </div>
  );
};

export default SubButton;
