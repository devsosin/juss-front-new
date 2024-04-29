import React from "react";

import "./SecondCard.css";

const SecondCard = ({ title, subTitle, children, handleClick }) => {
  return (
    <div
      className="SecondCard"
      onClick={(e) => {
        try {
          return handleClick
            ? e.target.className.toLowerCase().includes("card") ||
              e.target.parentElement.className === "SecondCard"
              ? handleClick()
              : null
            : null;
        } catch (error) {}
      }}
    >
      <div className="left">
        <div className="card-icon"></div>
        <div className="card-text">
          <div className="card-title">{title}</div>
          <div className="card-sub">{subTitle}</div>
        </div>
      </div>
      <div className="right">{children}</div>
    </div>
  );
};

export default SecondCard;
