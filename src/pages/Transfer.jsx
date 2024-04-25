import React, { useState } from "react";

import Complete from "./Transfer/Complete";
import Init from "./Transfer/Init";
import Ing from "./Transfer/Ing";
import Confirm from "./Transfer/Confirm";

import "./Transfer.css";

const Transfer = () => {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(0);

  const toConfirm = (v) => {
    setAmount(+v.replace(/\D/g, ""));
    setStep(1);
  };

  const confirmTransfer = () => {
    setStep(2);
  };

  const completeTransfer = () => {
    setStep(3);
  };

  return (
    <div className="Transfer">
      {step === 0 ? <Init toNext={toConfirm} /> : null}
      {step === 1 ? <Confirm amount={amount} toNext={confirmTransfer} /> : null}
      {step === 2 ? <Ing amount={amount} toNext={completeTransfer} /> : null}
      {step === 3 ? <Complete amount={amount} /> : null}
    </div>
  );
};

export default Transfer;
