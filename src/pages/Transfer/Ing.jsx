import React, { useState } from "react";

import { useParams } from "react-router-dom";

import { FaSpinner } from "react-icons/fa";

import { won } from "../../utils/currency";

import "./Ing.css";

const Ing = ({ amount, toNext }) => {
  const { toId } = useParams();

  const [toAccount, setToAccount] = useState({
    id: 2,
    bank_name: "하나은행",
    account_name: "하나골드클럽통장",
    account_number: "800-41-45416",
    is_own: false,
  });

  setTimeout(() => {
    toNext();
  }, 1000);

  const [isFill, setIsFill] = useState(toAccount.is_own);

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
