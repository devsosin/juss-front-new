import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import Keypad from "../../components/Keypad/Keypad";

import { won } from "../../utils/currency";

import "./Init.css";

import axios from "axios";

const Init = ({ toNext }) => {
  const navigate = useNavigate();
  const { fromId, toId } = useParams();

  const [amount, setAmount] = useState("");

  const [fromAccount, setFromAccount] = useState({});
  const [toAccount, setToAccount] = useState({});

  useEffect(() => {
    axios({
      url: `http://localhost:8080/api/v1/account/${fromId}`,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt-token"),
      },
    }).then((res) => setFromAccount(res.data));

    axios({
      url: `http://localhost:8080/api/v1/account/${toId}`,
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt-token"),
      },
    }).then((res) => setToAccount(res.data));
  }, [fromId, toId]);

  const changeAmount = (v) => {
    let res = amount.replace(/\D/g, "");
    const value =
      v.type?.name === "FaArrowLeft"
        ? res.slice(0, res.length - 1)
        : res + v.toString();

    setAmount(won(value));
  };

  return (
    <div className="Init">
      <div>
        <div className="app-bar">
          <div className="left">
            <Link onClick={() => navigate(-1)}>
              <FaArrowLeft size={24} />
            </Link>
          </div>
        </div>

        <div className="transfer-info">
          <div className="transfer-from">
            <div>
              <span>{`내 ${fromAccount?.account_name}`}</span>에서
            </div>
            <div className="balance-text">{`잔액 ${won(
              fromAccount?.balance
            )}`}</div>
          </div>

          <div className="transfer-to">
            <div>
              <span>
                {`${toAccount?.is_own ? "내 " : ""}` + toAccount?.account_name}
              </span>
              {`${toAccount?.is_own ? "으로" : "님에게"}`}
            </div>
            <div className="balance-text">{`${toAccount?.bank_name} ${toAccount?.account_number}`}</div>
          </div>

          <div className="transfer-amount">
            <input
              type="text"
              value={amount === "0원" ? "" : amount}
              placeholder={`얼마나 ${toAccount?.is_own ? "채울" : "보낼"}까요?`}
            />
          </div>

          <div className="transfer-balance">
            <button
              className="balance-btn"
              onClick={() => setAmount(won(fromAccount?.balance))}
            >
              {`잔액 · ${won(fromAccount?.balance)} 입력`}
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          className={`next-btn ${amount !== "0원" ? "show" : "hide"}`}
          onClick={() => toNext(amount)}
        >
          다음
        </div>

        <Keypad setValue={changeAmount} />
      </div>
    </div>
  );
};

export default Init;
