import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import BaseButton from "../../components/Button/BaseButton";

import { won } from "../../utils/currency";

import "./Confirm.css";

import { getAccount } from "../../api/account";

const Confirm = ({ amount, toNext }) => {
  const { fromId, toId } = useParams();

  const [fromAccount, setFromAccount] = useState({});
  const [toAccount, setToAccount] = useState({});
  const [isFill, setIsFill] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    getAccount({ token, accountId: fromId }).then((data) =>
      setFromAccount(data)
    );
    getAccount({ token, accountId: toId }).then((data) => {
      setToAccount(data);
      setIsFill(data.is_own);
    });
  }, [fromId, toId]);

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
