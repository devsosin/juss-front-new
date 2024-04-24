import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FaHouse, FaChartLine, FaBars } from "react-icons/fa6";
import { FaGem, FaShoppingBag } from "react-icons/fa";

import "./BottomNav.css";

const BottomNav = () => {
  const location = useLocation();
  return (
    <div className="bottom-nav">
      <Link to={"/"} className={`${location.pathname === "/" ? "active" : ""}`}>
        <FaHouse size={24} />
        <span>홈</span>
      </Link>
      <Link
        to={"/benefit"}
        className={`${location.pathname === "/benefit" ? "active" : ""}`}
      >
        <FaGem size={24} />
        <span>혜택</span>
      </Link>
      <Link
        to={"/pay"}
        className={`${location.pathname === "/pay" ? "active" : ""}`}
      >
        <FaShoppingBag size={24} />
        <span>주스페이</span>
      </Link>
      <Link
        to={"/stock"}
        className={`${location.pathname === "/stock" ? "active" : ""}`}
      >
        <FaChartLine size={24} />
        <span>주식</span>
      </Link>
      <Link
        to={"/menu"}
        className={`${location.pathname === "/menu" ? "active" : ""}`}
      >
        <FaBars size={24} />
        <span>전체</span>
      </Link>
    </div>
  );
};

export default BottomNav;
