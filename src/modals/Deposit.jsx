import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Card from "../components/Card/Card";
import Modal from "../conatiners/Modal";

import { won } from "../utils/currency";

import "./Deposit.css";

const Deposit = ({ closeModal }) => {
  const navigate = useNavigate();
  const { accountId } = useParams();

  const [myAccounts, setMyAccounts] = useState();

  // 내 계좌 제외
  useEffect(() => {
    const accounts = [
      { id: 1, account_type: 0, account_name: "KB마이핏통장", balance: 93050 },
      {
        id: 2,
        account_type: 0,
        account_name: "NH멤버스통장",
        balance: 2690771,
      },
      {
        id: 3,
        account_type: 0,
        account_name: "KB마이핏통장",
        balance: 4840092,
      },
      {
        id: 4,
        account_type: 1,
        account_name: "기업 BIZ통장",
        balance: 2553247,
      },
    ];

    setMyAccounts(
      accounts.filter(
        ({ id, account_type }) => id !== accountId && account_type === 0
      )
    );
  }, [accountId]);

  return (
    <Modal closeModal={closeModal}>
      <div className="Deposit">
        <hr
          style={{
            width: "60px",
            height: "4px",
            border: 0,
            backgroundColor: "#D9D9D9",
          }}
        />
        <h3>어떤 계좌에서 돈을 가져올까요?</h3>
        <div className="list">
          {myAccounts
            ? myAccounts.map(({ balance, account_name, id }) => {
                return (
                  <Card
                    key={id}
                    title={account_name}
                    subTitle={won(balance)}
                    handleClick={() => navigate(`/transfer/${id}/${accountId}`)}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </Modal>
  );
};

export default Deposit;
