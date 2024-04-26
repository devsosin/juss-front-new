import React from "react";

import "./Card.css";

const Card = ({ title, subTitle, handleClick, children }) => {
  return (
    <div
      className="Card"
      onClick={(e) =>
        handleClick
          ? e.target.className.toLowerCase().includes("card") ||
            e.target.parentElement.className === "Card"
            ? handleClick()
            : null
          : null
      }
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

export default Card;
