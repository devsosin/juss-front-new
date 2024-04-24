import React from "react";

import "./SecondCard.css";

const SecondCard = ({ title, subTitle, children }) => {
  return (
    <div className="SecondCard" onClick={() => {}}>
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
