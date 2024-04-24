import React from "react";

import { useNavigate } from "react-router-dom";

import "./Accounts.css";

import BaseButton from "../../components/Button/BaseButton";
import SubButton from "../../components/Button/SubButton";
import Card from "../../components/Card/Card";

import { won } from "../../utils/currency";

const Accounts = () => {
  const accountTotal = 19803104;
  const accounts = [
    {
      id: 1,
      is_show: true,
      account_name: "씨티 글로벌통장",
      account_type: 0,
      balance: 3689416,
    },
    {
      id: 2,
      is_show: false,
      account_name: "우리 청년적금",
      account_type: 1,
      balance: 2307270,
    },
    {
      id: 3,
      is_show: true,
      account_name: "씨티 우대적금",
      account_type: 1,
      balance: 2307270,
    },
    {
      id: 4,
      is_show: false,
      account_name: "우리사랑적금",
      account_type: 1,
      balance: 900000,
    },
    {
      id: 5,
      is_show: false,
      account_name: "KB굿잡통장",
      account_type: 0,
      balance: 3999646,
    },
    {
      id: 6,
      is_show: false,
      account_name: "우리WON멤버스통장",
      account_type: 0,
      balance: 1233464,
    },
    {
      id: 7,
      is_show: false,
      account_name: "NH행복채움적금",
      account_type: 1,
      balance: 2102149,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="Accounts">
      <div className="total">
        <div>
          <h3>총 자산</h3>
          <span className="money">{won(accountTotal)}</span>
        </div>
        <BaseButton text={"분석"} />
      </div>

      <div className="account">
        <h3 style={{ fontWeight: "normal" }}>계좌</h3>
        <span className="small-text">{won(accountTotal)}</span>
      </div>
      <div className="account-list">
        <h3 className="sub-text">입출금</h3>
        {accounts.map(
          ({ balance, account_name, is_show, account_type, id }) => {
            if (is_show) {
              return (
                <Card key={id} title={account_name} subTitle={won(balance)}>
                  {account_type === 0 ? (
                    <SubButton
                      text={"송금"}
                      handleClick={() => navigate(`/account/${id}`)}
                    />
                  ) : null}
                </Card>
              );
            }
          }
        )}
      </div>
      <div className="account-list">
        <h3 className="sub-text">숨긴 계좌</h3>
        {accounts.map(
          ({ balance, account_name, is_show, id, account_type }) => {
            if (!is_show) {
              return (
                <Card key={id} title={account_name} subTitle={won(balance)}>
                  {account_type === 0 ? (
                    <SubButton
                      text={"송금"}
                      handleClick={() => navigate(`/account/${id}`)}
                    />
                  ) : null}
                </Card>
              );
            }
          }
        )}
      </div>
    </div>
  );
};

export default Accounts;
