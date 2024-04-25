import React from "react";

import "./Badge.css";

const Badge = ({ text, isActive }) => {
  return <div className={`Badge ${isActive ? "active" : ""}`}>{text}</div>;
};

export default Badge;