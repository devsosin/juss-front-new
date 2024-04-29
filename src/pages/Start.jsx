import React from "react";
import { useNavigate } from "react-router-dom";

import BaseButton from "../components/Button/BaseButton";

import "./Start.css";

import axios from "axios";

const Start = () => {
  const navigate = useNavigate();

  const startJuss = () => {
    axios({
      url: "http://localhost:8080/api/v1/start",
      method: "post",
    })
      .then((res) => {
        // 응답이 정상적으로 오면, localStorage에 토큰 정보 저장
        localStorage.setItem("jwt-token", res.data.access_token);
        //   홈 화면으로 이동
        navigate("/");
      })
      .catch((err) => {
        // 에러 발생 시,
        console.log(err);
      });
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
