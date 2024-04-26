import React from "react";
import { useNavigate } from "react-router-dom";

import "./Start.css";

import BaseButton from "../components/Button/BaseButton";

const Start = () => {
  const navigate = useNavigate();

  const startJuss = () => {
    // 사용자 인증 처리
    navigate("/");
  };

  return (
    <div className="Start">
      <div className="mask">
        <BaseButton
          text={"시작하기"}
          handleClick={() => {
            startJuss();
          }}
        />
      </div>
    </div>
  );
};

export default Start;
