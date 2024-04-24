import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import RecentAccount from "./Withdraw/RecentAccount";
import RecentPhone from "./Withdraw/RecentPhone";

import "./Withdraw.css";

const Withdraw = () => {
  const { accountId } = useParams();

  const [type, setType] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="Withdraw">
      <div className="app-bar">
        <div className="left">
          <div onClick={() => navigate(-1)}>
            <FaArrowLeft size={24} />
          </div>
        </div>
      </div>
      <div className="header-menu">
        <div className="title">어디로 돈을 보낼까요?</div>

        <div className="btns">
          <div
            className={type === 0 ? "active" : ""}
            onClick={() => setType(0)}
          >
            계좌
          </div>
          <div
            className={type === 1 ? "active" : ""}
            onClick={() => setType(1)}
          >
            연락처
          </div>
        </div>
      </div>
      {type === 0 ? <RecentAccount /> : <RecentPhone />}
    </div>
  );
};

export default Withdraw;
