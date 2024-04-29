import React from "react";
import { useNavigate } from "react-router-dom";

import BaseButton from "../components/Button/BaseButton";

import { startJuss } from "../api/start";

import "./Start.css";

const Start = () => {
  const navigate = useNavigate();

  const startJussApp = () => {
    startJuss().then((res) => {
      localStorage.setItem("jwt-token", res.data.access_token);
      navigate("/");
    });
  };

  return (
    <div className="Start">
      <div className="mask">
        <BaseButton
          text={"시작하기"}
          handleClick={() => {
            startJussApp();
          }}
        />
      </div>
    </div>
  );
};

export default Start;
