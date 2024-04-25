import React, { useState } from "react";

import { useParams } from "react-router-dom";

import BaseButton from "../../components/Button/BaseButton";

import { won } from "../../utils/currency";

import "./Confirm.css";

const Confirm = ({ amount, toNext }) => {
  const { fromId, toId } = useParams();

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

  const [isFill, setIsFill] = useState(toAccount.is_own);

  return (
    <div className="Confirm">
      <div>
        <div>
          <span className="highlight">
            {`${isFill ? "내 " : ""}`}
            {toAccount.account_name}
          </span>
          {`${isFill ? "으로" : "님에게"}`}
        </div>
        <div>{won(amount)}을</div>
        <div>{`${isFill ? "채울" : "보낼"}까요?`}</div>
      </div>
      <div>
        <div className="transfer-memo">
          <div>받는 분에게 표시</div> <div>{""}</div>
        </div>
        <div className="transfer-from">
          <div>출금 계좌</div> <div>{`내 ${fromAccount.account_name}`}</div>
        </div>
        <div className="transfer-to">
          <div>
            {toAccount.account_type === 2 ? "입금할 연락처" : "입금 계좌"}
          </div>
          <div>{`${toAccount.bank_name} ${toAccount.account_number}`}</div>
        </div>

        <div className="transfer-btn">
          <BaseButton text={"보내기"} handleClick={() => toNext()} />
        </div>
        <div className="transfer-tip">평생 수수료 무료</div>
      </div>
    </div>
  );
};

export default Confirm;
