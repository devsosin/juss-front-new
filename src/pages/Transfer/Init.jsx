import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import Keypad from "../../components/Keypad/Keypad";

import { won } from "../../utils/currency";

import "./Init.css";

const Init = ({ toNext }) => {
  const navigate = useNavigate();
  const { fromId, toId } = useParams();

  const [amount, setAmount] = useState("");

  const [fromAccount, setFromAccount] = useState({
    id: 1,
    account_name: "NH올원통장",
    balance: 4539243,
    is_own: true,
  });
  const [toAccount, setToAccount] = useState({
    id: 2,
    bank_name: "하나은행",
    account_name: "하나골드클럽통장",
    account_number: "800-41-45416",
    is_own: false,
  });

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
              <span>{`내 ${fromAccount.account_name}`}</span>에서
            </div>
            <div className="balance-text">{`잔액 ${won(
              fromAccount.balance
            )}`}</div>
          </div>

          <div className="transfer-to">
            <div>
              <span>
                {`${toAccount.is_own ? "내 " : ""}` + toAccount.account_name}
              </span>
              {`${toAccount.is_own ? "으로" : "님에게"}`}
            </div>
            <div className="balance-text">{`${toAccount.bank_name} ${toAccount.account_number}`}</div>
          </div>

          <div className="transfer-amount">
            <input
              type="text"
              value={amount === "0원" ? "" : amount}
              placeholder={`얼마나 ${toAccount.is_own ? "채울" : "보낼"}까요?`}
            />
          </div>

          <div className="transfer-balance">
            <button
              className="balance-btn"
              onClick={() => setAmount(won(fromAccount.balance))}
            >
              {`잔액 · ${won(fromAccount.balance)} 입력`}
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
