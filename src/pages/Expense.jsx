import React, { useEffect, useMemo, useState } from "react";

import {
  FaArrowLeft,
  FaCaretLeft,
  FaCaretRight,
  FaAngleDown,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import BaseButton from "../components/Button/BaseButton";
import CardExpense from "./Expense/CardExpense";

import { won } from "../utils/currency";

import "./Expense.css";
import axios from "axios";

const Expense = () => {
  const navigate = useNavigate();
  const now = new Date();
  const [ym, setYm] = useState(
    `${now.getFullYear()}${now.getMonth().toString().padStart(2, "0")}`
  );
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios({
      url: `http://localhost:8080/api/v1/cards?ym=${ym}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    }).then((res) => setCards(res.data.cards));
  }, [ym]);

  const [expense, setExpense] = useState(0);
  useMemo(() => {
    setExpense(cards.reduce((acc, v) => acc + v.amount, 0));
  }, [cards]);

  return (
    <div className="Expense">
      <div className="app-bar">
        <div className="left">
          <div onClick={() => navigate(-1)}>
            <FaArrowLeft size={24} />
          </div>
        </div>
      </div>
      <div className="menu-bar">
        <div className="active">내 소비</div>
        <div>카드 추천</div>
      </div>
      <div className="info">
        <div className="monthly-expense">
          <div>
            <div>
              <FaCaretLeft size={12} /> {ym.slice(4, 6)}월 소비{" "}
              <FaCaretRight size={12} />
            </div>
            <div className="money">
              {won(expense)} <FaAngleDown size={12} />
            </div>
          </div>
          <BaseButton text={"분석"} />
        </div>

        <div className="card-expense">
          <CardExpense
            title={"신용카드"}
            cards={cards?.filter(({ is_credit }) => is_credit)}
          />

          <CardExpense
            title={"체크카드"}
            cards={cards?.filter(({ is_credit }) => !is_credit)}
          />
        </div>
      </div>
    </div>
  );
};

export default Expense;
