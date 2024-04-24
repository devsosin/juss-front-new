import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import "./Asset.css";

import Accounts from "./Asset/Accounts";
import AccountRolling from "./Asset/AccountRolling";
import FindLoan from "./Asset/FindLoan";

import { won } from "../utils/currency";

const Asset = () => {
  const accounts = [];
  const accountMoney = 0;

  const [assetPage, setAssetPage] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="Asset">
      <div className="app-bar">
        <div onClick={() => navigate(-1)}>
          <FaArrowLeft size={24} />
        </div>
        <div>편집</div>
      </div>
      <div className="menu-bar">
        <div
          className={`menu-bar item ${assetPage === 0 ? "active" : ""}`}
          onClick={() => setAssetPage(0)}
        >
          자산
        </div>
        <div
          className={`menu-bar item ${assetPage === 1 ? "active" : ""}`}
          onClick={() => setAssetPage(1)}
        >
          자산 굴리기
        </div>
        <div
          className={`menu-bar item ${assetPage === 2 ? "active" : ""}`}
          onClick={() => setAssetPage(2)}
        >
          대출 찾기
        </div>
      </div>
      {assetPage === 0 ? (
        <Accounts />
      ) : assetPage === 1 ? (
        <AccountRolling />
      ) : (
        <FindLoan />
      )}
    </div>
  );
};

export default Asset;
