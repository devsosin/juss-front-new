import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { FaFlagCheckered } from "react-icons/fa";

import BaseButton from "../../components/Button/BaseButton";
import SubButton from "../../components/Button/SubButton";

import { won } from "../../utils/currency";

import "./Complete.css";

import { getAccount } from "../../api/account";

const Complete = ({ amount }) => {
  const navigate = useNavigate();

  const { fromId, toId } = useParams();

  const [toAccount, setToAccount] = useState({});
  const [isFill, setIsFill] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    getAccount({ token, accountId: toId }).then((data) => {
      setToAccount(data);
      setIsFill(data.is_own);
    });
  }, [toId]);

  return (
    <div className="Complete">
      <div>
        <FaFlagCheckered size={140} />
        <div>
          <div>{`${isFill ? "내 " : ""} ${toAccount.account_name} ${
            isFill ? "로" : "님에게"
          }`}</div>
          <div>{won(amount)}을</div>
          <div>{`${isFill ? "채웠" : "보냈"}어요`}</div>
        </div>
        <div>
          <SubButton text={"메모 남기기"} />
        </div>
      </div>

      <div className="bottom">
        <div>
          <BaseButton
            text={"공유하기"}
            addClass={"btn-subcolor"}
            handleClick={() => alert("공유")}
          />
          <BaseButton
            text={"확인"}
            handleClick={() => navigate(`/account/${fromId}`)}
          />
        </div>
        <div>수수료는 주스가 냈어요!</div>
      </div>
    </div>
  );
};

export default Complete;
