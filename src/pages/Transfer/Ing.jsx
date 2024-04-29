import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { FaSpinner } from "react-icons/fa";

import { won } from "../../utils/currency";

import "./Ing.css";
import axios from "axios";

const Ing = ({ amount, toNext, isComplete }) => {
  const { toId } = useParams();

  const [toAccount, setToAccount] = useState({});
  const [isFill, setIsFill] = useState(false);

  useEffect(() => {
    axios({
      url: `http://localhost:8080/api/v1/account/${toId}`,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt-token"),
      },
    }).then((res) => {
      setToAccount(res.data);
      setIsFill(res.data.is_own);
    });
  }, [toId]);

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        toNext();
      }, 1000);
    }
  }, [isComplete]);

  return (
    <div className="Ing">
      <div>
        <FaSpinner className="spinner" size={140} />
        <div>{`${isFill ? "내 " : ""}${toAccount.account_name}으로`}</div>
        <div>{`${won(amount)}을`}</div>
        <div>{`${isFill ? "채울" : "보낼"}게요`}</div>
      </div>
    </div>
  );
};

export default Ing;
