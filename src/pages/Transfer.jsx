import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Complete from "./Transfer/Complete";
import Init from "./Transfer/Init";
import Ing from "./Transfer/Ing";
import Confirm from "./Transfer/Confirm";

import "./Transfer.css";

import { getAccount } from "../api/account";
import { transferMoney } from "../api/transfer";

const Transfer = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(0);

  const { fromId, toId } = useParams();

  const [fromAccount, setFromAccount] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    getAccount({ token, accountId: fromId }).then((data) =>
      setFromAccount(data)
    );
  }, [fromId]);

  const toConfirm = (v) => {
    setAmount(+v.replace(/\D/g, ""));
    setStep(1);
  };

  const [isComplete, setIsComplete] = useState(false);

  const confirmTransfer = () => {
    setStep(2);
    const token = localStorage.getItem("jwt-token");
    transferMoney({token, body:{sender_id: fromAccount.id,
        receiver_id: toId,
        amount: amount,
        memo: fromAccount.account_name}}).then(res => setIsComplete(true));
  };

  const completeTransfer = () => {
    setStep(3);
  };

  return (
    <div className="Transfer">
      {step === 0 ? <Init toNext={toConfirm} /> : null}
      {step === 1 ? <Confirm amount={amount} toNext={confirmTransfer} /> : null}
      {step === 2 ? (
        <Ing
          amount={amount}
          toNext={completeTransfer}
          isComplete={isComplete}
        />
      ) : null}
      {step === 3 ? <Complete amount={amount} /> : null}
    </div>
  );
};

export default Transfer;
